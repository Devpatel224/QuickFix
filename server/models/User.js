const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, enum: ['user', 'provider' , 'admin'], default: 'customer' }, 
  company : String,
},{tiemstamps: true});

module.exports = mongoose.model('User', UserSchema);
