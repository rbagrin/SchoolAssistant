const {
    ServerError
} = require('../../errors');

/**
 * Authorize access to resources
 * @param  {...any} roles 
 */
const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        for (let i = 0; i < roles.length; i++) {

            if (req.state.decoded.role === roles[i]) {

                return next();
            }
        }
        throw new ServerError('Not authorized to access this resource!', 401);
    }
};

module.exports = {
    authorizeRoles
}