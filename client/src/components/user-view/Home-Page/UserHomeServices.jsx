
import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default UserHomeServices;
