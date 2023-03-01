const adminCounselorRouters = require('express').Router();
const adminCounselorControllers = require('../controllers/adminCounselorControllers');

adminCounselorRouters.get('/', adminCounselorControllers.readCounselors);

adminCounselorRouters.patch('/:id', adminCounselorControllers.updateStatusCounselor);

adminCounselorRouters.delete('/:id', adminCounselorControllers.deleteCounselorById);

module.exports = adminCounselorRouters;
