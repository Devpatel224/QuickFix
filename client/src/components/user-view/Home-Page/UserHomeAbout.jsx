import  { useRef } from "react";
import { motion , useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import aboutImage from "../../../assets/about.jpg";
import { useNavigate } from "react-router-dom";

const UserHomeAbout = () => {
  const ref = useRef(null)
  const inView =  useInView(ref,{triggerOnce:false,margin:"-100px"})
  const navigate  = useNavigate();

  return (
    <div className="bg-gray-100 overflow-hidden my-12 px-4 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {opacity:0,x:-50}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full md:w-1/2 h-[400px] relative"
        >
          <img
            src={aboutImage}
            alt="About Us"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
          className="w-full md:w-1/2 p-6 md:p-12"
        >
          <h6 className="text-blue-600 text-lg font-semibold">About Us</h6>
          <h1 className="text-3xl font-bold mb-4">Years of Expertise in Service Solutions</h1>
          <p className="text-gray-600 mb-4">
            QuickFix is dedicated to delivering top-tier solutions for residential, commercial, and industrial service needs.  certified professionals ensures seamless and efficient service, addressing every challenge with precision and expertise.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="text-blue-600 mr-2" /> Certified and skilled professionals
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-blue-600 mr-2" /> Reliable and efficient service execution
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-blue-600 mr-2" /> Customer-centric approach with guaranteed satisfaction
            </li>
          </ul>
          <Button onClick={()=>navigate("services")} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md">
            Explore More
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default UserHomeAbout;
