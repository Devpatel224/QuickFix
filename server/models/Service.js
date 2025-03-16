const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    servicename: { type: String, required: true },
    description: { type: String, required: true },
    visitprice: { type: Number, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    adharnumber: { type: String, required: true },
    image: { type: String }, 
    provider: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

