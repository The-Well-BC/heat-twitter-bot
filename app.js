const app = require('express')();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const config = require('./config');
const router = require('./config/routes');

const cors = require('cors');
app.use(cors(config.cors));

const cronJobs = require('./components/cronJobs');
cronJobs();

app.use(router);

module.exports = app;
