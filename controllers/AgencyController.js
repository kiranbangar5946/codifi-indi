const Agency = require('../models/AgencyModel.js');
const AuthMiddleware = require('../utils/auth.middleware');

module.exports = (router) => {

    router.use('/*', AuthMiddleware.authorize);

/**
 * @swagger 
 * /agency/create:
 *  post:
 *     description: Create agency and client
 *     parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Agency and client are created
 *       '412':
 *         description: Invalid parameters passed.
 *       '500':
 *         description: Failed to save record
 */
    router.post('/create', Agency.createAgencyAndClient);

};
