import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactImage from "@/assets/ContactUs.jpg"
import Footer from "@/components/user-view/Home-Page/Footer";

const ContactUs = () => {
  return (
    <>
    <div className="bg-gray-100 overflow-hidden mt-24 mb-10 px-6 lg:px-0 ">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 pb-0 mb-0"
        >
          <h6 className="text-primary text-lg font-semibold">Contact Us</h6>
          <h1 className="text-3xl font-bold my-4">Feel Free To Contact Us</h1>
          <p className="text-gray-600 mb-6">
            Have any questions or need support? Fill out the form below, and our team will get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" />
            </div>
            <input type="text" placeholder="Subject" className="w-full p-3 border rounded-md" />
            <textarea placeholder="Your Message" className="w-full p-3 border rounded-md h-28"></textarea>
            <Button className="bg-primary text-white py-3 px-6 rounded-md">Send Message</Button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative min-h-[400px]"
        >
          <img src={ContactImage} alt="Contact Us" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ContactUs;
