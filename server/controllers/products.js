import Product from "../models/Product.js"

const postProducts = async(req,res)=>{
const {
    name,
    shortDescription,
    longDescription,
    price,
    currentPrice,
    category,
    images,
    tags

}= req.body

const mandotoryFields =["name","shortDescription","longDescription","price","category","images"]
for(const field of mandotoryFields){
    if(!req.body[field]){
        return res.status(400).json({success:false,message:`${field} is required`})
    }
}

const newProduct=new Product({
    name,
    shortDescription,
    longDescription,
    price,
    currentPrice,
    category,
    images,
    tags
});
try{
    const savedProduct =await newProduct.save();
    return res.json({
        success:true,
        message:"Product created successfully",
        data:savedProduct
    });
    
}catch(e){
    return res.status(400).json({success:false,message:e.message});
}
}


const getProducts=async(req,res)=>{
    const {limit} =req.query;

    let {search} =req.query;
    search =search.replaceAll( "\\"," ");
 
 const products =await Product.find(
   {
    $or: [
    {
       name:{
            $regex:new RegExp(search || ""),
            $options:"i"
        }
    },
    {
        shortDescription:{
            $regex:new RegExp(search || ""),
            $options:"i"
        }
    },
    {
        longDescription:{
            $regex:new RegExp(search || ""),
            $options:"i"
        }
    }
    
],
   }
 ).limit(parseInt(limit || 100));

 return res.json({
    success:true,
    data:products,
    message:"Products fetched successfully"
 })
}


export {postProducts,getProducts}