const customeError = require("../../utils/customeError");
const userModel = require("../../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const registerUser =async (req,res,next)=>{
    try{
        const {email,password , role , name , company } = req.body;

        if(!email || !password || !role || !name){
            return next(customeError(400,"Please provide all required fields"))
        }

        if(role !== "user" && role !== "provider" && role !== "admin"){
            return next(customeError(401,"Invalid Role"))
        }

        if(role === "provider" && !company){
            return next(customeError(401,"Please provide company name"))
        }

        let exitedUser = await userModel.findOne({$or:[{email},{name}]});

        if(exitedUser){
            return next(customeError(401,"User already exists"))
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let user = await userModel.create({email,password : hashedPassword,role,name,company});
      

        console.log(user)        

        res.status(201).json({success:true,data:user,message:"User Created Successfully"})
    }catch(err){
        if(err.code === 11000) {
            console.log("Duplicate key error details:", err.keyValue)
            const duplicateField = Object.keys(err.keyValue)[0];
            const duplicateValue = err.keyValue[duplicateField];
            return res.status(401).json({
                message: `Duplicate value detected: ${duplicateField} (${duplicateValue})`,
            });
        }
        next(err)
    }
}


const loginUser = async (req,res,next)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return next(customeError(400,"Please provide email and password"))
        }

        let exitedUser = await userModel.findOne({email});

        console.log(exitedUser)

        if(!exitedUser){
            return next(customeError(401,"Invalid credentials"))
        }

        let isMatch = await bcrypt.compare(password,exitedUser.password);

        if(!isMatch){
            return next(customeError(401,"Invalid credentials"))
        }
        
        let token = jwt.sign({id:exitedUser._id , email:exitedUser.email , role:exitedUser.role , name:exitedUser.name},process.env.JWT_SECRET,{expiresIn: '1h'});

        res.cookie("token",token,{httpsOnly:true,secure:false}).status(200).json({success:true,
            user:{
                email:exitedUser.email,
                role:exitedUser.role,
                name:exitedUser.name,
                id:exitedUser._id,
                company:exitedUser.company
            },
            message:"Login SuccessFull"})

    }catch(err){
        next(err)
    }
}

const logoutUser = async (req,res,next)=>{
    try{
        res.clearCookie("token").json({
            message:"Logout Successfully",
            success:"true"
        }) 
    }catch(err){
        next(err)
    }
}

const authMiddleWare = (req,res,next)=>{
   
    const token = req?.cookies?.token
    
    console.log(token)
    if(!token){
        return next(customeError(401,"Unauthorised user!"))
    }
        
    try{
        
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decodedData;
        next();
    }catch(err){
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "JWT expired, please log in again." });
          }
          return res.status(400).json({ message: "Invalid token." });
        }
    
}

module.exports = {registerUser,loginUser,logoutUser,authMiddleWare}