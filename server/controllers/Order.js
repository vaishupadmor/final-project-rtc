import Order from "./../models/Order.js";
import { responder } from "../utils/utils.js";

const postOrders= async (req,res)=>{
    console.log("User info:" ,req.user);
    if(!req.user || !req.user._id){
        return res.status(401).json({success:false,message:"User not authentocated"})
    
    }
    const {
        products,
        
        deliveryAddress,
        phone,
        paymentMode,
        
        
    }=req.body;
if(!products  || !deliveryAddress || !phone || !paymentMode ){
    return responder(res,
        false,`products,totalBill,deliveryAddress,phone,paymentMode are required` 
        ,null ,400)
}

let totalBill =0;

products.forEach((product) => {
    totalBill += product.price * product.quantity;
})

try{
const newOrder = new Order({
    userId:req.user._id,
    products,
    totalBill,
    deliveryAddress,
    phone,
    paymentMode,
});

const savedOrder = await newOrder.save();
return responder(res, true,"Order placed successfully",savedOrder,savedOrder,201);

  }
  catch(error){
    return responder(res,false,error.message,null,400);
  }

};

const putOrders =async (req,res)=>{
     const user= req.user;
    console.log(user);
    const {id} =req.params;

    let order;
try{
    order =await Order.findById(id);

    if(!order){
        return responder(res,false,"Order not found",null,404)
    }
}catch(error){
    return responder(res,false,error.message,null,400);
}
    





if(user.role=="user" && order.userId!=user._id){
   
    return responder(res,false,"You are not authorized to update this order",null,401);
}
//user can only cancel order if it is not delivered
if(user.role=="user" && req.body.status === "cancelled" ){
   if(order.status != "delivered"){
    return responder(res,false,"Order has Already been delivered",null,400);
   }
   else{
    order.status = "cancelled";
    await order.save();
   }
   
}
if(user.role=="user"  ){
    if(order.status != "delivered"){
   
     return responder(res,false,"Order has Already been delivered",null,400);
    }
   if(req.body.status=="cancelled"){
     order.status = "cancelled";
     
    }
    
   
      
 }
 if(req.body.phone){
    order.phone = req.body.phone;
    
   }

   if(req.body.deliveryAddress){
    order.deliveryAddress = req.body.deliveryAddress;
    
   }

if(user.role=="admin"){
    order.status=req.body.status;
    order.timeline =req.body.timeline;
    await order.save();
}

await order.save();
const updateOrder = await Order.findById(id);
return responder(res,true,"Order Updated SuccessFully",updateOrder,200);


}


const getOrderById = async(req,res)=>{
    const user=req.user;
    
    const {id}= req.params;

    let order;
    try{
       
        order=await Order.findById(id).populate("userId", "name email").populate("products.productId","-shortDescription -longDescription -image -category -tags -_v -createdAt -updatedAt").populate("paymentId","-__v -createdAt -updatedAt") 
        if(!order){
            return responder(res,false,"Order not Found",null,404);
        }
        if(!order.userId){
            return responder(res,false,"Order has no associated user",null,400);
        }
    }
    catch(error){
        return responder(res,false,error.message,null,400);
    }

    if(!order.userId){
        return responder(res,false,"Order has no associated user me",null,400);
    }

    if(user._id!=order.userId._id && user.role!="admin"){
        return responder (res,false,"You are not authorized to view this order",null,401);
    }

    

    return responder(res,true,"Order fetched successfully",order,200);
}

const getOrdersByUserId=async(req,res)=>{
    const {id}=req.params;
    const user=req.user;

    if(user.role!="admin" && user._id!=id){
         return responder(res,false,"you are not authorized to view this orders",null,401);
    }

    const orders =await Order.find({userId :id}).populate("userId", "name email").populate("products.productId","-shortDescription -longDescription -image -category -tags -_v -createdAt -updatedAt").populate("paymentId","-__v -createdAt -updatedAt") ;
        return responder(res,true,"Orders fetched successfully",orders,200)
}

export {postOrders,putOrders,getOrderById,getOrdersByUserId}