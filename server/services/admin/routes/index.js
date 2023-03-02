const { Router } = require('express');
const router = Router();
const adminPostRouters = require('./adminPostRouters');
const counselorRouter = require('./adminCounselorRouters');
const reportRouter = require('./adminReportRouters');

router.use('/posts', adminPostRouters);

router.use('/counselors', counselorRouter);

router.use('/reports', reportRouter);

module.exports = router;
