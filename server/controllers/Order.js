import Order from "./../models/Order.js";

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
    return res.status(400).json({
        success:false,
        message:`products,totlaBill,deliveryAddress,phone,paymentMode, are required`,
    })
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

 return res.json({
    success:true,
    message:"Order placed successfully",
    data:newOrder      
})
  }
  catch(error){
    return res.status(400).json({success:false,message:error.message});
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
        return res.status(404).json({
            success:false,
            message:"Orders not found",
        })
    }
}catch(error){
    return res.status(400).json({success:false,message:error.message});
   }
    





if(user.role=="user" && order.userId!=user._id){
    return res.status(401).json({ 
        success:false,
        message:"You are not authorized to update this order",
    })
}
//user can only cancel order if it is not delivered
if(user.role=="user" && req.body.status === "cancelled" ){
   if(order.status != "delivered"){
    return res.status(400).json({
        success:false,
        message:"Order has Already been delivered",
    })
   }
   else{
    order.status = "cancelled";
    await order.save();
   }
   
}
if(user.role=="user"  ){
    if(order.status != "delivered"){
     return res.status(400).json({
         success:false,
         message:"Order has Already been delivered",
     })
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


return res.json({
    success:true,
    message:"Order Updated SuccessFully",
    data:updateOrder,
});


}


const getOrderById = async(req,res)=>{
    const user=req.user;
    
    const {id}= req.params;

    let order;
    try{
       
        order=await Order.findById(id).populate("userId", "name email").populate("products.productId","-shortDescription -longDescription -image -category -tags -_v -createdAt -updatedAt").populate("paymentId","-__v -createdAt -updatedAt") 
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not Found",
            })
        }
        if(!order.userId){
            return res.status(400).json({
                success:false,
                message:"Order has no associated user"
            })
        }
    }
    catch(error){
        return res.status(400).json({success:false,message:error.message});
    }

    if(!order.userId){
        return res.status(400).json({
            success:false,message:"Order has no associated user me"
        })
    }

    if(user._id!=order.userId._id && user.role!="admin"){
return res.status(401).json({
    success:false,
    message:"You are not authorized to view this order",
})
    }

    return res.json({
        success:true,
        message:"Order fetched successfully",
        data:order,
    })
}

export {postOrders,putOrders,getOrderById}