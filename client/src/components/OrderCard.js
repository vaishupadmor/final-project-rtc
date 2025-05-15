import React from 'react'
import {ReceiptIndianRupee} from "lucide-react"
import {getReadableTimestamp} from "../utils/common.js"

function OrderCard({order,onClick}) {
    const {_id,status,products,createdAt,totalBill,deliveryAddress} =order;
  return (
    <div className='border p-4 m-4 bg-white relative rounded-md' onClick={onClick}>
<p> Order Id :{_id}  ,Ordered On : {getReadableTimestamp(createdAt)}</p>
<p className='text-lg text-bold mt-3'> {products.map((product, index) => {
  const { productId } = product;

  if (!productId) {
    return <span key={index}>[Product not found]</span>; // Or handle more gracefully
  }

  return <span key={productId._id}>{productId.name}</span>;
})}</p>
<p>
   Total Amount : ₹ {totalBill}
</p>
<p>
   Delivery Address :  {deliveryAddress}
</p>







<span className='bg-blue-500 rounded-full px-3 py-1 text-white absolute top-2 right-2'>{status} </span>
    </div>
    
  )
}

export default OrderCard