const authToken = 'codifi';
const ResponseUtils = require('./response.utils');

const authorize = (req, res, next) => {

    const token = req.headers.authorization;

    if (!(token === authToken)) {
        console.log('am inside error')
        return ResponseUtils.error(res, null, 'unauthenticated', 401);
    }

    return next();
}


module.exports = {
    authorize
}