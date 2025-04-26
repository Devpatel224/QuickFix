const express = require("express");
const { getDashboardData } = require("../../controllers/admin/admin-controller");
const router = express.Router();


router.get("/dashboard-stats",getDashboardData)

