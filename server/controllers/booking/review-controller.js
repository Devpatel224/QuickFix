const customeError = require("../../utils/customeError");
const reviewModel = require("../../models/Review");
const bookingModel = require('../../models/Boooking')

const addReview = async (req, res) => {
  try {
    const { comment, rating, bookingId } = req.body;
    const userId = req.user.id;

    const booking = await bookingModel
      .findById(bookingId)
      .populate("service provider");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (booking.workStatus !== "completed") {
      return res.status(400).json({ message: "Service Not Completed Yet" });
    }

    if (booking.isReviewed) {
      return res.status(400).json({ message: "Review Already Submitted" });
    }

    const review = await reviewModel.create({
      booking: booking._id,
      service: booking.service._id,
      provider: booking.provider._id,
      user: userId,
      rating: Number(rating),
      comment,
    });

    booking.isReviewed = true;
    booking.review = review._id;
    await booking.save();

    return res.status(201).json({
      message: "Review added",
      review,
      success : true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


const getReviews = async (req, res) => {
  try {
    const { serviceId } = req.body;

    const reviews = await reviewModel.find({ service: serviceId }).populate("user", "name");

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {addReview , getReviews}
