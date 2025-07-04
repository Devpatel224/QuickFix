import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, statusChange } from "@/store/provider-slice";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


function ProviderHistoryOfRequests({completedAndDeclinedBookings}) {

  

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
            Completed and Declined Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedAndDeclinedBookings?.length === 0 ? (
            <p className="text-center text-gray-500">No bookings available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {completedAndDeclinedBookings?.map((booking) => (
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

                   {booking.requestStatus === "accepted" && <p className={`text-sm font-semibold ${booking?.workStatus === "pending"
                        ? "text-gray-500"
                        : booking?.workStatus === "in progress"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}>
                      Work Status: {booking?.workStatus}
                    </p>}
                  </div>                
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      </motion.div>
  )
}

export default ProviderHistoryOfRequests