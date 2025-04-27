const express = require("express");
const { getDashboardData, getAllProvider, deleteProvider } = require("../../controllers/admin/admin-controller");
const router = express.Router();


router.get("/dashboard-stats",getDashboardData)
router.get("/providers", getAllProvider)
router.delete("/provider/:id",deleteProvider)

module.exports = router