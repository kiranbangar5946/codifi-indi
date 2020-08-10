const Client = require('../models/ClientModel.js');
const AuthMiddleware = require('../utils/auth.middleware');

module.exports = (router) => {

    router.use('/*', AuthMiddleware.authorize);

    router.put('/', Client.updateClient);

    router.get('/', Client.getTopClients);

};