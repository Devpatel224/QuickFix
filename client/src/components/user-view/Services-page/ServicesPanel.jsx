import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import demoImage from "@/assets/demo.jpg"
import TileService from "./TileService";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "@/store/user-slice";

// const services = [
//   {
//     name: "Plumber",
//     category: "Home Services",
//     description: "Expert plumbing services for homes and businesses.",
//     visitPrice: "$50",
//     location: "New York, NY",
//     image: demoImage,
//   },
//   {
//     name: "Electrician",
//     category: "Electrical Services",
//     description: "Reliable electrical installations and repairs.",
//     visitPrice: "$60",
//     location: "Los Angeles, CA",
//     image: demoImage,
//   },
//   {
//     name: "Carpenter",
//     category: "Woodwork",
//     description: "High-quality woodwork and furniture services.",
//     visitPrice: "$70",
//     location: "Chicago, IL",
//     image: demoImage,
//   },
//   {
//     name: "Painter",
//     category: "Painting Services",
//     description: "Professional painting services for interiors and exteriors.",
//     visitPrice: "$40",
//     location: "Houston, TX",
//     image: demoImage,
//   },
// ];



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
