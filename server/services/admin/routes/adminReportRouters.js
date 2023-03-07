const adminReportRouters = require('express').Router();
const adminReportControllers = require('../controllers/adminReportControllers');

adminReportRouters.get('/', adminReportControllers.readReports);

adminReportRouters.post('/', adminReportControllers.createReport);

// adminReportRouters.put('/', adminReportControllers.updateReportById);

adminReportRouters.delete('/:id', adminReportControllers.deleteReportById);

// adminReportRouters.delete('/post/:postId', adminReportControllers.deleteByPostId);

// adminReportRouters.delete('/comment/:commentId', adminReportControllers.deleteByCommentId);

module.exports = adminReportRouters;
