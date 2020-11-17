const nodemailer = require('nodemailer');
const Faqs = require("../data").Faqs;

/**
 * Add FAQ
 * @param {String} question 
 * @param {String} postedBy 
 * @param {String} postedByEmail 
 * @param {String} answer 
 * @param {String} answeredBy 
 * @param {Date} date 
 * @param {Boolean} important 
 */
const add = async (question, postedBy, postedByEmail, answer, answeredBy, date, important) => {

    const faq = new Faqs({
        question: question,
        postedBy: postedBy,
        postedByEmail: postedByEmail,
        answer: answer,
        answeredBy: answeredBy,
        date: date,
        important: important ? true : false
    });
    await faq.save();
};

/**
 * Get all FAQs
 */
const getAll = async () => {
    return await Faqs.find();
};

/**
 * Get FAQ by id
 * @param {String} id 
 */
const getById = async (id) => {
    return await Faqs.findById(id);
};

/**
 * Update FAQ by id
 * @param {String} id 
 * @param {String} question 
 * @param {String} answer 
 * @param {String} answeredBy 
 * @param {Boolean} important 
 */
const updateById = async (id, question, answer, answeredBy, important) => {
    await Faqs.findByIdAndUpdate(id, {
        $set: {
            'question': question,
            'answer': answer,
            'answeredBy': answeredBy,
            'important': important ? true : false
        }
    });
};

/**
 * Delete FAQ by id
 * @param {String} id 
 */
const deleteById = async (id) => {
    await Faqs.findByIdAndDelete(id);
};

/**
 * Send answer by email
 * @param {*} faq 
 */
const sendAnswer = (faq) => {

    const user_email = "kayli.mitchell67@ethereal.email";
    const user_password = "4aqJ4KNEFE1pt6zW52";

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user_email: user_email,
            pass: user_password
        }
    });

    const mailOptions = {
        from: user_email,
        to: faq.send_response_to,
        subject: "Answer for Question",
        html: `<i>${faq.question}</i><p>Answered by <b>${faq.answeredBy}</b></p><br><p>${faq.answer}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
    sendAnswer
}