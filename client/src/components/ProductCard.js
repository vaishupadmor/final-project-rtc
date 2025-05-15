import React,{useState} from 'react'
import {shortText} from "../utils/common.js"
import { Plus as PlusIcon, Minus as MinusIcon,ChevronLeft as LeftArrow,ChevronRight as RightArrow } from 'lucide-react'
import Button from './Button.js'
import toast,{Toaster} from "react-hot-toast"

function ProductCard({_id,name,price,currentPrice,shortDescription,longDescription,tags,images,category}) {
    
const [currentImage ,setCurrentImage] = useState(images[0])
const [quantity ,setQuantity] = useState(1);  

const leftArrowClick = ()=>{
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex > 0 ? currentIndex - 1 :images.length - 1;
    setCurrentImage(images[newIndex])

}

const rightArrowClick = ()=>{
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentImage(images[newIndex])
}

const handleAddToCart=()=>{
    const cart=JSON.parse(localStorage.getItem("cart") || "[]");
    
const product= {
    productId:_id,
    quantity:quantity,
    name:name,
    image:currentImage,
    price:currentPrice,
};

let existingProductIndex= -1;
cart.forEach((item ,index) => {
    if(item.productId === _id){
        existingProductIndex=index
    }
});

if(existingProductIndex > -1){
    cart[existingProductIndex].quantity =quantity;
}else{
cart.push(product)
}


    localStorage.setItem("cart",JSON.stringify(cart))

    toast.success("Product added successfully")
}

return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden m-5 px-10 py-5 max-w-[600px] relative'>
        <span className='absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 text-xs  rounded-bl-lg'>
{category}
        </span>
       <div className='relative  h-40'>
        <LeftArrow 
        size={54} 
        className="absolute top-1/4 left-0 cursor-pointer" 
        onClick={leftArrowClick}
        />
         <img 
        src={currentImage}
        alt={name}
        className='w-full h-20 object-contain object-center'
        />
        <RightArrow 
        size={54} 
        className="absolute top-1/4 right-0 cursor-pointer"
         onClick={rightArrowClick}/>
       </div>

       <p>
        {tags.map((tag)=>{
            return <span className='bg-gray-200 text-gray-500 px-2 py-1 text-xs rounded-full mr-2'> {tag}</span>
        })}
       </p>
        <h1 className='font-bold text-xl'> {shortText(name,30)}</h1>
        <p className='text-sm'> {shortText(shortDescription,70)}</p>

        <p className='text-2xl my-2'>
           ₹ <del> {price}</del>
            <span className='font-bold'>
                 {currentPrice}
            </span>
        </p>
<div className='flex justify-center items-center'>
<PlusIcon className='cursor-pointer ' onClick={()=>{
    setQuantity(quantity + 1)
}}/>
<span className='mx-2 text-xl'>
    {quantity}
</span>
<MinusIcon className='cursor-pointer' 
 onClick={()=>{setQuantity(quantity - 1)}}/>

</div>
        <div className='flex justify-center mt-5'>
            <Button label="Add to cart" variant="primary" onClick={handleAddToCart} />
        </div>
        <Toaster/>
        </div>
  )
}

export default ProductCard