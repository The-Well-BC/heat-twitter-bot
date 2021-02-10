const express = require('express');
let router = express.Router();
const dex = require('../components/controllers/dex');

const links = require('./links');

router.post(links.getTwitterProfiles, dex.getTwitterData);

module.exports = router;
