const bcryptjs = require('bcrypt');

/**
 * Hashes password
 * @param {*} plainTextPassword 
 */
const hash = async (plainTextPassword) => {

    const salt = await bcryptjs.genSalt(5);
    const hash = await bcryptjs.hash(plainTextPassword, salt);
    return hash;
};

/**
 * Compare plainTextPassword's hash with the hashed existing password
 * @param {*} plainTextPassword 
 * @param {*} hashedPassword 
 */
const compare = async (plainTextPassword, hashedPassword) => {

    const isOk = await bcryptjs.compare(plainTextPassword, hashedPassword);
    return isOk;
};

module.exports = {
    hash,
    compare
}