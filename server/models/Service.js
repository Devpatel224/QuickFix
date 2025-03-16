const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    visitPrice: { type: Number, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    image: { type: String }, 
    provider: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

