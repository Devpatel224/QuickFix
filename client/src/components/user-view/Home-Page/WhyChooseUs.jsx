import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheck, FaUserCheck, FaDraftingCompass, FaHeadphones } from "react-icons/fa";

import ServicesImage from "@/assets/WhyChooseUs.jpeg";

const features = [
  { icon: <FaCheck className="text-white" />, title: "Quality", subtitle: "Services" },
  { icon: <FaUserCheck className="text-white" />, title: "Expert", subtitle: "Workers" },
  { icon: <FaDraftingCompass className="text-white" />, title: "Free", subtitle: "Consultation" },
  { icon: <FaHeadphones className="text-white" />, title: "Customer", subtitle: "Support" },
];

const WhyChooseUs = () => {
  return (
    <div className="container mx-auto bg-gray-100 overflow-hidden my-10 px-6 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="py-10 px-6 lg:px-12"
        >
          <h6 className="text-primary text-lg font-semibold">Why Choose Us!</h6>
          <h1 className="text-3xl font-bold my-4">Providing Reliable Solar Solutions</h1>
          <p className="text-gray-600 mb-6">
            We are committed to delivering high-quality solar energy solutions for both commercial and residential properties. Our team of experts ensures efficient and cost-effective installations tailored to your needs.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-primary p-3 rounded-full text-white flex items-center justify-center  w-10 h-10 lg:w-12 lg:h-12">
                  {feature.icon}
                </div>
                <div>
                  <p className="text-gray-700 text-sm mb-1">{feature.title}</p>
                  <h5 className="text-sm md:text-lg font-semibold ">{feature.subtitle}</h5>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative min-h-[400px]"
        >
          <img src={ServicesImage} alt="All Services" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
