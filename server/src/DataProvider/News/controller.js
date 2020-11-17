const express = require('express');

const NewsService = require('./services.js');

const {
    validateFields
} = require('../../utils');

const {
    authorizeAndExtractToken
} = require('../../security/jwt');

const {
    authorizeRoles
} = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;

const {
    adminRole,
    supportRole,
    userRole
} = UsersConstants.roles;

const router = express.Router();

/**
 * GET /news
 */
router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    try {

        const news = await NewsService.getAll();
        res.json({
            success: true,
            news: news
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /news/:id
 */
router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole, userRole), async (req, res, next) => {

    try {

        const news = await NewsService.getById(req.params.id);
        res.json(news);
    } catch (err) {

        next(err);
    }
});

/**
 * POST /news
 */
router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const title = req.body.title;
    const newsText = req.body.newsText;
    const postedBy = req.body.postedBy;
    const date = Date.now();
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            title: {
                value: title,
                type: 'ascii'
            },
            newsText: {
                value: newsText,
                type: 'ascii'
            },
            postedBy: {
                value: postedBy,
                type: 'ascii'
            },
            date: {
                value: date,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await NewsService.add(title, newsText, postedBy, date, course);

        res.json({
            success: true,
            message: 'News successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

/**
 * PUT /news/:id
 */
router.put('/:id', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const id = req.params.id;
    const title = req.body.title;
    const newsText = req.body.newsText;
    const course = req.body.course;

    try {

        const fieldsToBeValidated = {
            title: {
                value: title,
                type: 'ascii'
            },
            newsText: {
                value: newsText,
                type: 'ascii'
            },
            course: {
                value: course,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await NewsService.updateById(id, title, newsText, course);

        res.json({
            success: true,
            message: 'News successfully updated!'
        });
    } catch (err) {
        next(err);
    }

});

/**
 * DELETE /news/:id
 */
router.delete('/:id', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const id = req.params.id;

    try {

        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        await NewsService.deleteById(id);
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});

module.exports = router;