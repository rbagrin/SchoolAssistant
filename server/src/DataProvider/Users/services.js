const Users = require('../data').Users;
const { hash, compare } = require('../../security/password');
const { generateToken } = require('../../security/jwt');
const { ServerError } = require('../../errors');

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

const getAll = async () => {
    return await Users.find();
};

const getById = async (id) => {
    return await Users.findById(id);
};

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

const deleteById = async (id) => {
    await Users.findByIdAndDelete(id);
};

const logIn = async (username, password) => {

    let user = await Users.findOne({email: username}).exec();

    if (!user) {
        user = await Users.findOne({name: username}).exec();
    }
    if (!user) {

        throw new ServerError(`Nu exista userul ${username}`, 403);
    }

    const successfulLogin = await compare(password, user.password);

    if (!successfulLogin) {

        throw new ServerError(`Numele sau parola sunt gresite!`, 403);
    }
        
    if (successfulLogin) {

        const payload = {
            id: user._id,
            role: user.role,
        };
    
        return {token: generateToken(payload), name: user.name, email: user.email, user_role: user.role};
    }
};

const register = async (name, email, password, role) => {

    const user = await Users.findOne({email: email}).exec();

    if (user !== null) {

        throw new ServerError(`Emailul ${email} este folosit deja!`, 403);
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
