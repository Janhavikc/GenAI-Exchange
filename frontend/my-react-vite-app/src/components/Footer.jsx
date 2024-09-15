import React from 'react'

function Footer() {
  return (
    <div className='flex gap-5 w-full h-screen bg-gray-100 {
    --tw-bg-opacity: 1;
    background-color: rgba(241, 241, 241, var(--tw-bg-opacity));
} text-black font-["Founders_Grotest_X-Condensed"] p-20'>
        <div className='w-1/2 h-full flex flex-col justify-between '>
        <div className='heading'>
        <h1 className='text-[8vh] uppercase '>our services </h1>
        <div className='dets font-["Neue_Montreal"] mt-10'>
            <a className='block  font-light' href="">Banner Image</a>
            <a className='block  font-light' href="">Video trailer</a>
            <a className='block  font-light' href="">Contents</a>


             </div>

        </div>
            <h2 className='sm:order-1 flex-none text-2xl font-semibold dark:text-white focus:outline-none focus:opacity-80' >Snapgen</h2>
        </div>
        <div className='w-1/2'>
        <h1 className='text-[8vh] uppercase'>
          links
          </h1>
          <div className='dets font-["Neue_Montreal"] mt-10'>
            <a className='block font-light' href="">Home</a>
            <a className='block font-light' href="">About Us</a>

             </div>
 
        </div>
    </div>
  )
}

export default Footer