'use strict'

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ThumbNailController = require('../controllers/thumbnail');

router.post('/', checkAuth, ThumbNailController.thumbnail);

module.exports = router;