import React from 'react'

function Input({label,val,onChange,placeholder=" ", type="text"}) {
    const inputId =`input-${label}`;
  return (
    <div>
<label htmlFor={inputId}>  {label}</label>
<input className='px-2 py-1  border-red-500 rounded-md w-full focus:outline-none mb-4 text-lg' type={type} placeholder={placeholder} id={inputId}  value={val} onChange={(e)=>onChange(e.target.value)}/>
    </div>
  )
}

export default Input ;