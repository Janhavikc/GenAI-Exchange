import React from 'react'
import Gemini from '../assets/Google Ai Gemini (1).svg'
import Image from '../assets/Group 10.svg'
import Vids from '../assets/Google Vids 1.svg'

function cards() {
  return (
    <div className='w-full h-screen bg-gray-100 {
    --tw-bg-opacity: 1;
    background-color: rgba(241, 241, 241, var(--tw-bg-opacity));
} flex items-center px-32 gap-5'>
        <div className='cardcontainer h-{50vh] w-1/2'>
        <div className='card relative rounded-xl w-full h-full bg-[#004D43] flex items-center justify-center'>
            <img className='w-32 h-96' src={Gemini}  alt="Gemini logo" />
            <button className='absolute left-10 bottom-10'>&copy;2024</button>

        </div>
        </div>
        <div className='cardcontainer flex gap-5 w-1/2 h-[50vh]'>
        <div className='card relative rounded-xl w-1/2 h-full bg-zinc-900 flex items-center justify-center'>
        <img src={Image} alt="vertex AI" />
        <button className='absolute left-10 bottom-10'>&copy;2023-2024</button>

        </div>
        <div className='card relative rounded-xl w-1/2 h-full bg-zinc-900 flex items-center justify-center'>
           <img src={Vids} alt="Google VIDS" />
           <button className='absolute left-10 bottom-10 '>&copy;2022-2024</button>

        </div>

        </div>
    </div>
  )
}

export default cards
