import React from 'react'
import Gemini from '../assets/Google Ai Gemini (1).svg'
import Image from '../assets/Group 10.svg'
import Vids from '../assets/Google Vids 1.svg'
import { motion } from "framer-motion";

function cards() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full h-screen bg-white flex items-center px-32 gap-5'>
       
        <div className='cardcontainer h-[50vh] w-1/2'>
        <div className='card relative rounded-xl w-full h-full bg-white flex items-center justify-center'>
            <img className='w-full h-full' src={Gemini}  alt="Gemini logo" />

        </div>
        </div>
        
        <div className='cardcontainer flex gap-5 w-1/2 h-[50vh]'>
        <div className='card relative rounded-xl w-full h-full bg-white flex items-center justify-center'>
        <img src={Image} alt="vertex AI"  className='w-full h-full'/>
        

        </div>

        </div>
    </div>
  )
}

export default cards