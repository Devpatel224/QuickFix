    const express = require("express");
    const { addReview, getReviews } = require("../../controllers/booking/review-controller");
    const { authMiddleWare } = require("../../controllers/auth/auth-controller");
    const router = express.Router();

    router.post("/addReview",authMiddleWare, addReview);
    router.post("/getReviews",authMiddleWare, getReviews);

    module.exports = router