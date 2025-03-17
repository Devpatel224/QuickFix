const express = require("express");
const router = express.Router()
const { getAllServices } = require("../../controllers/provider/service-controller");


router.get("/services",getAllServices)



module.exports = router