
import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const ServiceCard = ({ service, index }) => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { margin: "-50px" });
  const [isHoverInd, setIsHoverInd] = useState(false);

  function handleMouseEnter(event){
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    gsap.set(cursorRef.current,{
        x,
        y,
        xPercent: -50,
       yPercent: -50,
        autoAlpha: 1 
    })
  }
  function handleMouseMove(event) {
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.5,
      ease: "power1.out",   
      autoAlpha: 1,
    });
  }

  function handleMouseLeave() {
    gsap.to(cursorRef.current, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power1.out",
    });
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative overflow-hidden shadow-lg rounded-lg"
      >
       <div
  ref={cursorRef}
  className="absolute w-14 h-14 rounded-full border-2 bg-blue-500 text-xs text-white font-bold opacity-0 cursor-pointer flex items-center justify-center"
  style={{ zIndex: 20 }}
>
  <Link to="services" className="flex flex-col items-center  leading-[0.8rem]  text-[12px]">
    <span>See</span>
    <span>More</span>
    <span><FaArrowRightLong /></span>
  </Link>
</div>

        <img
          src={service.image}
          alt={service.title}
          className="w-full h-56 object-cover"
        />
        <CardContent className="p-4">
          <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
          <p className="text-gray-600 mb-4">
            QuickFix offers top-quality {service.title.toLowerCase()} with
            skilled professionals ensuring reliability and excellence.
          </p>
          <div
            className="flex flex-col relative max-w-[8vw]"
            onMouseEnter={() => setIsHoverInd(true)}
            onMouseLeave={() => setIsHoverInd(false)}
          >
           
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
