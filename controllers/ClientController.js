const Client = require('../models/ClientModel.js');
const AuthMiddleware = require('../utils/auth.middleware');

module.exports = (router) => {

    router.use('/*', AuthMiddleware.authorize);

    /**
     * @swagger 
     * /client:
     *  put:
     *     description: Update client details
     *     parameters:
     *      - in: header
     *        name: authorization
     *        description: Use 'codifi' as token
     *        schema:
     *           type: string
     *      - in: body
     *        name : Client details
     *        description: Client details to be updated
     *        schema: 
     *          type: object
     *          properties:
     *            _id:
     *              type: string
     *            phone_number:
     *              type: string
     *            name:
     *              type: string
     *            email:
     *              type: string
     *              format: email
     *            total_bill:
     *              type: number
     *     responses:
     *       '200':
     *         description: Client details are updated.
     *       '412':
     *         description: Invalid parameters passed.
     *       '404':
     *         description: Agency not found
     *       '500':
     *         description: Failed to update record
     */
    router.put('/', Client.updateClient);

    /**
    * @swagger 
    * /client:
    *  get:
    *     description: Fetch list of clients with max bills
    *     parameters:
    *      - in: header
    *        name: authorization
    *        description: Use 'codifi' as token
    *        schema:
    *           type: string
    *     responses:
    *       '200':
    *         description: Clients with top bill from different agencies.
    *       '401':
    *         description: Unauthorized request.
    */
    router.get('/', Client.getTopClients);

};