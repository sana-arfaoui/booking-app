

import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js"
import usersRoute from "./api/routes/users.js"
import hotelsRoute from "./api/routes/hotels.js"
import roomsRoute from "./api/routes/rooms.js"
import cookieParser from "cookie-parser"
dotenv.config();
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})
const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to db");
    }catch(error){
       throw error 
    }
}
//midleware
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500 ;
    const errMessage = err.message || "Something went Wrong" 
    return res.status(errorStatus).json({
        succes: false,
        status: errorStatus,
        stack: err.stack,
    })

    
})


app.listen(8800,()=>{
    connect()
    console.log("connect to backend")
})