import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();
dns.setServers(['8.8.8.8']);

const testConn = async () => {
    console.log("Testing with URL from .env...");
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected successfully!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("Connection failed:", err.message);
    }
};

testConn();
