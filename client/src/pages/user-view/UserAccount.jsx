import { useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests } from "@/store/user-slice";
import { Separator } from "@/components/ui/separator";

function UserAccount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests , isLoading } = useSelector((state) => state.userView);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllRequests(user.id));
    }
  }, [dispatch, user]);

  
  console.log(requests.filter((req)=> req.requestStatus !== "declined"  )  ,'declined filters')

  let filterredRequests = requests?.filter((req)=>  req.requestStatus !== "declined" && (req.requestStatus === "pending"  || req.workStatus === "pending" || req.workStatus === "in progress") )
  let completedRequests =  requests?.filter((req)=> req.workStatus==="completed" || req.requestStatus === "declined")

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "accepted":
        return <Badge className="bg-green-500 text-white">Accepted</Badge>;
        case "declined":
            return <Badge className="bg-red-600 text-white">Declined</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const getWorkStatusBadge = (workStatus) => {
  
    switch (workStatus){
      case "pending":
        return <Badge className="bg-orange-500 text-white">Work Pending</Badge>;
      case "in progress":
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
      className="p-6 w-full "
    >
      <div className="flex justify-center">
      <Card className="w-full max-w-sm">
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
      </div>

      <h3 className="text-lg font-semibold mt-6 self-start max-w-5xl w-full">Service Requests</h3>

      <div className="w-full  mt-4">        
      { isLoading ?
      (
         <div className="font-semibold text-xl">Loding...</div>)
        :
          requests.filter((req)=> req.workStatus==="completed")?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {filterredRequests.map((req) => (
              <Card key={req._id}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-lg">{req.service?.servicename}</h4>
                  <p className="text-gray-500 mb-2">{req.service?.description}</p>
                  <p className="text-sm">
                    <span className="font-semibold">Provider </span>: {req.provider?.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Provider Email </span>: {req.provider?.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Date </span>: {new Date(req.date).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-blue-600">RequestStatus</span>: {getStatusBadge(req.requestStatus)}
                    <span className="text-blue-600">WorkStatus</span>: {getWorkStatusBadge(req.workStatus)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No service requests found.</p>
        )}
      </div>

        <Separator className="my-10" />
      <h3 className="text-lg font-semibold mt-6 self-start max-w-5xl w-full">completed Works</h3>

      <div className="w-full  mt-4">        
      { isLoading ?
      (
         <div className="font-semibold text-xl">Loding...</div>)
        :
        completedRequests?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {completedRequests.map((req) => (
              <Card key={req._id}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-lg">{req.service?.servicename}</h4>
                  <p className="text-gray-500 mb-2">{req.service?.description}</p>
                  <p className="text-sm">
                    <span className="font-semibold">Provider </span>: {req.provider?.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Provider Email </span>: {req.provider?.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Date </span>: {new Date(req.date).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-blue-600">RequestStatus</span>: {getStatusBadge(req.requestStatus)}

                    { req.requestStatus !== "declined" ? (  <><span className="text-blue-600">WorkStatus</span>{getWorkStatusBadge(req.workStatus)} </> ) : null }
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No completed works found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default UserAccount;
