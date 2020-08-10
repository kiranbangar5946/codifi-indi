const Client = require('../models/ClientModel.js');

module.exports = (router) => {

    router.put('/', Client.updateClient);

    router.get('/', Client.getTopClients);

};