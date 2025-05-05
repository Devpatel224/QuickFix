import React, { useState ,useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import bannerOne from "../../assets/Ac5.webp"
import bannerTwo from "../../assets/plumber11.webp"
import bannerThree from "../../assets/plumber22.webp"
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Shirt, Umbrella, WatchIcon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion';
import UserHomeServices from '@/components/user-view/Home-Page/UserHomeServices';
import UserHomeAbout from '@/components/user-view/Home-Page/UserHomeAbout';
import UserStatics from '@/components/user-view/Home-Page/UserStatics';
import WhyChooseUs from '@/components/user-view/Home-Page/WhyChooseUs';
import Footer from '@/components/user-view/Home-Page/Footer';
import { useNavigate } from 'react-router-dom';


function Home() {
   const slides = [bannerOne,bannerTwo,bannerThree];
   const [slideNumber, setSlideNumber] = useState(0);
   const navigate = useNavigate();


   useEffect(() => {
    slides.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  useEffect(()=>{
     const interval = setInterval(() => {
        setSlideNumber((prev)=>((prev + 1)%slides.length))
    }, 5000);

    return ()=>clearInterval(interval)
  })

  return (
    <div className="bg-gray-100 w-full min-h-screen">   
    <div className="relative w-full h-[700px] mt-0 overflow-hidden">
     
      <AnimatePresence mode="wait">
        <motion.div
          key={slideNumber}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[slideNumber]}
            alt="Slide"
            className="w-full h-full object-cover blur-[3px] brightness-75 transition-opacity duration-700"
          />
        </motion.div>
      </AnimatePresence>

     
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h1 className="lg:text-5xl md:text-3xl text-xl font-extrabold text-white drop-shadow-lg">
            Provide The Best Services
          </h1>
          <p className="mt-4  md:text-lg text-sm  text-white drop-shadow-md">
            Get professional services at your doorstep with verified experts.
          </p>
          <Button onClick={()=>navigate("services")} className="mt-6 px-6 py-3  text-sm md:text-lg bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-md shadow-md">
            Get Started
          </Button>
        </div>
      </motion.div>

   
      <Button
        variant="outline"
        onClick={() =>
          setSlideNumber((prev) => (slides.length + (prev - 1)) % slides.length)
        }
        className="absolute outline-none top-1/2 left-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-md text-white"
      >
        <ChevronLeftIcon className="h-12 w-12" />
      </Button>

     
      <Button
        variant="outline"
        onClick={() => setSlideNumber((prev) => (prev + 1) % slides.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-md text-white"
      >
        <ChevronRightIcon className="h-12 w-12" />
      </Button>
    </div>
 


    <UserHomeServices></UserHomeServices>



    <UserHomeAbout></UserHomeAbout>


    <UserStatics></UserStatics>

    

      <WhyChooseUs></WhyChooseUs>

     <Footer></Footer>

  </div> 
  

  )
}

export default Home