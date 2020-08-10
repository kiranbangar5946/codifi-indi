const Client = require('../mongooseModels/Client');
const Agency = require('../mongooseModels/Agency');

const ResponseUtils = require('../utils/response.utils');
const clientSelection = 'name total_bill';

const updateClient = async (req, res) => {
    try {

        const data = req.body || {};
        const clientId = data._id || null;

        for (let key in data) {
            if (!data[key]) {
                return ResponseUtils.error(res, null, `${key} cannot be empty `, 412);
            }
        }

        if (!clientId) {
            return ResponseUtils.error(res, null, 'ClientId not passed', 412);
        }

        if (data && data.agency_id) {
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

const getTopClients = async (req, res) => {
    try {

        const clients = await Client.find({})
            .sort('-total_bill')
            .populate({
                path: 'agency',
                select: 'name',
                model: Agency
            })
            .select(clientSelection)
            .lean()
            .exec()

        if (!clients) {
            return ResponseUtils.success(res, []);
        }

        return ResponseUtils.success(res, clients);

    } catch (error) {
        console.log('error', error)
        return ResponseUtils.error(res, error);
    }
}


module.exports = {
    updateClient,
    getTopClients
}