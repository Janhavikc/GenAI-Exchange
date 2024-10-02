import React from 'react'

function About({aboutUsRef}) {
  return (
    <div ref={aboutUsRef} className='w-full p-20 bg-[#9ef01a] rounded-tl-3xl rounded-tr-3xl text-black'>
      <h1 className='font-["Neue_Montreal"] text-[4vw] leading-[4.5vw] tracking-tight'>
        Snapgen generates high quality of images and videos quickly using Google's Imagen AI. Try out Snapgen today for free, easy to use even for non-designers! 
      </h1>
      {/* <div className='w-full flex gap-5 border-t-[1px] pt-10 mt-20 border-[#a1b562]'>

        <div className='w-[90vh] h-[70vh] rounded-3xl bg-[#CDEA68] flex'>
          <img src="" alt="" />
        </div>
        <div className='w-[90vh] h-[70vh] rounded-3xl bg-[#CDEA68] flex'>
          <img src="" alt="" />
        </div>
      </div> */}
    </div>
    
    
  )
}

export default About 