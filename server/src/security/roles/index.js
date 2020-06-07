const {
    ServerError
} = require('../../errors');

const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        for (let i = 0; i < roles.length; i++) {

            if (req.state.decoded.role === roles[i]) {
                
                    return next();
            }
        }
        throw new ServerError('Nu sunteti autorizat sa accesati resursa!', 401);
    }
};

module.exports = {
    authorizeRoles
}
