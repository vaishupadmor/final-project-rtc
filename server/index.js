import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import session from "express-session";

import { responder } from './utils/utils.js';
dotenv.config();

const app =express();
app.use(express.json());
app.use(
    cors({
      
      origin:["https://final-project-rtc.onrender.com/"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
  );

   app.use(
    session({
      secret: "test_secret",
      resave:false,
      saveUninitialized:true,
      cookie: { maxAge: 1000 * 60 * 60, httpOnly: false, secure: false },
    })
  );

import {postPayments} from "./controllers/payments.js"
import {postProducts,getProducts} from "./controllers/products.js"
import {postOrders,putOrders,getOrderById,getOrdersByUserId} from "./controllers/orders.js"
import { postSignup ,postLogin} from './controllers/users.js';
import {jwtVerifyMiddleware,checkRoleMiddleware} from "./middlewares/auth.js"


//Connect to MongoDb
const connectDB=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI);
    if(conn)
    {
        console.log(`MONGODB Connection successful`);
    }
};

app.get("/health", (req, res) => {
 
  return responder(res, true, "Server is running");
 
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

const PORT =process.env.PORT ||5002;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})