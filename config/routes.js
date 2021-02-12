const express = require('express');
let router = express.Router();
const dex = require('../components/controllers/dex');
const twitterCtrl = require('../components/controllers/twitter.ctrl');

const links = require('./links');

router.post(links.getTwitterProfiles, dex.getTwitterData);
router.get(links.twitterWebhook, twitterCtrl.crcChallenge);

module.exports = router;
