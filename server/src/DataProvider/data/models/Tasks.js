const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    taskDescription: {
        type: String,
        required: [true, 'Task Description is required']
    },
    assignedBy: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    send_response_to: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;