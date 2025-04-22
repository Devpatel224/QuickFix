import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import demoImage from "@/assets/demo.jpg"
import TileService from "./TileService";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "@/store/user-slice";


function ServicesPanel({selectedCategory}){
    
    const dispatch = useDispatch()
    const {services} = useSelector((state)=>state.userView)
    const {providerServices} = useSelector((state)=>state.service)

    useEffect(()=>{
        dispatch(getAllServices())
    },[dispatch])  

     const filteredServices = selectedCategory ? services.filter((service)=> service.servicename === selectedCategory) : services;

     return (
    <div className="w-full min-h-screen p-6">
    <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
      {filteredServices.map((service, index) => (
        <TileService service={service} key={index} index={index}/>
      ))}
    </div>
  </div>
  );
}

export default ServicesPanel;
