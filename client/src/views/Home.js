
import React, { useEffect,useState } from 'react'
import toast ,{Toaster} from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import HomeImg from "./Ecommerce-page-bro.png"
import cartIcon from "../assets/cart.png"
import { Link } from 'react-router-dom';
import {api} from "../utils/common.js"

 function Home() {

  const [products,setProducts] =useState([]);
  const [search,setSearch] = useState(" ");
  
  
  const loadProducts=async()=>{
    try{
    const response =await api.get(`/products?limit=100&search=${search}`)
  

    setProducts(response.data.data)
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  
  useEffect(()=>{
    loadProducts();
  },[search])


  return (
    <div>
      <img src={HomeImg}
      className='h-24 object-cover object-center block mx-auto'
      alt='header'
      />
     <div className='flex justify-center py-10'>
      <input 
       type='text'
       placeholder='Search Products'
       value={search}
       onChange={(e)=>{
        setSearch(e.target.value)
       }}
        className='w-2/3 p-2 border-gray-300 rounded-md text-2xl active:outline-none focus:outline-none'/>
     </div>

      <div className='flex flex-wrap justify-center'>
        {products.map((product)=>{
return <ProductCard  key={product._id} {...product}/>
      })}
      </div>
      <Link to="user/cart" >
      <img 
      src={cartIcon}
      alt='shopping cart'
      className='fixed top-10 right-10 w-16 h-16 cursor-pointer bg-white rounded-full shadow-lg'
      />
      </Link>
      <Toaster/>
    </div>
  )
}

export default Home;