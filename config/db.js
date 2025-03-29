import mongoose from 'mongoose';
import colors from 'colors';

const  connectDB=async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch(error){
        console.error(`Error:${error.message}`.red.underline.white);
       
    }
};
export default connectDB;