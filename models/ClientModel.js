const Client = require('../mongooseModels/Client');
const Agency = require('../mongooseModels/Agency');

const ResponseUtils = require('../utils/response.utils');
const clientSelection = 'name total_bill';

/**
 * Update client record
 * @param {*} req 
 * @param {*} res 
 */
const updateClient = async (req, res) => {
    try {

        const data = req.body || {};
        const clientId = data._id || null;

        //Don't allow to update with null value
        for (let key in data) {
            if (!data[key]) {
                return ResponseUtils.error(res, null, `${key} cannot be empty `, 412);
            }
        }

        if (!clientId) {
            return ResponseUtils.error(res, null, 'ClientId not passed', 412);
        }

        if (data && data.agency_id) {

            //check if agency passed while updating is valid
            const agency = await Agency.findById(data.agency_id).exec();

            if (!agency) {
                return ResponseUtils.error(res, null, 'Agency not found', 404);
            }

        }

        const updateObject = {
            $set: {
                ...data
            }
        }

        await Client.updateOne({ _id: clientId }, updateObject).exec();

        return ResponseUtils.success(res);

    } catch (error) {
        console.log('error', error)
        return ResponseUtils.error(res, error);
    }
}

/**
 * Get clients with top bills
 * @param {*} req 
 * @param {*} res 
 */
const getTopClients = async (req, res) => {
    try {

        const populateOptions = {
            path: 'agency',
            select: 'name',
            model: Agency
        };

        const clients = await Client.find({})
            .sort('-total_bill')
            .populate(populateOptions)
            .select(clientSelection)
            .lean()
            .exec()

        if (!clients) {
            return ResponseUtils.success(res, []);
        }

        return ResponseUtils.success(res, clients);

    } catch (error) {
        return ResponseUtils.error(res, error);
    }
}


module.exports = {
    updateClient,
    getTopClients
}