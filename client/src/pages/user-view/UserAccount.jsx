import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests } from "@/store/user-slice";

function UserAccount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.userView);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllRequests(user.id));
    }
  }, [dispatch, user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "accepted":
        return <Badge className="bg-green-500 text-white">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const getWorkStatusBadge = (workStatus) => {
    switch (workStatus) {
      case "pending":
        return <Badge className="bg-orange-500 text-white">Work Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-600 text-white">Completed</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-2xl mx-auto"
    >
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="bg-blue-500 flex items-center justify-center p-8">
            <h2 className="text-white text-4xl">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </h2>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold mt-6">Service Requests</h3>
      <div className="space-y-4 mt-4">
        {requests?.length > 0 ? (
          requests.map((req) => (
            <Card key={req._id}>
              <CardContent className="p-4">
                <h4 className="font-medium text-lg">{req.service?.servicename}</h4>
                <p className="text-gray-500 mb-2">{req.service?.description}</p>
                <p className="text-sm"> <span className="font-semibold">Provider </span>: {req.provider?.name}</p>
                <p className="text-sm"><span className="font-semibold">Provider Email </span>: {req.provider?.email}</p>
                <p className="text-sm"><span className="font-semibold">Date </span>: {new Date(req.date).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-blue-600">RequestStatus </span>: {getStatusBadge(req.requestStatus)}
                  <span className="text-blue-600">WorkStatus </span> : {getWorkStatusBadge(req.workStatus)}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No service requests found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default UserAccount;
