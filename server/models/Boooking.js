const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    providerNote: { type: String },
     requestStatus: { 
        type: String, 
        enum: ["pending", "accepted", "declined"], 
        default: "pending" 
      },
      workStatus: { 
        type: String, 
        enum: ["pending", "in progress", "completed"], 
        default: "pending" 
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
