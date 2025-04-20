const userModel = require("../../models/User");
const serviceModel = require("../../models/Service");
const customeError = require("../../utils/customeError");


const createService = async(req,res,next)=>{
    try{  
        
        console.log("Body Data:", req.body);
        console.log("File Data:", req.file);

        let {servicename,description,visitprice,address,category,id,adharnumber} = req.body;

       
        if(!servicename || !description || !visitprice || !category || !address || !id || !adharnumber){
            return next(customeError(400,"Please provide all required fields"))
        }

        if(!req.file){
            return next(customeError(400,"Please provide an image"))
        }

        const image = req.file.path;

        let provider = await userModel.findById(id);

        if(! provider){
            return next(customeError(400,"Provider not found"))
        }         
       
        if(provider.role !== "provider"){
            return next(customeError(400,"You are not a provider"))
        }

        if(provider.services.length >= 2){
            return next(customeError(400,"You can only add 2 services"))
        }

        let service = await serviceModel.create({
            servicename,
            description,
            visitprice,
            address,
            category,
            image,
            provider:id,
            adharnumber
        })
        
        provider.services.push(service._id);
        await provider.save();

        res.status(201).json({
            success:true,
            data:service
        })
        
    }catch(e){
        next(e)
    }
}

const getServices = async(req,res,next)=>{
    try{
        const id = req.params.id;

        let provider = await userModel.findById(id).populate("services");

        if(!provider){
            return next(customeError(400,"Provider not found"))
        }

        res.status(200).json({
            success:true,
            data:provider.services
        })
    }catch(e){
        next(e)
    }
}

const deleteService = async(req,res,next)=>{
    try{
        
        const serviceId = req.params.id;

        let service = await serviceModel.findByIdAndDelete(serviceId).populate({
            path : "provider",
            select : "_id services"
        });
        
        if(!service){
            return next(customeError(400,'Service not found'))
        }


        service.provider.services = service.provider.services.filter((id) => id.toString()!== serviceId.toString())
        await service.provider.save();
        

        res.status(200).json({
            success:true,
            data:{}
        })
        
    }catch(e){
        next(e);
    }
}

const getAllServices = async (req,res,next)=>{
    try{
         
        let services = await serviceModel.find()

        return res.status(201).json({
            success:true,
            data:services
        })
    }catch(e){
        next(e);
    }
}

const getSpecificService = async(req,res,next)=>{
    try{
        let { id } = req.params;
        
        console.log(id)

        const service = await serviceModel.findById(id).populate({
            path: "provider",
            select: "_id name email address phone company"
        });

        return res.status(201).json({
            success: true,
            data : service
        })
    }catch(e){
        return next(e);
    }
}

const setUnavailableDates = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const { unavailableDates } = req.body;

        
        if(!unavailableDates || unavailableDates.length === 0){
            return next(customeError(400,"Please Provide not Available Dates"))
        }

        const provider = await userModel.findById(id);
        if(!provider){
            return next(customeError(400,"Provider not found"))
        }

        provider.unavailableDates = [...provider.unavailableDates,...unavailableDates];
        await provider.save();

        return res.status(200).json({
            success:true,
            data:provider.unavailableDates
        })
    }catch(e){
        return next(e);
    }
}

module.exports ={createService,getServices , deleteService , getAllServices , getSpecificService , setUnavailableDates}