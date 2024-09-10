import React from 'react'

import {FaArrowUpLong} from "react-icons/fa6";
function LandingPage() {
  return (
    <div className='w-full h-screen bg-zinc-900 pt-1'>
      <div className='textstructure mt-60 px-20'>
        {["Generate high quality","image banners and","video trailers with ai"].map((item,index)=>{
          return <div className='masker' >
            <div className='w-fit flex item-center'>
              {index === 1 && (<div className='w-[7vw] h-[5vw] -top-[2.2vw] rounded-md bg-[#004b23] mr-3'></div>)}
          <h1 className="uppercase text-7xl leading-[5vw] tracking-tighter font-['founders_Grotesk'] font-medium">
            {item}
          </h1>
        </div>
        </div>
          })}
        
        
        <div className="border-t-[1px] border-zinc-800 mt-20 flex justify-between item-center py-5 px-20">
          {["for public and private companies","Easy to use"].map((item,index)=>(<p className='text-md font-light tracking-tight leading-none'>{item}</p>))}
          <div className='start flex items-center gap-2'>
        <div className='px-5 py-2 border-[1px] border-zin-300 fount-light text-sm uppercase rounded-full'>Get started</div>
        <div className=' px-5 py-2 w-10 h-10 flex items-center justify-center border-[1px] border-zin-300 rounded-full'>
          <span className='rotate-[45deg]'>
          <FaArrowUpLong/>
        </span>
        
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage