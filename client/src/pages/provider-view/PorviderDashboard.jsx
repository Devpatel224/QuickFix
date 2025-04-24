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
import ProviderBookingCard from "@/components/provider-view/ProviderBookingCard";




const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const { toast } = useToast(); 

  
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const { bookings, isLoading } = useSelector((state) => state.service);

  let notCompletedBookings = bookings.filter(
    (booking) =>
      booking.requestStatus !== "declined" && booking.workStatus !== "completed"
  );

   let completedAndDeclinedBookings = bookings.filter((booking)=> booking.requestStatus === "declined" || booking.workStatus === "completed")

   
 


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
              {            
              
              
              
              notCompletedBookings.map((booking,ind) => (

                
                <ProviderBookingCard key={ind} booking={booking}/>
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
