const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address:String,
  phone: String, 
  role: { type: String, enum: ['user', 'provider' , 'admin'], default: 'customer' }, 
  company : String,
  availableDates: [{ type: Date }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
},{tiemstamps: true});

module.exports = mongoose.model('User', UserSchema);
