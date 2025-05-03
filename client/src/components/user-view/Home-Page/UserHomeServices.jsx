import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ElectricianService from "../../../assets/ElectricianService.jpg";
import PlumberService from "../../../assets/PlumberService.jpg";
import CarpenterService from "../../../assets/CarpenterService.jpg";
import AcService from "../../../assets/AcService.jpg";
import PestControlService from "../../../assets/PestControlService.png";
import HousePaintService from "../../../assets/HousePaintService.png";
import { Link } from "react-router-dom";

const services = [
  { id: 1, title: "Electrician Service", image: ElectricianService },
  { id: 2, title: "Plumber Service", image: PlumberService },
  { id: 3, title: "Carpenter Service", image: CarpenterService },
  { id: 4, title: "AC Service", image: AcService },
  { id: 5, title: "Pest Control Service", image: PestControlService },
  { id: 6, title: "House Paint Service", image: HousePaintService },
];

const UserHomeServices = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { triggerOnce: false, margin: "-100px" });
  const [isHoverInd,setIsHoverInd] = useState(null)

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold"
        >
          Our Services
        </motion.h1>
      </div>

      <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const cardRef = useRef(null);
          const isCardInView = useInView(cardRef, { triggerOnce: false, margin: "-50px" });

          return (
            <motion.div
              key={service.id}
              ref={cardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden shadow-lg rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                  <p className="text-gray-600 mb-4">
                    QuickFix offers top-quality {service.title.toLowerCase()} with skilled professionals ensuring reliability and excellence.
                  </p>
                  <div className="flex flex-col relative  max-w-[8vw]" onMouseEnter={()=>setIsHoverInd(index)} onMouseLeave={()=>setIsHoverInd(null)} >
                  <Link variant="link" to='services' className="text-blue-600 cursor-pointer">
                    Read More →
                  </Link>
                  <AnimatePresence>
                    {isHoverInd == index &&  
                  <motion.div 
                   className="h-[2px] bg-blue-600 absolute bottom-0 left-0"
                   initial={{width:0,opacity:0,left:0}}
                   animate={{width:"6vw",opacity:1,left:0}}
                   exit={{width:0,opacity:0,left:"6vw"}}
                   transition={{duration:0.4}} 
                  />
                    }

</AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UserHomeServices;
