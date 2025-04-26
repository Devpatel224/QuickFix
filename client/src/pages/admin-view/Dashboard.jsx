import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "@/store/admin-slice";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalBookings: 0,
    todayBookings: 0,
    weeklyBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalProviders: 0,
    bookings: [],
  });
   const dispatch = useDispatch();
   let { isLoading , dashboardStates} = useSelector((state)=>state.admin)
    
    useEffect(() => {
      if (dashboardStates) {
        setStats(dashboardStates);
      }
    }, [dashboardStates]);
    

  useEffect(() => {
      dispatch(getDashboardStats())
  }, [dispatch]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  if(isLoading) return <div className="font-semibold text-xl p-2">Loading Dashboard...</div>

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total Services", value: stats.totalServices },
          { label: "Total Bookings", value: stats.totalBookings },
          { label: "Today's Bookings", value: stats.todayBookings },
          { label: "This Week's Bookings", value: stats.weeklyBookings },
          { label: "Pending Bookings", value: stats.pendingBookings },
          { label: "Completed Bookings", value: stats.completedBookings },
          { label: "Total Providers", value: stats.totalProviders },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-md p-4 text-center"
          >
            <p className="text-gray-600">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
        <div className="grid gap-4">
          {stats.bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row justify-between"
            >
              <div>
                <p><strong>User:</strong> {booking.user.name}</p>
                <p><strong>Provider:</strong> {booking.provider.name}</p>
                <p><strong>Service:</strong> {booking.service.servicename}</p>
              </div>
              <div>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.requestStatus}</p>
                { booking.requestStatus === "declined" ? null : <p><strong>Work:</strong> {booking.workStatus}</p>}
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Weekly Bookings Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.weeklyChart || []}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};  

export default Dashboard;
