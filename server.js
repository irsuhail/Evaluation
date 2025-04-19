const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const morgon=require("morgon");

const userRoutes=require("./routes/user.routes");
const taskRoutes=require("./routes/task.routes");
const logger=require("./middlewares/logger.middleware");


dotenv.config();
const app=express();

app.use(express.json());
app.use(morgon("dev"));
app.use(logger);

app.use("/users",userRoutes);
app.use("/tasks",taskRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Server running on http://localhost:${process.env.PORT}');
    });

}).catch(err=>{
    console.log("DB Connection Error",err);
})

