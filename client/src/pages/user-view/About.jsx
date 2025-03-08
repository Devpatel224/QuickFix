import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AboutImage from "@/assets/AboutPage.jpg";
import Footer from "@/components/user-view/Home-Page/Footer";

const AboutUs = () => {
  return (
    <>
     
      <div className="bg-gray-100 overflow-hidden mt-24 mb-0 px-6 lg:px-0 " >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-10 pb-0 mb-0"
          >
            <h6 className="text-primary text-lg font-semibold">About QuickFix</h6>
            <h1 className="text-3xl font-bold my-4">Reliable Solutions, Anytime</h1>
            <p className="text-gray-600 mb-6">
              QuickFix connects you with top-rated professionals for industrial, commercial, and residential services. We ensure quality, reliability, and hassle-free experiences.
            </p>
            <Button className="bg-primary text-white py-3 px-6 rounded-md">Learn More</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative min-h-[300px] mr-0.5"
          >
            <img src={AboutImage} alt="About Us" className="w-full h-[75%]  object-cover rounded-lg shadow-lg" />
          </motion.div>
        </div>
      </div>
      
      
      <div className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose QuickFix?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">We prioritize quality, security, and efficiency. Our verified professionals guarantee top-notch service.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <h3 className="text-xl font-semibold mb-2">Verified Experts</h3>
              <p className="text-gray-600">All professionals undergo background checks and skill verification.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">We ensure timely responses and quick service execution.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Rated highly by thousands of satisfied users.</p>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h3 className="text-xl font-semibold mb-2">Plumbing</h3>
              <p className="text-gray-600">Professional plumbing solutions for homes and businesses.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h3 className="text-xl font-semibold mb-2">Electrical Work</h3>
              <p className="text-gray-600">Expert electricians for all electrical needs.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h3 className="text-xl font-semibold mb-2">AC Repair</h3>
              <p className="text-gray-600">Efficient AC servicing and repairs by specialists.</p>
            </div>
          </div>
        </div>
      </div>
      
     
      <div className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <p className="text-gray-600 italic">"QuickFix provided excellent service. Highly recommend!"</p>
              <h3 className="text-lg font-semibold mt-4">- John Doe</h3>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-100">
              <p className="text-gray-600 italic">"Very professional and timely. Will use again!"</p>
              <h3 className="text-lg font-semibold mt-4">- Sarah Lee</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white mb-10">
      <div className="bg-primary text-white  py-16 text-center rounded-4xl mx-10">
        <h2 className="text-2xl font-bold mb-4">Get Started with QuickFix Today!</h2>
        <p className="text-lg mb-6">Find the best professionals for your needs with just a click.</p>
        <Button className="bg-white text-primary py-3 px-6 rounded-md hover:bg-gray-300">Explore Services</Button>
      </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
