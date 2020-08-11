const authToken = 'codifi';
const ResponseUtils = require('./response.utils');

const authorize = (req, res, next) => {

    const token = req.headers.authorization;
    if (!(token === authToken)) {
        return ResponseUtils.error(res, null, 'unauthenticated', 401);
    }

    return next();
}


module.exports = {
    authorize
}