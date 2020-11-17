const nodemailer = require('nodemailer');
const Tasks = require('../data').Tasks;

/**
 * Add task
 * @param {String} title 
 * @param {String} taskDescription 
 * @param {String} assignedBy 
 * @param {Date} deadline 
 * @param {String} course 
 * @param {String} send_response_to 
 */
const add = async (title, taskDescription, assignedBy, deadline, course, send_response_to) => {
    const task = new Tasks({
        title,
        taskDescription,
        assignedBy,
        deadline,
        course,
        send_response_to
    });
    await task.save();
};

/**
 * Get all tasks
 */
const getAll = async () => {
    return await Tasks.find();
};

/**
 * Get task by id
 * @param {String} id 
 */
const getById = async (id) => {
    return await Tasks.findById(id);
};

/**
 * Update task by id
 * @param {String} id 
 * @param {String} title 
 * @param {String} taskDescription 
 * @param {Date} deadline 
 * @param {String} course 
 */
const updateById = async (id, title, taskDescription, deadline, course) => {
    await Tasks.findByIdAndUpdate(id, {
        $set: {
            "title": title,
            "taskDescription": taskDescription,
            "deadline": deadline,
            "course": course
        }
    });
};

/**
 * Delete task by id
 * @param {String} id 
 */
const deleteById = async (id) => {
    await Tasks.findByIdAndDelete(id);
};

/**
 * Send answer email
 * @param {*} task 
 */
const sendAnswer = (task) => {

    const user_email = "kayli.mitchell67@ethereal.email";
    const user_password = "4aqJ4KNEFE1pt6zW52";

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: user_email,
            pass: user_password
        }
    });

    const mailOptions = {
        from: user_email,
        to: task.send_response_to,
        subject: task.title,
        html: `<h1>${task.title}</h1><h2>${task.answeredBy.name}</h2><p>${task.answer}</p>`
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