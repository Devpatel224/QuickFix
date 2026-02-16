import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";


import PestControlService from "../../../assets/PestControlService.png";
import EleService from '../../../assets/ElecService.jpg'
import PlumberSer from '../../../assets/PlumberSer.jpg'
import carpenterSer from '../../../assets/carpenterSer.jpg'
import AcSer from '../../../assets/AcSer.jpg'
import HousePaint from '../../../assets/HousePaint.jpg'


const services = [
  { id: 1, title: "Electrician Service", image: EleService },
  { id: 2, title: "Plumber Service", image: PlumberSer },
  { id: 3, title: "Carpenter Service", image: carpenterSer },
  { id: 4, title: "AC Service", image: AcSer },
  { id: 5, title: "Pest Control Service", image: PestControlService },
  { id: 6, title: "House Paint Service", image: HousePaint },
];

const UserHomeServices = () => {
  return (
    <section className="relative py-20 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Professional home services delivered with quality, care, and trust.
          </p>
        </motion.div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserHomeServices;
