import React from 'react'

function Input({label,val,onChange,placeholder=" ", type="text"}) {
    const inputId =`input-${label}`;
  return (
    <div className='bg-zinc-100 min-h-scrren flex flex-col items-center justify-center'>
    <h1> Signup</h1>
    <div className='w-[400px]  h-[600px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-4 py-6'>
<label htmlFor={inputId}>  {label}</label>
<input type={type} placeholder={placeholder} id={inputId} className='py-1 px-2 focus:outline-none border-gray-300 rounded-md w-full ' value={val} onChange={(e)=>onChange(e.target.value)}/>

    </div>
  </div>
  )
}

export default Input