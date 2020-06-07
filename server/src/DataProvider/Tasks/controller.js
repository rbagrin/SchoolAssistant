const express = require('express');

const TasksService = require('./services.js');
const { validateFields } = require('../../utils');
const { authorizeAndExtractToken } = require('../../security/jwt');
const { authorizeRoles } = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;
const {adminRole, supportRole, userRole} = UsersConstants.roles;

const router = express.Router();

router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    try {

        const tasks = await TasksService.getAll();
        res.json({success: true, tasks: tasks});
    } catch (err) {
        next(err);
    }
});


router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    try {

        const task = await TasksService.getById(req.params.id);
        res.json(task);
    } catch (err) {

        next(err);
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const title = req.body.title;
    const taskDescription = req.body.taskDescription;
    const assignedBy = req.body.assignedBy;
    const deadline = req.body.deadline;
    const course = req.body.course;
    const send_response_to = req.body.send_response_to;

    try {

        const fieldsToBeValidated = {
            title: {
                value: title,
                type: 'ascii'
            },
            taskDescription: {
                value: taskDescription,
                type: 'ascii'
            },
            assignedBy: {
                value: assignedBy,
                type: 'ascii'
            },
            deadline: {
                value: deadline,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            },
            send_response_to: {
                value: send_response_to,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await TasksService.add(title, taskDescription, assignedBy, new Date(deadline), course, send_response_to);

        res.json({
            success: true,
            message: 'Task successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const id = req.params.id;
    const title = req.body.title;
    const taskDescription = req.body.taskDescription;
    const deadline = req.body.deadline;
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            title: {
                value: title,
                type: 'ascii'
            },
            taskDescription: {
                value: taskDescription,
                type: 'ascii'
            },
            deadline: {
                value: deadline,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await TasksService.updateById(id, title, taskDescription, new Date(deadline), course);

        res.json({
            success: true,
            message: 'Task successfully updated!'
        });

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const id = req.params.id;

    try {

        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        await TasksService.deleteById(id);
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});

router.post('/answer', authorizeAndExtractToken, authorizeRoles(userRole, adminRole, supportRole), async (req, res, next) => {

    const title = req.body.title;
    const taskDescription = req.body.taskDescription;
    const assignedBy = req.body.assignedBy;
    const deadline = req.body.deadline;
    const course = req.body.course;
    const answer = req.body.answer;
    const answeredBy = req.body.answeredBy;
    const send_response_to = req.body.send_response_to;

    try {

        const fieldsToBeValidated = {
            title: {
                value: title,
                type: 'ascii'
            },
            taskDescription: {
                value: taskDescription,
                type: 'ascii'
            },
            assignedBy: {
                value: assignedBy,
                type: 'ascii'
            },
            deadline: {
                value: deadline,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            },
            send_response_to: {
                value: send_response_to,
                type: 'ascii'
            },
            answer: {
                value: answer,
                type: 'ascii'
            },
            answeredByName: {
                value: answeredBy.name,
                type: 'ascii'
            },
            answeredByEmail: {
                value: answeredBy.email,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        const answerTask = {
            title: title,
            taskDescription: taskDescription,
            assignedBy: assignedBy,
            deadline: deadline,
            course: course,
            send_response_to: send_response_to,
            answer: answer,
            answeredBy: answeredBy
        };
        await TasksService.sendAnswer(answerTask);

        res.json({
            success: true,
            message: 'Email succesfully sent!'
        });

    } catch (err) {
        next(err);
    }
});


module.exports = router;
