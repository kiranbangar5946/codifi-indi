const Agency = require('../models/AgencyModel.js');
const AuthMiddleware = require('../utils/auth.middleware');

module.exports = (router) => {

    // middleare to authorize request
    router.use('/*', AuthMiddleware.authorize);

    /**
     * @swagger 
     * /agency/create:
     *  post:
     *     description: Create agency and client
     *     parameters:
     *      - in: header
     *        name: authorization
     *        description: Use 'codifi' as token
     *        schema:
     *           type: string
     *      - in: body
     *        name : Agency and client
     *        description: Agency and client details
     *        schema: 
     *          type: object
     *          properties:
     *            agencyDetails:
     *              type: object
     *              required:
     *                - phone_number
     *                - name
     *                - address_one
     *                - state
     *                - city
     *              properties:
     *                phone_number:
     *                  type: string
     *                name:
     *                  type: string
     *                address_one:
     *                  type: string
     *                address_two:
     *                  type: string
     *                state:
     *                  type: string
     *                city:
     *                  type: string
     *            clientDetails:
     *              type: object
     *              required:
     *                - phone_number
     *                - email
     *                - name
     *                - total_bill
     *              properties:
     *                phone_number:
     *                  type: string
     *                email:
     *                  type: string
     *                  format: email
     *                name:
     *                  type: string
     *                total_bill:
     *                  type: number
     *     responses:
     *       '201':
     *         description: Agency and client are created
     *       '412':
     *         description: Invalid parameters passed.
     *       '500':
     *         description: Failed to save record
     */
    router.post('/create', Agency.createAgencyAndClient);

};
