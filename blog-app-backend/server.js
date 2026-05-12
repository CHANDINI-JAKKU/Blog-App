import 'dotenv/config'
import exp from 'express'
import {connect} from 'mongoose';
import dns from 'dns';
import {userApp} from './APIs/UserAPI.js'
import {commonApp} from './APIs/CommonAPI.js'
import {authorApp} from './APIs/AuthorAPI.js'
import {adminApp} from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

// Fix for querySrv ECONNREFUSED on some networks
dns.setServers(['8.8.8.8']);

//create express app
const app=exp()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(cookieParser())
//body parser middleware
app.use(exp.json())
//path level middleware
app.use("/user-api",userApp)
app.use("/author-api",authorApp)
app.use("/admin-api",adminApp)
app.use("/auth",commonApp)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", version: "1.0.2", timestamp: new Date().toISOString() });
});

//connect to db
const port=process.env.PORT || 4000
const connectDB=async()=>{
    try{
        if(!process.env.DB_URL){
            throw new Error("DB_URL is not defined in .env file");
        }
        await connect(process.env.DB_URL)
        console.log("DB connected")
        app.listen(port,()=>console.log(`server listening on ${port}`))
    }catch(err){
        console.log("err in db connection:", err.message)
        process.exit(1) // Exit if DB connection fails
    }
}
connectDB()

//to handle inavlid path
app.use((req,res,next)=>{
    console.log(req.url)
    res.status(404).json({message:`${req.url} is invalid`})
})

//to handle error
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", error: message });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format", error: message });
  }

  // Handle other specific errors if needed
  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal Server Error" : message,
    error: message,
    details: err.stack, // 👈 ADD stack trace for debugging
  });
});

