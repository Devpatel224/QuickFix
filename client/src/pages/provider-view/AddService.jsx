import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService } from "@/store/provider-slice";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { serviceSchema } from "@/zodValidation/validation";
import addserviceImg from "@/assets/addservice.jpg"

function formatText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const AddService = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const imageRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    mode: "onBlur",
  });

  const onSubmit = async (formData) => {
    const serviceData = new FormData();
    for (const key in formData) {
      if (key === "servicename" || key === "category") {
        serviceData.append(key, formatText(formData[key]));
      } else {
        serviceData.append(key, formData[key]);
      }
    }

    if (user?.id) {
      serviceData.append("id", user.id);
    }

    dispatch(createService(serviceData)).then((data) => {
      if (data.payload?.success) {
        toast({
          variant: "success",
          message: "Service Added Successfully",
          description: "Your service has been added successfully.",
        });
        reset();
        if (imageRef.current) imageRef.current.value = null;
      } else {
        toast({
          variant: "destructive",
          message: "Failed to Add Service",
          description: data.payload?.message || "Something went wrong.",
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-lg flex items-center rounded-2xl p-8">
      <motion.div
        className="w-1/2 hidden md:block"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={addserviceImg} 
          alt="Service Visual"
          className="rounded-xl w-full h-auto object-cover"
        />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 px-6"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">
          Add New Service
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Service Name *"
              {...register("servicename")}
              className="w-full p-2 border rounded"
            />
            {errors.servicename && (
              <p className="text-red-500 text-sm">{errors.servicename.message}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Description *"
              {...register("description")}
              className="w-full p-2 border rounded resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Visit Price *"
              {...register("visitprice")}
              className="w-full p-2 border rounded"
            />
            {errors.visitprice && (
              <p className="text-red-500 text-sm">{errors.visitprice.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Category *"
              {...register("category")}
              className="w-full p-2 border rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Address *"
              {...register("address")}
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Aadhar Number *"
              {...register("adharnumber")}
              maxLength={12}
              onInput={(e) => {
                if (e.target.value.length > 12) {
                  e.target.value = e.target.value.slice(0, 12);
                }
              }}
              className="w-full p-2 border rounded"
            />
            {errors.adharnumber && (
              <p className="text-red-500 text-sm">{errors.adharnumber.message}</p>
            )}
          </div>

          <div>
            <input
              type="file *" 
              ref={imageRef}
              className="w-full p-2 border rounded"
              accept="image/*"
              onChange={(e) => {
                setValue("image", e.target.files[0]);
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Submitting..." : "Add Service"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddService;
