const Agency = require('../models/AgencyModel.js');
const AuthMiddleware = require('../utils/auth.middleware');

module.exports = (router) => {

    router.use('/*', AuthMiddleware.authorize);

    router.post('/create', Agency.createAgencyAndClient);

};
