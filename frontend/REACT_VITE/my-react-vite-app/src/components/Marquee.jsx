import React from 'react'
import { motion } from "framer-motion"

function Marquee() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full py-10 rounded-3xl bg-[#004b23]'>
         <div className='text border-t-2 border-b-2 border-zin-300 flex  overflow-hidden whitespace-nowrap ' >
            <motion.h1 initial={{x: "0"}} animate={{x: "-100%"}} transition={{repeat:Infinity, ease: "linear", duration:10}} className='text-[15vw] leading-none font["founders_Grotesk"] uppercase font-semibold pt-10 mb-[3vw] pr-20'>we are snapgen</motion.h1>
            <motion.h1 initial={{x: "0"}} animate={{x: "-100%"}} transition={{repeat:Infinity, ease: "linear", duration:10}} className='text-[15vw] leading-none font["founders_Grotesk"] uppercase font-semibold pt-10 mb-[3vw] pr-20'>we are snapgen</motion.h1>

            
         </div>
    </div>
  )
}

export default Marquee