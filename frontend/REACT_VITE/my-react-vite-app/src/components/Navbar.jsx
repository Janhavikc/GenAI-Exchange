import React from 'react'
 import logo from '../assets/Snapgen-logo.svg'

function Navbar() {
  return (
    <div className='fixed z-[999] w-full px-20 py-8 font-["Neue Montreal"] flex justify-between items-center'>
     <div className='logo'>
      <p>Snapgen</p>
       </div>
        <div className='links flex gap-10'>
            {["Home","Generate","About Us","login","Sign up",].map((item,index)=>(<a key={index} className={`text-lg capitalize font-light ${index == 3 && "ml-80"}`}>{item}</a>
        ))}
        </div>
    </div>
  )
}

export default Navbar