const bookingModel = require("../../models/Boooking")
const serviceModel = require("../../models/Service");
const userModel = require("../../models/User");
const moment = require("moment");
const customeError = require("../../utils/customeError");


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

const getAllProvider = async(req,res)=>{
  try{  
      const providers = await userModel.find({role:"provider"}).populate("services");
      res.status(201).json(providers)
  }catch(error){
    res.status(500).json({ message: "Failed to fetch Providers" }); 
  }
}  

const deleteProvider = async(req,res)=>{
  try{
     let {id }= req.params

    
      let provider = await userModel.findById(id)
      if(!provider || provider.role !== 'provider'){
        customeError(501,'Provider Not Found')
      }
    

      await serviceModel.deleteMany({provider:provider._id})

      await userModel.findByIdAndDelete(id)


      res.status(201).json({"message" : "Provider Deleted Successfully",success:true})
  }catch(error){
    res.status(501).json("Failed to Delete Provider")
  }
}



module.exports = {getDashboardData , getAllProvider ,deleteProvider}  