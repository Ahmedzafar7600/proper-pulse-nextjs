import mongoose from "mongoose";

let connected= false;

const connectDB= async ()=>{
  mongoose.set('strictQuery',true)

  //if the database already connected dont connect again

  if(connected){
    console.log('Mongo Db is already connected');
    return;
  }

  //connect to Mongo Db
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    connected=true;
  }
  catch(error){
    console.log(error);
  }

}
export default connectDB;