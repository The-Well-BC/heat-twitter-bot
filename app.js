const app = require('express')();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const config = require('./config');
const router = require('./config/routes');

app.use(router);

module.exports = app;
