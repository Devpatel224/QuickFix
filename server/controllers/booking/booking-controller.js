const bookingModel = require("../../models/Boooking")
const userModel = require("../../models/User");
const serviceModel = require("../../models/Service");
const customeError = require("../../utils/customeError");


const userRequestBooking = async (req,res,next)=>{
    try{
        let {address,date} = req.body;
        let {serviceId} = req.params;
        let userId = req.user.id;

        console.log(address,date,req.body , "chekcing for lf;asldkfa");

        if (!date) {
            return next(customeError(400, "Date is required for booking"));
        }

        console.log("It's coming here");    
     
        
        const service = await serviceModel.findById(serviceId).populate("provider");
        console.log(service)
        if(!service) return next(customeError(401,"Service is not Found"));

        const provider = service.provider;
        if (!provider) return next(customeError("Service provider not found", 404));

        const user = await userModel.findById(userId);
        user.address = address;
        await user.save();

        const newBooking = new bookingModel({
            service: serviceId,
            provider: provider,
            user: userId,
            date,
            status: "pending"
        });


        await newBooking.save();
        res.status(201).json({ success:true, message: "Booking request sent successfully", booking: newBooking });
    }catch(e){
        next(e)
    }
}


module.exports = {userRequestBooking}