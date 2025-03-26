import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, statusChange } from "@/store/provider-slice"; // Ensure this action is implemented in Redux
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const {toast} = useToast()
  
    useEffect(() => {
      dispatch(getBookings());
    }, [dispatch]);

  const { bookings , isLoading } = useSelector((state) => state.service);

  let notCompletedBookings = bookings.filter((booking) => booking.requestStatus != "declined" && booking.workStatus != "completed"
)
  
  const handleStatusChange = async (bookingId, statusType , statusValue) => {
    dispatch(statusChange({bookingId,statusType,statusValue})).then((data)=>{
        
       if(data.payload.success){
          toast({
            variant : "success",
            title:"Status Change",
            description:"status has been change successfully"
          })
       } else {
        toast({
          variant: "destructive",
          title : "Failed to change status",
          description: data.payload?.message || "Something went wrong.",
        });
      }
    })
  };

  if(isLoading || !bookings) {
    return (<div className="text-center text-lg font-semibold mt-10">Loading...</div>)
  }

  return (
    <motion.div 
      className="p-2 space-y-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-md rounded-lg w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-gray-800">Provider Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full border border-gray-300 rounded-lg">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="p-3 text-left">User</TableHead>
                  <TableHead className="p-3 text-left">Service</TableHead>
                  <TableHead className="p-3 text-left">Date</TableHead>
                  <TableHead className="p-3 text-left">Request Status</TableHead>
                  <TableHead className="p-3 text-left">Work Status</TableHead>
                  <TableHead className="p-3 text-left">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="6" className="p-3 text-center text-gray-500">
                      No bookings available
                    </TableCell>
                  </TableRow>
                ) : (
                  notCompletedBookings?.map((booking) => (
                    <motion.tr 
                      key={booking?._id}
                      className="border-b"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TableCell className="p-3">{booking.user.name ? booking.user.name : "User"}({booking?.user?.email})</TableCell>
                      <TableCell className="p-3">{booking?.service?.servicename}</TableCell>
                      <TableCell className="p-3">{new Date(booking?.date).toLocaleDateString()}</TableCell>
                      
                      
                      <TableCell className={`p-3 font-semibold ${booking?.requestStatus === "pending" ? "text-blue-600" : booking?.requestStatus === "accepted" ? "text-green-600" : "text-red-600"}`}>
                        {booking?.requestStatus}
                      </TableCell>

                     
                      <TableCell className={`p-3 font-semibold ${booking?.workStatus === "pending" ? "text-gray-500" : booking?.workStatus === "in progress" ? "text-yellow-600" : "text-green-600"}`}>
                        {booking?.workStatus}
                      </TableCell>

                      <TableCell className="p-3 flex gap-2">
                       
                        {booking?.requestStatus === "pending" && (
                          <>
                            <Button
                              variant="success"
                              className="px-3 py-1 bg-green-400 cursor-pointer hover:bg-green-500"
                              onClick={() => handleStatusChange(booking?._id, "requestStatus", "accepted")}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="destructive"
                              className="px-3 py-1 cursor-pointer bg-red-600 hover:bg-red-700"
                              onClick={() => handleStatusChange(booking?._id, "requestStatus", "declined")}
                            >
                              Decline
                            </Button>
                          </>
                        )}

                     
                        {booking?.requestStatus === "accepted" && booking?.workStatus === "pending" && (
                          <Button
                            variant="warning"
                            className="px-3 py-1 text-green-500 cursor-pointer"
                            onClick={() => handleStatusChange(booking?._id, "workStatus", "in progress")}
                          >
                            Start Work
                          </Button>
                        )}

                        {booking?.workStatus === "in progress" && (
                          <Button
                            variant="success"
                            className="px-3 py-1 text-green-500 cursor-pointer"
                            onClick={() => handleStatusChange(booking._id, "workStatus", "completed")}
                          >
                            Mark as Completed
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProviderDashboard;
