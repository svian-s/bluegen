const express = require('express');
const router = express.Router();
const garbageTypeController = require('../controllers/garbageTypeController.js');

router.get('/fetchGarbageTypes', garbageTypeController.fetchGarbageTypes);

module.exports = router;