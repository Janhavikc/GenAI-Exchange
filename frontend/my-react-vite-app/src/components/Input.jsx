import * as React from 'react';

const Input = ({label, onChange, value}) =>{
    return <>
        <label className="block text-sm text-white">
            {label}
        </label>
        <input type="text" id="width" className="mb-2 bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={value} onChange={onChange}/>
                
    
    </>
}

export default Input;