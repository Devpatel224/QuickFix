const { authMiddleWare } = require("../../controllers/auth/auth-controller");
const { getProviderDashboard, statusChange } = require("../../controllers/booking/booking-controller");
const { createService, getServices, deleteService } = require("../../controllers/provider/service-controller");
const {upload,cloudinary} = require("../../helpers/cloudinary");
const express = require("express");
const router  = express.Router()

router.post('/create-service',upload.single("image"),createService)
router.get('/get-services/:id',getServices)
router.delete('/delete-service/:id',deleteService)
router.get('/dashboard', authMiddleWare ,getProviderDashboard)
router.post('/dashboard/booking/:id',statusChange)

module.exports = router
