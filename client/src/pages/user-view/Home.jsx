import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "../../assets/plumber11.webp";
import UserHomeServices from "@/components/user-view/Home-Page/UserHomeServices";
import UserHomeAbout from "@/components/user-view/Home-Page/UserHomeAbout";
import UserStatics from "@/components/user-view/Home-Page/UserStatics";
import WhyChooseUs from "@/components/user-view/Home-Page/WhyChooseUs";
import Footer from "@/components/user-view/Home-Page/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 w-full min-h-screen">

      
      <section className="container mx-auto px-15 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center md:text-start"
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Trusted Home Services
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Book Skilled <br /> Professionals Near You
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Find verified experts for plumbing, electrical, cleaning, and more.
            Fast booking, transparent pricing, and reliable service.
          </p>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => navigate("/services")}
              className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-xl shadow-md"
            >
              Explore Services
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/about")}
              className="px-6 py-3 text-lg rounded-xl"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40 -z-10" />

          <img
            src={heroImage}
            alt="Professional service"
            className="w-full max-w-lvw mx-auto rounded-3xl shadow-2xl object-cover"
          />
        </motion.div>
      </section>

     
      <UserHomeServices />
      <UserHomeAbout />
      <UserStatics />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}

export default Home;
