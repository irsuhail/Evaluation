const mongoose=require("mongoose");
require("dotenv").config();

const DB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
            console.log("MongoDB Connected successfully");
        } catch (error) {
              console.log("MongoDB Connection error:",error);
        }
    };

    module.exports=DB;
