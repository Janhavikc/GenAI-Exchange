import React from 'react'
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom';

function LandingPage() {
    motion
  const navigate = useNavigate();
  const routeToDesign=()=>{
    navigate('/design');
  }
  return (

             <div  data-scroll data-scroll-section data-scroll-speed="-.3" className='w-full h-screen bg-zinc-900 pt-1'>
            <div className='flex textstructure mt-40 px-10'>
              <div>
              {["Generate high quality","image banners and","video trailers with ai"].map((item,index)=>{
                
                return <div key={index} className='masker' >
                  
                      
                  <div className='w-fit flex item-center'>
                    {index === 1 && (
                      <motion.div initial={{width:0}} animate={{width:"7vw"}} transition={{ease: [0.76, 0, 0.24, 1], duration:1}} className='w-[7vw] h-[5vw] -top-[2.2vw] rounded-md bg-[#004b23] mr-3'></motion.div>)}
                <h1 className="uppercase text-7xl leading-[5vw] tracking-tighter font-['founders_Grotesk'] font-medium">
                  {item}
                </h1>
              </div>
                  </div>
                  
                  
              
                    })}
               <div className="border-t-[1px] border-zinc-800 mt-5 flex justify-between item-center py-5 px-0">
                
                <div className='start flex items-center gap-2'>
                <button className='px-5 py-2 border-[1px] w-40 h-15 border-zin-300 fount-light text-sm uppercase rounded-full' onClick={routeToDesign}>Get started</button>
              
                </div>
            </div>
              </div>
        
             
      </div>
    </div>
    
     

  )
}

export default LandingPage