const express = require('express');

const UsersService = require('./services.js');
const { validateFields } = require('../../utils');
const { authorizeAndExtractToken } = require('../../security/jwt');
const { authorizeRoles } = require('../../security/roles');

const UsersConstants = require('../../lib/Constants').Users;
const {adminRole, supportRole, userRole} = UsersConstants.roles;

const ROLES_MAPPING = {
    [adminRole]: "admin",
    [supportRole]: "support",
    [userRole]: "user"
};

const router = express.Router();

router.get('/', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    try {

        const allUsers = await UsersService.getAll();

        const users = [];
        
        allUsers.forEach((user) => {
            users.push({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: ROLES_MAPPING[user.role],
            });
        });

        res.json({success: true, users: users});
    } catch (err) {
        next(err);
    }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles(adminRole, supportRole), async (req, res, next) => {

    try {

        const user = await UsersService.getById(req.params.id);
        res.json(user);
    } catch (err) {

        next(err);
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let role = userRole;

    if (req.body.role === "admin") {
        role = adminRole;
    }
    if (req.body.role === "support") {
        role = supportRole;
    }

    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            email: {
                value: email,
                type: 'email'
            },
            password: {
                value: password,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await UsersService.add(name, email, password, role);

        res.json({
            success: true,
            message: 'User successfully added!'
        });

    } catch (err) {
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles(adminRole), async (req, res, next) => {

    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const oldPassword = req.body.oldPassword;
    const role = userRole;

    // TODO: @rbagrin Check if the oldPassword is correct!

    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            email: {
                value: email,
                type: 'email'
            },
            password: {
                value: password,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await UsersService.updateById(id, name, email, password, role);

        res.json({
            success: true,
            message: 'User successfully updated!'
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

        await UsersService.deleteById(id);
        res.status(204);
        res.json({
            success: true,
            message: 'User successfully deleted!'
        });

    } catch (err) {
        next(err);
    }
});

// Register & Login
router.post('/login', async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
    
        const fieldsToBeValidated = {
            username: {
                value: username,
                type: 'email'
            },
            password: {
                value: password,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        const result = await UsersService.logIn(username, password);

        res.json({
            success: true,
            token: result.token,
            user: {
                name: result.name,
                email: result.email,
                user_role: ROLES_MAPPING[result.user_role]
            }
        });

    } catch(err) {
        
        next(err);
    }
});

router.post('/register', async (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            email: {
                value: email,
                type: 'email'
            },
            password: {
                value: password,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await UsersService.register(name, email, password, userRole);

        res.json({
            success: true,
            message: "Successfully registered"
        });
    } catch(err) {

        next(err);
    }   
});

module.exports = router;
