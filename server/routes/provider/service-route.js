const { createService, getServices, deleteService } = require("../../controllers/provider/service-controller");
const {upload,cloudinary} = require("../../helpers/cloudinary");
const express = require("express");
const router  = express.Router()

router.post('/create-service',upload.single("image"),createService)
router.get('/get-services/:id',getServices)
router.get('/delete-service/:id',deleteService)


module.exports = router
