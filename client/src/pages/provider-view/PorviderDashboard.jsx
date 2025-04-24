import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, statusChange } from "@/store/provider-slice";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ProviderHistoryOfRequests from "@/components/provider-view/ProviderHistoryOfRequests";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const noteSchema = z.object({
  providerNote: z
    .string()
    .min(5, "Note must be at least 5 characters")
    .max(200, "Note must be under 200 characters"),
});


const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  

  const {
    register,    
    formState: { errors,  },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(noteSchema),
  });


   let note = watch("providerNote");

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const { bookings, isLoading } = useSelector((state) => state.service);

  let notCompletedBookings = bookings.filter(
    (booking) =>
      booking.requestStatus !== "declined" && booking.workStatus !== "completed"
  );

   let completedAndDeclinedBookings = bookings.filter((booking)=> booking.requestStatus === "declined" || booking.workStatus === "completed")

   
  const handleStatusChange = async (bookingId, statusType, statusValue) => {

    // console.log(bookingId,statusType,statusValue , note)

    dispatch(statusChange({ bookingId, statusType, statusValue , providerNote : note})).then((data) => {
      if (data.payload.success) {
        toast({
          variant: "success",
          title: "Status Changed",
          description: "Status has been changed successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to change status",
          description: data.payload?.message || "Something went wrong.",
        });
      }
    });
    reset();
  };

  if (isLoading || !bookings) {
    return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
  }

  return (
    <motion.div
      className="p-4 space-y-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-md rounded-lg w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Provider Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>

          {notCompletedBookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {notCompletedBookings.map((booking) => (
                <motion.div
                  key={booking?._id}
                  className="border p-4 rounded-lg shadow-md bg-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    {booking?.user?.name || "User"} ({booking?.user?.email})
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Contact:{" "}
                    {booking?.user?.contact || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Service: <span className="font-medium">{booking?.service?.servicename ? booking?.service?.servicename : "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Date: {new Date(booking?.date).toLocaleDateString()}
                  </p>

                  <div className="mt-2">
                    <p className={`text-sm font-semibold ${booking?.requestStatus === "pending"
                        ? "text-blue-600"
                        : booking?.requestStatus === "accepted"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                      Request Status: {booking?.requestStatus}
                    </p>
                    <p className={`text-sm font-semibold ${booking?.workStatus === "pending"
                        ? "text-gray-500"
                        : booking?.workStatus === "in progress"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}>
                      Work Status: {booking?.workStatus}
                    </p>
                  </div>

                  {booking?.requestStatus === "pending" && <> 
      <form className="space-y-4 mt-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-gray-700 font-medium mb-1" htmlFor="providerNote">
            Note *
          </label>
          <textarea
            id="providerNote"
            {...register("providerNote")}
            rows="4"
            className={`w-full p-3 border ${
              errors.providerNote ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition  resize-none`}
            placeholder="Give Message to the user and If you want to Declined the request, please mention the reason here"
          />
          {errors.providerNote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
               className="text-red-500 text-sm mt-1"
            >
              {errors.providerNote.message}
            </motion.p>
          )}
        </motion.div>
      </form>
      </>}
   


                  <div className="flex flex-wrap gap-2 mt-4">
                    {booking?.requestStatus === "pending" && (
                      <>                      
                        <motion.button
                          whileHover={{scale:0.95}}
                          variant="success"
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
                          onClick={() => handleStatusChange(booking?._id, "requestStatus", "accepted")}                          
                        >
                          Accept
                        </motion.button>
                        
                        <motion.button
                          whileHover={{scale:0.95}}
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
                          onClick={() => handleStatusChange(booking?._id, "requestStatus", "declined")}
                        >
                          Decline
                        </motion.button>
                      </>
                    )}

                  
                    

                    {booking?.requestStatus === "accepted" &&
                      booking?.workStatus === "pending" && (
                        <motion.button
                        whileHover={{scale:0.95}}
                          variant="warning"
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md cursor-pointer"
                          onClick={() =>
                            handleStatusChange(booking?._id, "workStatus", "in progress")
                          }
                        >
                          Start Work
                        </motion.button>
                      )}

                    {booking?.workStatus === "in progress" && (
                      <motion.button
                        variant="success"
                        whileHover={{scale:0.95}}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() =>
                          handleStatusChange(booking?._id, "workStatus", "completed")
                        }
                      >
                        Mark as Complete
                      </motion.button>
                    )}
                  </div>


                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ProviderHistoryOfRequests  completedAndDeclinedBookings={completedAndDeclinedBookings}/>
    </motion.div>
  );
};

export default ProviderDashboard;
