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





