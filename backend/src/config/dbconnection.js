import mongoose from "mongoose";
import 'dotenv/config'
const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbconnection;
