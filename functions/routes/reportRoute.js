const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');
router.post('/insertReport', reportController.insertReport);
router.get('/fetchReportsByUserID', reportController.fetchReportsByUserID);
router.post('/fetchProgressDetails',reportController.userProgressDetails);
module.exports = router;