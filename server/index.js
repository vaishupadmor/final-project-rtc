import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app =express();
app.use(cors());

//Connect to MongoDb
const connectDB=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI);
    if(conn)
    {
        console.log(`MONGODB Connection successful`);
    }
};

app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"server is running",
    })
})

app.use("*" ,(req,res)=>{
    res.status(404).json({success:false,message:"API endpoint doesn't exists"});
})

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})