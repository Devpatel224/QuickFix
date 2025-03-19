const express = require("express");
const router = express.Router()
const { getAllServices, getSpecificService } = require("../../controllers/provider/service-controller");
const { userRequestBooking } = require("../../controllers/booking/booking-controller");
const { authMiddleWare } = require("../../controllers/auth/auth-controller");



router.get("/services",getAllServices)
router.post("/book/:serviceId",authMiddleWare,userRequestBooking)
router.get("/serviceDetail/:id",getSpecificService)


module.exports = router