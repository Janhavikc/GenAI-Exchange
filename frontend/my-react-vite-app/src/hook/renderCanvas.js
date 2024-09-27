import * as React from 'react';

const renderCanvas = (canvas)=>{
    React.useEffect(()=>{
        if(canvas){
            canvas.on('after:render', ()=>{
                canvas.renderAll();
            })
        }
    }, [canvas]);
}

export default renderCanvas;