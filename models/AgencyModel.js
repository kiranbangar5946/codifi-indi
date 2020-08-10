const Agency = require('../mongooseModels/Agency');
const Client = require('../mongooseModels/Client');
const validator = require('validator');
const ResponseUtils = require('../utils/response.utils');

const createAgencyAndClient = async (req, res) => {
    try {

        const data = req.body || {};

        const { name = '', addressOne = '', city = '', phoneNumber = '', state = '', totalBill = 0, email = '', addressTwo = '' } = data;

        if (!name || !addressOne || !city || !phoneNumber || !state || !totalBill || !email) {
            return ResponseUtils.error(res, null, 'Parameters missing', 412);
        }

        if (!validator.isEmail(email)) {
            return ResponseUtils.error(res, null, 'Enter valid email address', 412);
        }

        if (!validator.isMobilePhone(phoneNumber)) {
            return ResponseUtils.error(res, null, 'Enter valid phone number', 412);
        }

        //create agency
        const agencyObject = new Agency({
            name,
            phone_number: phoneNumber,
            city,
            state,
            address_one: addressOne,
            address_two: addressTwo || ''
        });

        const agency = await agencyObject.save();

        if (!agency || !agency._id) {
            return ResponseUtils.error(res, null, 'Failed to save agency', 500);
        }

        //create client
        const clientObject = new Client({
            agency: agency._id,
            name,
            email,
            phone_number: phoneNumber,
            total_bill: totalBill
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