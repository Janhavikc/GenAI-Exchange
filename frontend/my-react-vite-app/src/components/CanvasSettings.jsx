import * as React from 'react';
import './Settings.css'

const CanvasSettings=({canvas})=>{
    const [canvasHeight, setCanvasHeight] = React.useState(500);
    const [canvasWidth, setCanvasWidth] = React.useState(500);

    React.useEffect(()=>{
        if(canvas){
            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);
            canvas.renderAll()

        }
    }, [canvasHeight, canvasWidth, canvas]);

    const handleWidthChange=(e)=>{
        const value = e.target.value.replace(/,/g, "")
        const initValue = parseInt(value, 10);
        if(initValue>=0){
            setCanvasWidth(initValue);
        }
    }
    const handleHeightChange=(e)=>{
        const value = e.target.value.replace(/,/g, "")
        const initValue = parseInt(value, 10);
        if(initValue>=0){
            setCanvasHeight(initValue);
        }
    }
    const downloadCanvas=()=>{
        console.log(canvas)
         const URL = canvas.toDataURL('png');
         var link = document.createElement("a");
        link.download = 'snapgen.png';
        link.href = URL;
        link.click();

    }
    return<>
        <div className='CanvasSettings bg-zinc-900'>
            
                <label className="block text-sm text-white">
                Canvas Width
                </label>
                <input type="text" id="width" className="mb-2 bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={canvasWidth} onChange={handleWidthChange}/>
                <label className="block text-sm text-white">
                Canvas Height
                </label>
                <input type="text" id="height" className="mb-2 bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={canvasHeight} onChange={handleHeightChange}/>
                <button onClick={downloadCanvas} className='py-2 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-[#9ef01a] bg-[#9ef01a] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'>Export as PNG</button>
        </div>
    
    </>;
}

export default CanvasSettings;