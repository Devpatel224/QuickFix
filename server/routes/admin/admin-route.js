const express = require("express");
const { getDashboardData, getAllProvider } = require("../../controllers/admin/admin-controller");
const router = express.Router();


router.get("/dashboard-stats",getDashboardData)
router.get("/providers", getAllProvider)

module.exports = router