require('dotenv').config()

const connect=async()=>{
    try {
await mongoose.connect(MONGODB_URL);
console.log("MongoDB is Successfully Connected");
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
    }
};

module.exports=connect;
