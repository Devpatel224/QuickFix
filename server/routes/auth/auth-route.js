const express = require("express");
const router = express.Router()
const {registerUser,loginUser,logoutUser,authMiddleWare}  = require("../../controllers/auth/auth-controller")


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.get("/check-auth",authMiddleWare,(req,res)=>{
        let user = req.user 
            res.status(200).json({
            message:"Authentiacted User",
            success : "true",
            user
        })
    
})




module.exports = router