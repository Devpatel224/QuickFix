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








import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import demoimage from "@/assets/demo.jpg";

function Account() {
  const user = useSelector((state) => state.auth.user);

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

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <Avatar className="w-24 h-24 shadow-md">
          <AvatarImage src={user.avatar} alt="User Avatar" />
          <AvatarFallback className="font-bold text-3xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mt-4 text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Services Section */}
      <div className="flex flex-col items-center w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="font-semibold text-3xl text-gray-800">Services</h1>
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="rounded-2xl shadow-lg bg-white overflow-hidden transform transition-all hover:shadow-2xl">
                <CardContent className="flex flex-col p-4 gap-4">
                  {/* Service Image */}
                  <div className="w-full h-40">
                    <img
                      src={demoimage}
                      alt="Service"
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Service Details */}
                  <div className="flex flex-col gap-2 text-gray-700">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="text-2xl">{service.icon}</span> {service.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                    <p className="text-md">
                      Category: <span className="font-medium">{service.category}</span>
                    </p>
                    <p className="text-md">
                      Visit Price: <span className="font-medium text-blue-600">₹{service.price}</span>
                    </p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                      Book Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Account;
