User models

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, enum: ['customer', 'provider'], default: 'customer' },
  location: String,
  profilePic: String,
  reviews: [{ userId: String, rating: Number, comment: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);


Service Model

const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: String,
  availableSlots: [Date],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);


Booking Model

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  bookingDate: Date,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);








  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      description: "Pipe repairs, leak fixes, and installations.",
      category: "Plumber",
      price: 300,
      icon: "🚰",
    },
    {
      id: 2,
      title: "Electrician Service",
      description: "Wiring, lighting, and appliance repairs.",
      category: "Electrician",
      price: 500,
      icon: "⚡",
    },
  ];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    availableDates: [{ type: Date }], // New field for availability
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);






const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);









const express = require("express");
const Service = require("../models/Service");
const Booking = require("../models/Booking");
const router = express.Router();

// Get all services with provider details
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email phone");
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get details of a specific service provider
router.get("/service/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider", "name email phone");
    if (!service) return res.status(404).json({ error: "Service not found" });

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Book a service
router.post("/book", async (req, res) => {
  try {
    const { serviceId, userId, date } = req.body;

    // Check if date is available
    const service = await Service.findById(serviceId);
    if (!service || !service.availableDates.includes(new Date(date).toISOString())) {
      return res.status(400).json({ error: "Date not available" });
    }

    const booking = new Booking({
      service: serviceId,
      provider: service.provider,
      user: userId,
      date,
      status: "pending",
    });

    await booking.save();
    res.json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;












import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ServiceProvider = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const userId = "user-id"; // Replace with logged-in user ID

  useEffect(() => {
    axios.get(`/api/service/${id}`).then((res) => {
      setService(res.data);
    });
  }, [id]);

  const handleBooking = async () => {
    try {
      const res = await axios.post("/api/book", { serviceId: id, userId, date: selectedDate });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed");
    }
  };

  return service ? (
    <div>
      <h1>{service.servicename}</h1>
      <p>{service.description}</p>
      <p>Price: ${service.visitprice}</p>
      <p>Provider: {service.provider?.name}</p>
      <label>Select a Date:</label>
      <select onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="">Select</option>
        {service.availableDates?.map((date) => (
          <option key={date} value={date}>{new Date(date).toDateString()}</option>
        ))}
      </select>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ServiceProvider;
