import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

async function verifyPassword() {
  const email = 'chandini@gmail.com';
  const testPassword = 'user2'; // Trying a common password from the .http file

  try {
    await mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: email });
    
    if (!user) {
      console.log("User not found");
      return;
    }
    
    console.log("User found. Hash in DB:", user.password);
    const isMatched = await bcrypt.compare(testPassword, user.password);
    console.log(`Password "${testPassword}" match:`, isMatched);
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
}

verifyPassword();
