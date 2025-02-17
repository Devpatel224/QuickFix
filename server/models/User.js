const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, enum: ['customer', 'provider'], default: 'customer' }, 
},{tiemstamps: true});

module.exports = mongoose.model('User', UserSchema);
