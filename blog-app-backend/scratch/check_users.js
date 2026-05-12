import mongoose from 'mongoose';
import 'dotenv/config';

async function checkUsers() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
    
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    
    console.log("Found users:", users.map(u => ({ email: u.email, role: u.role, firstName: u.firstName })));
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error checking users:", err);
  }
}

checkUsers();
