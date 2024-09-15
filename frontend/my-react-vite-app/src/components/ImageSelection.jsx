import * as React from 'react';
import Input from './Input';
import dummyImage from '../assets/unsplash.jpg'

const ImageSelection = ({setImage}) =>{
    const [productName, setProductName] = React.useState("");
    const [discount, setDiscount] = React.useState("");
    const [theme, setTheme] = React.useState("");

    return<>
        <div className='ImageSelection bg-zinc-900' style={{width:'13rem'}}>
            <h5>Images Preview</h5>
            <hr/>
            <div className='m-2 text-left'>
                <Input label={'Product name'} value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                <Input label={'Discount (optional)'} value={discount} onChange={(e)=>setDiscount(e.target.value)}/>
                <Input label={'Theme (optional)'} value={theme} onChange={(e)=>setTheme(e.target.value)}/>
                <div className='text-sm text-zinc-200' style={{fontSize:'8px', fontStyle:'italic'}}>Eg., Diwali, Independence Day..etc</div>
            </div>
            <button className='py-2 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-[#9ef01a] bg-[#9ef01a] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'>Search</button>
            <div className='flex justify-around mt-5 flex-wrap'>
                
                <img className='mb-5' id={'select-image-1'} onClick={()=>setImage('select-image-1')} src={dummyImage} width={75} height={75}/>
                
                <img className='mb-5' id={'select-image-2'} onClick={()=>setImage('select-image-2')} src={dummyImage} width={75} height={75}/>
               
                <img className='mb-5' id={'select-image-3'} onClick={()=>setImage('select-image-3')} src={dummyImage} width={75} height={75}/>
                
                <img className='mb-5' id={'select-image-4'} onClick={()=>setImage('select-image-4')} src={dummyImage} width={75} height={75}/>
                
                
            </div>
        </div>
    </>
};

export default ImageSelection;