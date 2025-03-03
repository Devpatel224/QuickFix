import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gray-900 text-gray-400 mt-10 pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div>
            <h5 className="text-white mb-4 text-lg">Address</h5>
            <p className="flex items-center gap-2"><FaMapMarkerAlt />  Mehsana, Gujrat</p>
            <p className="flex items-center gap-2"><FaPhoneAlt /> +091 345 67890</p>
            <p className="flex items-center gap-2"><FaEnvelope /> info@example.com</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl"><FaYoutube /></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedinIn /></a>
            </div>
          </div>
          
         
          <div>
            <h5 className="text-white mb-4 text-lg">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Our Services</a></li>
              <li><a href="#" className="hover:text-white">Terms & Condition</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          
         
          <div>
            <h5 className="text-white mb-4 text-lg">Newsletter</h5>
            <p>Subscribe to our newsletter for the latest updates.</p>
            <div className="relative mt-4">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="w-full rounded-md py-2 pl-4 pr-20 border-0" 
              />
              <Button className="absolute top-1 right-1 bg-blue-600 hover:bg-blue-700 py-2 px-4">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
      
     
      <div className="bg-gray-800 py-4 text-center text-sm">
        <p>&copy; 2024 Your Site Name, All Rights Reserved.</p>
      </div>
    </motion.footer>
  );
}
