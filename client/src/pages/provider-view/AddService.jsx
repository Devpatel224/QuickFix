import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService } from "@/store/provider-slice";
import { motion } from "framer-motion";
import addServiceImage from "@/assets/addservice.jpg"
import { useToast } from "@/hooks/use-toast";

const AddService = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.service);
  const {user} = useSelector((state) => state.auth);
  const {toast} = useToast();
  const imageRef = useRef(null);

  const [formData, setFormData] = useState({
    servicename: "",
    description: "",
    visitprice: "",
    category: "",
    address: "",
    adharnumber: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const serviceData = new FormData();
    Object.keys(formData).forEach((key) => {
      serviceData.append(key, formData[key]);
    });
  
    if (user?.id) {
      serviceData.append("id", user.id); // Ensure user ID is added
    }
  
    dispatch(createService(serviceData)).then((data) => {
      if (data.payload?.success) {
        
  
        toast({
          variant: "success",
          message: "Service Added Successfully",
          description: "Your service has been added successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          message: "Failed to Add Service",
          description: data.payload?.message || "Something went wrong.",
        });
      }

      setFormData({
        servicename: "",
        description: "",
        visitprice: "",
        category: "",
        address: "",
        adharnumber: "",
        image: null,
    });
    if(imageRef.current){
      imageRef.current.value = null;
    }
    });

  };
  

  return (
   
      <div className="bg-white shadow-lg flex  p-8">
       
        <motion.div
          className="w-1/2 hidden md:block"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={addServiceImage}
            alt="Service"
            className="w-full h-auto rounded-lg"
          />
        </motion.div>

       
        <motion.div
          className="w-full md:w-1/2 px-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">Add New Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="servicename"
              placeholder="Service Name"
              value={formData.servicename}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="visitprice"
              placeholder="Visit Price"
              value={formData.visitprice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="adharnumber"
              placeholder="Aadhar Number"
              value={formData.adharnumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="file"
              name="image"
              ref={imageRef}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

           
          
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Add Service"}
            </button>
          </form>
        </motion.div>
      </div>
    
  );
};

export default AddService;
