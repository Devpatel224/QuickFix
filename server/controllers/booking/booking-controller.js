const bookingModel = require("../../models/Boooking")
const userModel = require("../../models/User");
const serviceModel = require("../../models/Service");
const customeError = require("../../utils/customeError");


const userRequestBooking = async (req,res,next)=>{
    try{
        let {address,date, contact} = req.body;
        let {serviceId} = req.params;
        let userId = req.user.id;
         
        
        if (!date || !address || !contact){
            return next(customeError(400, "Date is required for booking"));
        }       
        
        const service = await serviceModel.findById(serviceId).populate("provider");
   
        if(!service) return next(customeError(401,"Service is not Found"));

        const provider = service.provider;
        if (!provider) return next(customeError("Service provider not found", 404));
      
        const user = await userModel.findById(userId);
        user.address = address;
        user.contact = contact;
        await user.save();

        const newBooking = new bookingModel({
            service: serviceId,
            provider: provider,
            user: userId,
            date,
            requestStatus: "pending",
            workStatus: "pending"
        });


        await newBooking.save();
        res.status(201).json({ success:true, message: "Booking request sent successfully", booking: newBooking });
    }catch(e){
        next(e)
    }
}


const getProviderDashboard = async(req,res,next)=>{
    try {
        let providerId = req.user.id;

        const bookings = await bookingModel.find({provider:providerId})
        .populate("user", "name email address contact")
        .populate("service","servicename description").exec()

        res.status(200).json({
            success:true,
            data:bookings
        })

    } catch (e) {
        next(e)
    }   
}


const statusChange = async(req,res,next)=>{
    try{
        let{ id }= req.params;
        let {requestStatus,workStatus,providerNote} = req.body;

    const updateFields = {};
    if (requestStatus) updateFields.requestStatus = requestStatus;
    if (workStatus) updateFields.workStatus = workStatus;
    if (providerNote) updateFields.providerNote = providerNote;

    const booking = await bookingModel.findByIdAndUpdate(id,updateFields,{new:true})
    .populate("user", "name email address")
    .populate("service","servicename description").exec()

    if(!booking) next(customeError(501,"Booking not Found"))

    return res.status(200).json({
        success:true,
        data:booking
    })

    }catch(e){
        return next(e)
    }
}

const getUserRequestes = async(req,res,next)=>{
    try {
        
        let {id} = req.body;       
        if(!id) return next(customeError(401,"some error occured"));

        let bookings = await bookingModel.find({user:id})
        .populate("provider","name email contact company")
        .populate("service","servicename description").exec()
    
        
        if(!bookings) return next(customeError(501,"Bookings doesn't Exits"))
         
        console.log(bookings , "bookings from api hahahahaha")
         return res.status(200).json({
            success:true,
            data:bookings
         })   
    } catch (e) {
        return next(e)
    }
}




module.exports = {userRequestBooking , getProviderDashboard , statusChange , getUserRequestes }