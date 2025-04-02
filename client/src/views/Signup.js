import React,{useState} from 'react'
import Input from '../components/Input.js'
import Button from '../components/Button.js'

function Signup() {

  const [signupData ,setSignupData] =useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    password:"",
    rePassword:"",

  })
  return (
  <div className='bg-zinc-100 min-h-scrren flex flex-col items-center justify-center'> 
    
    <h1> Signup</h1>
     <div className='w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6'>

     <Input
   label={"Name"}
   val={signupData.name}
   onChange={(val)=>setSignupData({...signupData,name: val})}/>
  
  <Input
   label={"Email"}
   val={signupData.name}
   onChange={(val)=>setSignupData({...signupData,name: val})}/>

<Input
   label={"Phone"}
   val={signupData.name}
   onChange={(val)=>setSignupData({...signupData,name: val})}/>

<Input
   label={"Address"}
   val={signupData.name}
   onChange={(val)=>setSignupData({...signupData,name: val})}/>

<Input
   label={"Password"}
   val={signupData.name}
   onChange={(val)=>setSignupData({...signupData,name: val})}/>

<Input
   label={"Re-enter Password"}
   val={signupData.name}
   onChange={(val)=>setSignupData({...signupData,name: val})}/>
     </div>

     <div>
      <Button
      label="Signup" 
      onClick={()=> console.log(signupData)}
      variant={"success"}
      />
      <Button
      label="Signup" 
      onClick={()=> console.log(signupData)}
      variant={"danger"}
      />
     </div>
  </div>
  )
}

export default Signup