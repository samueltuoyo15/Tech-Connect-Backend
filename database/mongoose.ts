import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDatabase = async () => {
  try{
    await mongoose.connect(process.env.MONGOOSE_URL!)
    console.log("Connected to MongoDb")
  }catch(error){
    console.error("Failed to connect to mongodb", error)
    process.exit(1)
  }
}

export default connectDatabase