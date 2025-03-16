import React, { useEffect} from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import demoimage from "@/assets/demo.jpg";
import { useDispatch } from "react-redux";
import { deleteService, getServices } from "@/store/provider-slice";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";

function Account() {
  const user = useSelector((state) => state.auth.user);
  const services = useSelector((state) => state.service.services); 
  const dispatch = useDispatch()
  const {toast} = useToast()
  
    
   useEffect(()=>{
    dispatch(getServices(user.id))
   },[dispatch,user.id,services])


   const handleDelete = (id)=>{
    
     dispatch(deleteService(id)).then((data)=>{
         if(data.payload.success){
            toast({
                variant : "success",
                title: "Deleted",
                description: "Service has been successfully deleted",
            })
         }else{
            toast({
                variant : "destructive",
                title: "Error",
                description: "An error occured while deleting service",
            })
        }
    })
   }


   
//     {
//       id: 1,
//       title: "Plumbing Service",
//       description: "Pipe repairs, leak fixes, and installations.",
//       category: "Plumber",
//       price: 300,
//       icon: "🚰",
//     },
//     {
//       id: 2,
//       title: "Electrician Service",
//       description: "Wiring, lighting, and appliance repairs.",
//       category: "Electrician",
//       price: 500,
//       icon: "⚡",
//     },
//   ];


  return (
    <motion.div
      className="w-full h-full flex flex-col items-center p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <Avatar className="w-24 h-24 shadow-md">
          <AvatarImage src={user.avatar} alt="User Avatar" />
          <AvatarFallback className="font-bold text-3xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold mt-4 text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-lg">{user.email}</p>
      </div>


      <div className="flex flex-col items-center w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="font-bold text-4xl text-gray-800 tracking-wide">Services</h1>
        </motion.div>

    
       {services ?( <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="p-2 rounded-xl shadow-md bg-white relative">
                <CardContent className="flex p-4 gap-5 items-center">
                
                  <div className="w-1/2 h-40 overflow-hidden rounded-xl shadow-md">
                    <img
                      src={service.image || demoimage}
                      alt="Service"
                      className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-300"
                    />
                  </div>

             
                  <div className="flex w-[75%] flex-col gap-2 font-semibold text-md text-gray-700">
                    <h2 className="text-lg font-bold text-gray-900">
                      Service Name: <span className="font-medium text-gray-600">{service.servicename}</span>
                    </h2>
                    <p className="text-gray-600">
                      Category: <span className="font-medium">{service.category}</span>
                    </p>
                    <p className="my-2 text-gray-700 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <p className="text-gray-800">
                      Visit Price: <span className="font-medium text-blue-600">₹{service.visitprice}</span>
                    </p>
                    <p className="text-gray-600">
                      Address: <span className="font-medium">{service.address}</span>
                    </p>
                  </div>
                </CardContent>
                
                <motion.div whileHover={{ scale: 1.2 }} onClick={()=>handleDelete(service._id)} className="absolute right-5 top-5">
                <AiOutlineUserDelete className="w-6 h-6 cursor-pointer" fill="red"></AiOutlineUserDelete></motion.div> 
              </Card>
            </motion.div>
          ))}
        </div>) : <h1 className="font-bold text-2xl">No Services</h1>
  }

      </div>
    </motion.div>
  );
}

export default Account;
