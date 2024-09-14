import React from 'react'

function Footer() {
  return (
    <div className='flex gap-5 w-full h-screen bg-zinc-900 font-["Founders_Grotest_X-Condensed"] p-20'>
        <div className='w-1/2 h-full flex flex-col justify-between '>
        <div className='heading'>
        <h1 className='text-[10vh] uppercase '>our services </h1>
        <div className='dets font-["Neue_Montreal"] mt-10'>
            <a className='block text-xl font-light' href="">Banner Image</a>
            <a className='block text-xl font-light' href="">Video trailer</a>
            <a className='block text-xl font-light' href="">Contents</a>


             </div>

        </div>
            <h2>Snapgen</h2>
        </div>
        <div className='w-1/2'>
        <h1 className='text-[10vh] uppercase'>
          links
          </h1>
          <div className='dets font-["Neue_Montreal"] mt-10'>
            <a className='block text-xl font-light' href="">Home</a>
            <a className='block text-xl font-light' href="">About Us</a>

             </div>

        </div>
    </div>
  )
}

export default Footer