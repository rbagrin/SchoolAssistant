const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    postedBy: {
        type: String,
        required: false
    },
    postedByEmail: {
        type: String,
        required: false
    },
    answer: {
        type: String,
        required: false
    },
    answeredBy: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    important: {
        type: Boolean,
        required: false
    }
});

const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;