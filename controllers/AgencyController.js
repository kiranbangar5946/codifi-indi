const Agency = require('../models/AgencyModel.js');

module.exports = (router) => {

    router.post('/create', Agency.createAgencyAndClient);

};
