import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getDates, getServices } from "@/store/provider-slice";
import { useToast } from "@/hooks/use-toast";
import ProviderDate from "@/components/provider-view/ProviderDate";

function Account() {
  const user = useSelector((state) => state.auth.user);
  const providerServices = useSelector((state) => state.service.providerServices);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { unavailableDates} = useSelector((state) => state.service);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteService(id)).then((data) => {
      if (data.payload.success) {
        toast({
          variant: "success",
          title: "Deleted",
          description: "Service has been successfully deleted",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while deleting service",
        });
      }
    });
  };



  useEffect(()=>{
    dispatch(getDates(user.id));
  },[dispatch,user.id])


  useEffect(() => {
    dispatch(getServices(user.id));
  }, [dispatch, user.id]);

    
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

        
        <Button
          onClick={() => setShowDatePicker(true)}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white transition rounded-xl shadow"
        >
          Set Unavailable Dates
        </Button>
      </div>

      
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-2xl w-[40vw] max-w-3xl relative"
            >
              <button
                onClick={() => setShowDatePicker(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>
              <ProviderDate  unavailableDates={unavailableDates} setShowDatePicker={setShowDatePicker}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="font-bold text-4xl text-gray-800 tracking-wide">Services</h1>
        </motion.div>

        {providerServices ? (
          <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {providerServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="p-2 rounded-xl shadow-md bg-white relative">
                  <CardContent className="flex p-4 gap-5 items-center">
                    <div className="w-1/2 h-40 overflow-hidden rounded-xl shadow-md">
                      <img
                        src={service.image}
                        alt="Service"
                        className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-300"
                      />
                    </div>

                    <div className="flex w-[75%] flex-col gap-2 font-semibold text-md text-gray-700">
                      <h2 className="text-lg font-bold text-gray-900">
                        Service Name:{" "}
                        <span className="font-medium text-gray-600">
                          {service.servicename}
                        </span>
                      </h2>
                      <p className="text-gray-600">
                        Category: <span className="font-medium">{service.category}</span>
                      </p>
                      <p className="my-2 text-gray-700 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <p className="text-gray-800">
                        Visit Price:{" "}
                        <span className="font-medium text-blue-600">
                          ₹{service.visitprice}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Address: <span className="font-medium">{service.address}</span>
                      </p>
                    </div>
                  </CardContent>

                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleDelete(service._id)}
                    className="absolute right-5 top-5"
                  >
                    <AiOutlineUserDelete
                      className="w-6 h-6 cursor-pointer"
                      fill="red"
                    />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <h1 className="font-bold text-2xl">No Services</h1>
        )}
      </div>
    </motion.div>
  );
}

export default Account;
