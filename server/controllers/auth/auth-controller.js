

const registerUser = (req,res,next)=>{
    try{
        const {email,password} = req.body;
    }catch(err){
        next(err)
    }
}