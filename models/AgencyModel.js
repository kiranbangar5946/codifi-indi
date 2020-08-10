const Agency = require('../mongooseModels/Agency');
const Client = require('../mongooseModels/Client');
const validator = require('validator');
const ResponseUtils = require('../utils/response.utils');

const createAgencyAndClient = async (req, res) => {
    try {

        const agencyDetails = req.body.agencyDetails || {};
        const clientDetails = req.body.clientDetails || {};

        if (!agencyDetails || !agencyDetails.name || !agencyDetails.address_one || !agencyDetails.city || !agencyDetails.phone_number || !agencyDetails.state) {
            return ResponseUtils.error(res, null, 'Parameters missing for agency', 412);
        }

        if (!clientDetails || !clientDetails.name || !clientDetails.email || !clientDetails.phone_number || !clientDetails.total_bill) {
            return ResponseUtils.error(res, null, 'Parameters missing for client', 412);
        }

        if (!validator.isEmail(clientDetails.email)) {
            return ResponseUtils.error(res, null, 'Enter valid email address', 412);
        }

        if (!validator.isMobilePhone(agencyDetails.phone_number || clientDetails.phone_number)) {
            return ResponseUtils.error(res, null, 'Enter valid phone number', 412);
        }

        //create agency if not present
        const query = { name: agencyDetails.name };
        const updateObject = {
            $set: {
                ...agencyDetails
            }
        };

        const options = { upsert: true, new: true };

        const agency = await Agency.findOneAndUpdate(query, updateObject, options).exec();



        if (!agency || !agency._id) {
            return ResponseUtils.error(res, null, 'Failed to save agency', 500);
        }

        //create client
        const clientObject = new Client({
            agency: agency._id,
            ...clientDetails
        });

        const client = await clientObject.save();

        const response = {
            agency,
            client
        }

        return ResponseUtils.success(res, response);

    } catch (error) {
        console.log('error', error)
        return ResponseUtils.error(res, error);
    }
}


module.exports = {
    createAgencyAndClient
}