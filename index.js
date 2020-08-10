const express = require('express');
const app = express();

const agencyRoutes = require('./controllers/AgencyController');
const clientRoutes = require('./controllers/ClientController');

const bodyParser = require('body-parser');

process.env.NODE_ENV = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;

global.env = require(__dirname + '/config/env/' + process.env.NODE_ENV);
require('./config/database');

//initialise express router
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization'
  );
  next();
});

// use express router
app.use('/agency', router);
app.use('/Client', router);

//call  routing
agencyRoutes(router);
clientRoutes(router);

const port = process.env.PORT || 6000;
console.log("am here",port)
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port} port.`);
});