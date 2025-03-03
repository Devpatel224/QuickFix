import React, { useRef } from "react";
import { motion , useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaUsers, FaCheck, FaAward, FaUsersCog } from "react-icons/fa";

const stats = [
  { id: 1, icon: <FaUsers className="text-white text-3xl" />, value: 0, label: "Happy Customers" },
  { id: 2, icon: <FaCheck className="text-white text-3xl" />, value: 0, label: "Projects Done" },
  { id: 3, icon: <FaAward className="text-white text-3xl" />, value: 0, label: "Awards Won" },
  { id: 4, icon: <FaUsersCog className="text-white text-3xl" />, value: 0, label: "Expert Workers" },
];

const UserStatics = () => {

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) =>{ 
          const ref = useRef(null)
          const inView = useInView(ref,{triggerOnce:false,margin:"-100px"});          
          
          return (
          <motion.div
            key={stat.id}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {opacity:0,y:20}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-white">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                {stat.icon}
              </div>
              <h1 className="text-4xl font-bold">{stat.value}</h1>
              <h5 className="text-lg font-semibold mt-2">{stat.label}</h5>
              <p className="text-gray-600 text-center mt-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.</p>
            </Card>
          </motion.div>
        )})}
      </div>
    </div>
  );
};

export default UserStatics;