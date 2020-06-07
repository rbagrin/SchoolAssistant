const validator = require('validator');

const {
    ServerError
} = require('../errors');
/**
 * 
 * @param {*} fields 
 * @throws {ServerError}
 */
const validateFields = (fields) => {

    for (let fieldName in fields) {
        let fieldValue = fields[fieldName].value; 
        const fieldType = fields[fieldName].type;

        if (!fieldValue || fieldValue.length === 0) {
            throw new ServerError(`Lipseste campul ${fieldName}`, 400);
        }

        fieldValue += ''; // validator functioneaza doar pe strings
        switch (fieldType) {
            case 'ascii':
                if (!validator.isAscii(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa contina doar caractere ascii`, 400);
                }
                break;
            case 'alpha':
                if (!validator.isAlpha(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa contina doar litere`, 400);
                }
                break;
            case 'int':
                if (!validator.isInt(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa fie un numar intreg`, 400);
                }
                break;
            case 'jwt':
                if (!validator.isJWT(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa fie jwt`, 400);
                }
                break;
            case 'email':
                if (!validator.isEmail(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa fie email`, 400);
                }
                break;
        }
    }
}

module.exports = {
    validateFields
}
