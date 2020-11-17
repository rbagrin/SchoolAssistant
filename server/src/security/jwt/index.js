const jwt = require('jsonwebtoken');

const {
    ServerError
} = require('../../errors');

const {
    validateFields
} = require('../../utils');

// TODO: @rbagrin process.env....
const options = {
    issuer: 'Radu Bagrin',
    subject: 'token proiect PW',
    audience: 'postman'
};

/**
 * Generates authorization token
 * @param { {String, String} } payload {userId, userRole}
 * @returns { String } token
 */
const generateToken = (payload) => {

    try {

        return jwt.sign(payload, "myawesomeultrasecretkey", options); // TODO: Change secret key
    } catch (err) {

        console.trace(err);
        throw new ServerError("Error on encrypting token!", 500);
    }
};

/**
 * Verify token and decrypt data from token
 * @param {String} token
 * @returns {*}
 */
const verifyAndDecodeData = (token) => {

    try {

        return jwt.verify(token, 'myawesomeultrasecretkey', options);
    } catch (err) {

        console.trace(err);
        throw new ServerError("Error on decrypting token!", 500);
    }
};

/**
 * Authorizes request and extracts the token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authorizeAndExtractToken = (req, res, next) => {
    try {

        if (!req.headers.authorization) {

            throw new ServerError('Authorization header is missing', 403);
        }
        
        // Splits after " " as received field is: Bearer 1wqeiquqwe0871238712qwe
        const token = req.headers.authorization.split(" ")[1];

        validateFields({
            jwt: {
                value: token,
                type: 'jwt'
            }
        });

        const decoded = verifyAndDecodeData(token); // decoded = { userId, userRole }

        req.state = {
            decoded
        };

        next();
    } catch (err) {

        next(err);
    }
};

module.exports = {
    generateToken,
    authorizeAndExtractToken
};