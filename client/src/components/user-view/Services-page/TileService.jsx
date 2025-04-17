import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpecificService } from '@/store/user-slice';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
    
  function TileService({service,index}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOpenServiceDetail = (service)=>{
        console.log(service)
        dispatch(getSpecificService(service._id))
        navigate(`/user/serviceDetail/${service._id}`)
    } 


    return (
    <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" className="flex">
          <Card className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden flex flex-col w-full h-full">
            <img src={service.image} alt={service.name} width={400} height={250} className="w-full h-70 object-cover " />
            <CardHeader className="flex-1">
              <CardTitle className="text-xl font-bold text-blue-600">{service.servicename}</CardTitle>
              <p className="text-sm text-gray-500">{service.category}</p>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
              
              <p className="text-sm font-semibold text-gray-900">Visit Price: ₹{service.visitprice} </p>
              <p className="text-sm text-gray-600">Location: {service.address}</p>

              <Button onClick={()=>handleOpenServiceDetail(service)} className="bg-blue-400 hover:bg-blue-600 text-white mt-3">View More Details</Button>
            </CardContent>
          </Card>
        </motion.div>
  )
}

export default TileService