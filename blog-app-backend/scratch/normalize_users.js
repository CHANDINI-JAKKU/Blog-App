import mongoose from 'mongoose';
import 'dotenv/config';

async function normalize() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
    
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    
    for (let u of users) {
      const lowerEmail = u.email.toLowerCase();
      if (u.email !== lowerEmail) {
        console.log(`Normalizing ${u.email} -> ${lowerEmail}`);
        await db.collection('users').updateOne({ _id: u._id }, { $set: { email: lowerEmail } });
      }
    }
    
    console.log("Finished normalizing users");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
}

normalize();
