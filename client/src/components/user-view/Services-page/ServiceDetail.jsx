import { useState } from "react";
import { motion } from "framer-motion";
import { getSpecificService, sentBookRequest } from '@/store/user-slice'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useLocation, useParams } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast";



//     servicename: "Electrician",
//     description: "I am an Electrician",
//     image: "https://res.cloudinary.com/dhgqymdqa/image/upload/v1742215749/uploads/image-1742215749411.png",
//     address: "Visnagar, Gujarat",
//     visitprice: 197,
//     provider: {
//       name: "xyz",
//       email: "xyz@gmail.com",
//       company: "xyz"
//     }
//   };

export default function ServicePage({ service }) {
    const dispatch = useDispatch()
    let location = useLocation()
    let {serviceId} = useParams()
    let {toast} = useToast()

    
  

    useEffect(()=>{
        dispatch(getSpecificService(serviceId))
    },[dispatch , serviceId])

    let {specificService , isLoading} = useSelector((state)=>state.userView)

   

    const [formData, setFormData] = useState({ address: "", date: "" });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Request:", formData);
    console.log(serviceId)
    dispatch(sentBookRequest({serviceId,formData})).then((data)=>{

        if (data.payload?.success){
            toast({
              variant: "success",
              title : "Service Request Sent",
              description: "Your Service Request sent to provider.",
            });
          } else {
            toast({
              variant: "destructive",
              title : "Failed to sent Service",
              description: data.payload?.message || "Something went wrong.",
            });
          }

          setFormData({address: "", date: ""})

    })
  };

  if(isLoading || !specificService) {
    return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
  }



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <motion.img
          src={specificService.image}
          alt={specificService.servicename}
          className="w-full h-64 object-cover rounded-xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-gray-800">{specificService.servicename}</h2>
          <p className="text-gray-600 mt-2">{specificService.description}</p>

        
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold">Provider Details:</h3>
            <p><span className="font-medium">Name:</span> {specificService?.provider?.name}</p> 
            <p><span className="font-medium">Email:</span> {specificService?.provider?.email}</p>
            <p><span className="font-medium">Company:</span> {specificService?.provider?.company}</p>
            <p><span className="font-medium">Location:</span> {specificService.address}</p>
            <p><span className="font-medium">Visit Price:</span> ₹{specificService.visitprice}</p>
          </div>
        </motion.div>

       
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 p-4 bg-blue-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-800">Request Service</h3>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Your Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min = {new Date().toISOString().split("T")[0]}
              max = {new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()).toISOString().split("T")[0]}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}
