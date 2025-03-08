import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ElectricianService from "../../../assets/ElectricianService.jpg";
import PlumberService from "../../../assets/PlumberService.jpg";
import CarpenterService from "../../../assets/CarpenterService.jpg";
import AcService from "../../../assets/AcService.jpg";
import PestControlService from "../../../assets/PestControlService.png";
import HousePaintService from "../../../assets/HousePaintService.png";

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
                  <Button variant="link" className="text-blue-600 hover:underline">
                    Read More →
                  </Button>
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
