const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth/auth-route")
const serviceRouter = require("./routes/provider/service-route")

dotenv.config();

mongoose.connect("mongodb://localhost:27017/quickfix").then(()=>{
  console.log("Connected to MongoDB")
})
.catch((err)=>{
  console.log("Error connecting to MongoDB", err)
})


app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials:true,
        methods: ['GET, POST, PUT, DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            "Cache-Control",
            "Expires",
              "Pragma"
        ],
    }
))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth",authRouter)
app.use("/service-provider",serviceRouter)


app.use((err,req,res,next)=>{
   let statuscode = 500 || err.statuscode;
   let message = err.message || "Internal Server Error";
   let success = false;

   res.status(statuscode).json({
    message ,
    statuscode ,
    success
   })
})


app.get("/", (req, res) => {
  res.send("Hello World");
})


app.listen(3000)