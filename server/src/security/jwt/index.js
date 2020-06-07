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
 * Functie ce genereaza tokenul de autorizare
 * @param { {String, String} } payload de forma {userId, userRole}
 * @returns { String } token
 */
const generateToken = (payload) => {

    try {

        return jwt.sign(payload, "myawesomeultrasecretkey", options); // TODO: Change secret key
    } catch (err) {

        console.trace(err);
        throw new ServerError("Eroare la codificarea tokenului!", 500);
    }
};

/**
 * Verifica tokenul si decodeaza datele din token.
 * @param {String} token
 * @returns {*}
 */
const verifyAndDecodeData = (token) => {

    try {

        return jwt.verify(token, 'myawesomeultrasecretkey', options);
    } catch (err) {

        console.trace(err);
        throw new ServerError("Eroare la decodificarea tokenului!", 500);
    }
};

/**
 * Autorizeaza requestul si extrage tokenul
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authorizeAndExtractToken = (req, res, next) => {
    try {

        if (!req.headers.authorization) {

            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }
        const token = req.headers.authorization.split(" ")[1]; // se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe

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
