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

// Dynamic CORS configuration allowing localhost origins and credentials
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
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

//connect to db & start server
const port = process.env.PORT || 4000;

// Start server first so backend endpoints on 4000 are always active
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      console.warn("DB_URL is not defined in .env file");
      return;
    }
    await connect(process.env.DB_URL);
    console.log("DB connected successfully to MongoDB");
  } catch (err) {
    console.warn("DB connection warning (Atlas IP restriction or offline):", err.message);
  }
};

connectDB();

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

