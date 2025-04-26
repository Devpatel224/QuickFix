const bookingModel = require("../../models/Boooking")
const serviceModel = require("../../models/Service");
const userModel = require("../../models/User");
const moment = require("moment");


const getDashboardData = async (req, res) => {
    try {
        const totalServices = await  serviceModel.countDocuments();
        const totalBookings = await bookingModel.countDocuments();
        
        const today = moment().startOf("day");
        const todayBookings = await bookingModel.countDocuments({
            createdAt: { $gte: today.toDate() },
        });

        
        const weekStart = moment().startOf("isoWeek");
        const weeklyBookings = await bookingModel.countDocuments({
            createdAt: { $gte: weekStart.toDate() },
        });
        
        const pendingBookings = await bookingModel.countDocuments({ requestStatus: "pending" });
        const completedBookings = await bookingModel.countDocuments({ workStatus: "completed" });
        
        const totalProviders = await userModel.countDocuments({ role: "provider" });
        
        const recentBookings = await bookingModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user provider service", "name servicename");
        

       
      const weeklyData = [];
      for (let i = 0; i < 7; i++) {
        const day = moment().startOf("week").add(i, "days");
        const nextDay = moment(day).add(1, "days");
        const count = await bookingModel.countDocuments({
          createdAt: { $gte: day.toDate(), $lt: nextDay.toDate() },
        });
        weeklyData.push({ day: day.format("ddd"), count });
      }  
      res.json({
        totalServices,
        totalBookings,
        todayBookings,
        weeklyBookings,
        pendingBookings,
        completedBookings,
        totalProviders,
        bookings: recentBookings,
        weeklyChart: weeklyData,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  }


module.exports = {getDashboardData}  