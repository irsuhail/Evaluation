const express=require("express");
const DB=require("./config/db");
require("dotenv").config();

app.use(express.json());
DB();

app.get("/",(req,res)=>{
    res.send("User Management Syatem")
});


app.listen (5000,()=>
    console.log("Server running on port 5000")
);