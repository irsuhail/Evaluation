require("dotenv").config();

const express=require("express");
const connect=require('../config/db');
const userRoutes=require('../routes/userRoutes');
const recipeRoutes=require('../routes/recipeRoutes');
const logger=require('../middleware/logger');

const app=express();
app.use(express.json());
app.use(logger);
app.use(userRoutes);
app.use(recipeRoutes);

connect();

app.listen (5000,()=>
    console.log("Server running on port 5000")
);
