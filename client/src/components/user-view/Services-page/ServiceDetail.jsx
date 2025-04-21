import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { serviceRequestSchema } from "@/zodValidation/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { getSpecificService, sentBookRequest } from "@/store/user-slice";
import { useToast } from "@/hooks/use-toast";


const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());



export default function ServicePage() {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceRequestSchema),
  });

  useEffect(() => {
    dispatch(getSpecificService(serviceId));
  }, [dispatch, serviceId]);

  const { specificService, isLoading } = useSelector((state) => state.userView);

  const submit = (data) => {
     console.log(data)

    dispatch(sentBookRequest({ serviceId, formData: data })).then((res) => {
      if (res.payload?.success) {
        toast({
          variant: "success",
          title: "Service Request Sent",
          description: "Your Service Request was sent to the provider.",
        });
        reset();
      } else {
        toast({
          variant: "destructive",
          title: "Failed to send Service Request",
          description: res.payload?.message || "Something went wrong.",
        });
      }
    });
  };

  if (isLoading || !specificService) {
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
            <p>
              <span className="font-medium">Name:</span> {specificService?.provider?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {specificService?.provider?.email}
            </p>
            <p>
              <span className="font-medium">Company:</span> {specificService?.provider?.company}
            </p>
            <p>
              <span className="font-medium">Location:</span> {specificService.address}
            </p>
            <p>
              <span className="font-medium">Visit Price:</span> ₹{specificService.visitprice}
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(submit)}
          className="mt-6 p-4 bg-blue-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-800">Request Service</h3>

          <div className="mt-4">
            <label className="block text-sm font-medium pl-2 text-gray-700">Your Address *</label>
            <input
              type="text"
              {...register("address")}
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.address && <p className="text-red-500 pl-2 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium pl-2 text-gray-700">Your Contact Number *</label>
            <input
              type="number"
              {...register("contact")}
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
              placeholder="Enter your Contact Number"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.contact && <p className="text-red-500 pl-2 text-sm mt-1">{errors.contact.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium pl-2 text-gray-700">Select Date *</label>
            <input
              type="date"
              {...register("date")}
              min={today.toISOString().split("T")[0]}
              max={maxDate.toISOString().split("T")[0]}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.date && <p className="text-red-500 pl-2 text-sm mt-1">{errors.date.message}</p>}
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
