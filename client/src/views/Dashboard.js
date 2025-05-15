import React ,{useEffect, useState} from 'react'
import { getCurrentUser, logout } from '../utils/common';
import { Mail as MailIcon,  Truck as TruckIcon,IdCard as NameIcon   ,KeySquare as RoleIcon ,LogOut as LogOutIcon} from 'lucide-react';
import toast ,{Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom';

const UserDetailRow =({icon ,value})=>{
return (
     <p className='flex items-center mb-4 text-xl'> 
                {icon}  <span className='ms-4'> {value}</span></p>
)
}

function Dashboard() {
    const [user,setUser] =useState(
        {
            name:"",
            email:"",
            role:"",
            
        }
    );

    useEffect(()=>{
        const user=getCurrentUser();
        if(user)
        {
            setUser(user);
        }
    },[])
  return (
    <div>
        <h1  className='text-center my-4 text-2xl'> 
            Dashboard
        </h1>
        <div className='bg-white w-[500px] mx-auto p-10 rounded-lg shadow-lg mt-10'>
            <div className='flex bg-grey-100 mb-10 pb-10'>
                <Link to="/user/orders" className='block text-center text-xs mb-4 mx-2 bg-blue-100 p-2'>
                <TruckIcon className='mx-auto inline' size={24}/>
            <span className='text-xs'> My Orders</span>
            </Link>
            <Link to="/orders" className='block text-center text-xs mb-4 mx-2 bg-blue-100 p-2'>
                <TruckIcon className='mx-auto inline' size={24}/>
            <span className='text-xs'> My Orders</span>
            </Link>
            <Link to="/orders" className='block text-center text-xs mb-4 mx-2 bg-blue-100 p-2'>
                <TruckIcon className='mx-auto inline' size={24}/>
            <span className='text-xs'> My Orders</span>
            </Link>
           <Link to="/orders" className='block text-center text-xs mb-4 mx-2 bg-blue-100 p-2'>
                <TruckIcon className='mx-auto inline' size={24}/>
            <span className='text-xs'> My Orders</span>
            </Link>
            
            </div>
            <UserDetailRow icon={<NameIcon/>} value={user?.name}/>
            <UserDetailRow icon={<MailIcon/>} value={user?.email}/>
           <UserDetailRow icon={<RoleIcon/>} value={user?.role}/>
<button type='button' className='mx-auto block bg-red-500 text-white px-4 py-2 mt-4 rounded-md' onClick={()=>{
    toast.success("Logout successfull ")
    logout()
}}>
   
   
    Logout
     <LogOutIcon className='inline ms-4'/></button>
        </div>
        <Toaster/>
    </div>
  )
}

export default Dashboard