import React from 'react'
import logo from '../assets/Frame 3.svg'

function Footer() {
  return (
    <div className='flex gap-5 w-full h-full bg-zinc-900 font-["Founders_Grotest_X-Condensed"] p-10'>
        <div className='w-1/2 h-full flex flex-col justify-between '>
        <div className='heading'>
        <h1 className='text-[5vh] uppercase '>our services </h1>
        <div className='dets font-["Neue_Montreal"] mt-5'>
            <a className='block text-md font-light' href="/design">Banner Image</a>
            <a className='block text-md font-light' href="/design">Video trailer</a>
             </div>

        </div>
            <div className='flex mt-20'>
            <img src={logo} alt="logo" width={35} height={35}/>
              <div className='ml-2 mt-1' style={{fontFamily:'"Poppins", sans-serif'}}>
              Snapgen
              </div>
            </div>
            <div className='mt-1'>&copy; Copyright Snapgen 2024. All rights reserved.</div>
        </div>
        <div className='w-1/2'>
        <h1 className='text-[5vh] uppercase'>
          links
          </h1>
          <div className='dets font-["Neue_Montreal"] mt-5'>
            <a className='block text-mf font-light' href="/">Home</a>
            <a className='block text-mf font-light' href="/#aboutus">About Us</a>

             </div>

        </div>
    </div>
  )
}

export default Footer