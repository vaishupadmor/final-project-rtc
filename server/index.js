import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import { responder } from './utils/utils.js';
dotenv.config();

import {postPayments} from "./controllers/Payment.js"
import {postProducts,getProducts} from "./controllers/Product.js"
import {postOrders,putOrders,getOrderById,getOrdersByUserId} from "./controllers/Order.js"
import { postSignup ,postLogin} from './controllers/User.js';
import {jwtVerifyMiddleware,checkRoleMiddleware} from "./middlewares/auth.js"
const app =express();
app.use(express.json());
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
    return responder(res,true,"Server is running");
});

//auth 
app.post("/signup",postSignup);
app.post("/login",postLogin);

//product
app.post("/products",jwtVerifyMiddleware,checkRoleMiddleware,postProducts);
app.get("/products",getProducts);

//orders
app.post("/orders",jwtVerifyMiddleware,postOrders);
app.put("/orders/:id",jwtVerifyMiddleware,putOrders);
app.get("/orders/:id",jwtVerifyMiddleware,getOrderById)
app.get("/orders/user/:id",jwtVerifyMiddleware,getOrdersByUserId);
//payments
app.post("/payments",postPayments);

app.use("*" ,(req,res)=>{
   
return responder(res,false,"API endpoint doesnot exists",null ,404);
})

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})