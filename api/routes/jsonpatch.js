const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const JsonpatchController = require('../controllers/jsonpatch');

router.patch('/', checkAuth, JsonpatchController.jsonpatch);

module.exports = router;