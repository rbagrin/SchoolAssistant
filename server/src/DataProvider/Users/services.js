const Users = require('../data').Users;

const {
    hash,
    compare
} = require('../../security/password');

const {
    generateToken
} = require('../../security/jwt');

const {
    ServerError
} = require('../../errors');

/**
 * Add user
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {Number} role 
 */
const add = async (name, email, password, role) => {

    // hash password
    const hashPass = await hash(password);

    const user = new Users({
        name: name,
        email: email,
        password: hashPass,
        role: role
    });
    await user.save();
};

/**
 * Get all users
 */
const getAll = async () => {
    return await Users.find();
};

/**
 * Get user by id
 * @param {String} id 
 */
const getById = async (id) => {
    return await Users.findById(id);
};

/**
 * Update user by id
 * @param {String} id 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 */
const updateById = async (id, name, email, password) => {

    const hashPass = await hash(password);

    await Users.findByIdAndUpdate(id, {
        $set: {
            "name": name,
            "email": email,
            "password": hashPass
        }
    });
};

/**
 * Delete user by id
 * @param {String} id 
 */
const deleteById = async (id) => {
    await Users.findByIdAndDelete(id);
};

/**
 * Log in
 * @param {String} username 
 * @param {String} password 
 */
const logIn = async (username, password) => {

    let user = await Users.findOne({
        email: username
    }).exec();

    if (!user) {
        user = await Users.findOne({
            name: username
        }).exec();
    }
    if (!user) {

        throw new ServerError(`The user ${username} couldn't be found.`, 403);
    }

    const successfulLogin = await compare(password, user.password);

    if (!successfulLogin) {

        throw new ServerError(`Wrong username or password.`, 403);
    }

    if (successfulLogin) {

        const payload = {
            id: user._id,
            role: user.role,
        };

        return {
            token: generateToken(payload),
            name: user.name,
            email: user.email,
            user_role: user.role
        };
    }
};

/**
 * Register new user
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {String} role 
 */
const register = async (name, email, password, role) => {

    const user = await Users.findOne({
        email: email
    }).exec();

    if (user !== null) {

        throw new ServerError(`The email adress ${email} is already used!`, 403);
    }

    // TODO: @rbagrin decrypt frontend password
    const hashPass = await hash(password);

    const newUser = new Users({
        name: name,
        email: email,
        password: hashPass,
        role: role
    });

    await newUser.save();
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
    logIn,
    register
}