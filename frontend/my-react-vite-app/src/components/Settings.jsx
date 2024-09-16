import * as React from 'react';
import Input from './Input';
import './Settings.css';

const Settings = ({canvas, currentObj}) =>{
    const [selectedObject, setSelectedObject] = React.useState(null);
    const [width, setWidth] = React.useState("");
    const [height, setHeight] = React.useState("");
    const [diameter, setDiameter] = React.useState("");
    const [color, setColor] = React.useState("");
    const [fontSize, setFontSize] = React.useState("");
    const [fontFamily, setFontFamily] = React.useState("");
   
    React.useEffect(()=>{
        if(canvas){
            canvas.on("selection:created", (event)=>{
                handleObjectSelection(event.selected[0])
            })
            canvas.on("selection:updated", (event)=>{
                handleObjectSelection(event.selected[0])
            })
            canvas.on("selection:cleared", (event)=>{
                setSelectedObject(null);
                currentObj(null);
                clearSettings();
            })

            canvas.on("object:modified", (event)=>{
                handleObjectSelection(event.target)
            })
            canvas.on("object:scaling", (event)=>{
                handleObjectSelection(event.target)
            })
            
        }
    }, [canvas]);

    const handleObjectSelection = (object)=>{
        if(!object) return;

        setSelectedObject(object);
        currentObj(object)
        if(object.type=="rect"){
            setWidth((Math.round(object.width * object.scaleX)));
            setHeight((Math.round(object.height * object.scaleY)));
            setColor(object.fill);
            setDiameter("");
        }else if(object.type=="circle"){
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill);
            setWidth("");
            setHeight("");
        }else if(object.type=="textbox"){
            setFontSize(object.fontSize);
            setColor(object.fill);
            setFontFamily(object.fontFamily);
        }
    }

    const clearSettings =()=>{
        setWidth("");
        setHeight("");
        setColor("");
        setDiameter("");
    }

    const handleWidthChnage = (e)=>{
        const value = e.target.value.replace(/,/g, "")
        const initValue = parseInt(value, 10);
        setWidth(initValue);

        if(selectedObject && selectedObject.type == "rect" && initValue>=0){
            selectedObject.set({width:initValue/selectedObject.scaleX});
            canvas.renderAll();
        }
    }
    const handleHeightChange = (e)=>{
        const value = e.target.value.replace(/,/g, "")
        const initValue = parseInt(value, 10);
        setHeight(initValue);

        if(selectedObject && selectedObject.type == "rect" && initValue>=0){
            selectedObject.set({height:initValue/selectedObject.scaleY});
            canvas.renderAll();
        }
    }
    const handleDiameterChange = (e)=>{
        const value = e.target.value.replace(/,/g, "")
        const initValue = parseInt(value, 10);
        setDiameter(initValue);

        if(selectedObject && selectedObject.type == "circle" && initValue>=0){
            selectedObject.set({radius:initValue/2 /selectedObject.scaleX});
            canvas.renderAll();
        }
    }
    const handleFontSizeChange = (e)=>{
        const value = e.target.value.replace(/,/g, "")
        const initValue = parseInt(value, 10);
        setFontSize(initValue);

        if(selectedObject && selectedObject.type == "textbox" && initValue>=0){
            selectedObject.set({fontSize:initValue});
            canvas.renderAll();
        }
    }
    const handleColorChange = (e)=>{
        const value = e.target.value
        
        setColor(value);

        if(selectedObject){
            selectedObject.set({fill:value});
            canvas.renderAll();
        }
    }
    const handleFontFamilyChange = (e)=>{
        const value = e.target.value
        
        setFontFamily(value);

        if(selectedObject && value){
            selectedObject.set({fontFamily:value});
            canvas.renderAll();
        }
    }

    return<>
        <div className='Settings  bg-zinc-900'>
            {selectedObject && selectedObject.type==='rect' &&<>
                <Input
                    label={"Width"}
                    value={width}
                    onChange={handleWidthChnage}
                />
                <Input
                    label={"Height"}
                    value={height}
                    onChange={handleHeightChange}
                />
                <label className="block text-sm text-white">
                Color
                </label>
                <input type="color" id="color" className="mb-2 bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" value={color} onChange={handleColorChange}/>
            </>}
            {selectedObject && selectedObject.type==='circle' &&<>
                <Input
                    label={"Diameter"}
                    value={diameter}
                    onChange={handleDiameterChange}
                />
                <label className="block text-sm text-white">
                Color
                </label>
                <input type="color" id="color" className="mb-2 bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" value={color} onChange={handleColorChange}/>
            </>}

            {selectedObject && selectedObject.type==='textbox' &&<>
                <label className="block text-sm text-white">
                Font Family
                </label>
                <select className="bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5" id="fontFamilySelect" value={fontFamily} onChange={handleFontFamilyChange}>
        <option value="Georgia,serif" style={{"fontFamily": "Georgia,serif"}}>Georgia</option>
        <option value="Palatino Linotype,Book Antiqua,Palatino,serif" style={{"fontFamily": "Palatino Linotype,Book Antiqua,Palatino,serif"}}>Palatino Linotype</option>
        <option value="Times New Roman,Times,serif"style={{"fontFamily": "Times New Roman,Times,serif"}}>Times New Roman</option>
        <option value="Arial,Helvetica,sans-serif" style={{"fontFamily": "Arial,Helvetica,sans-serif"}}>Arial</option>
        <option value="Arial Black,Gadget,sans-serif" style={{"fontFamily": "Arial Black,Gadget,sans-serif"}}>Arial Black</option>
        <option value="Comic Sans MS,cursive,sans-serif" style={{"fontFamily": "Comic Sans MS,cursive,sans-serif"}}>Comic Sans MS</option>
        <option value="Impact,Charcoal,sans-serif" style={{"fontFamily": "Impact,Charcoal,sans-serif"}}>Impact</option>
        <option value="Lucida Sans Unicode,Lucida Grande,sans-serif" style={{"fontFamily": "Lucida Sans Unicode,Lucida Grande,sans-serif"}}>Lucida Sans Unicode</option>
        <option value="Tahoma,Geneva,sans-serif" style={{"fontFamily": "Tahoma,Geneva,sans-serif"}}>Tahoma</option>
        <option value="Trebuchet MS,Helvetica,sans-serif" style={{"fontFamily": "Trebuchet MS,Helvetica,sans-serif"}}>Trebuchet MS</option>
        <option value="Verdana,Geneva,sans-serif" style={{"fontFamily": "Verdana,Geneva,sans-serif"}}>Verdana</option>
        <option value="Courier New,Courier,monospace" style={{"fontFamily": "Courier New,Courier,monospace"}}>Courier New</option>
        <option value="Lucida Console,Monaco,monospace" style={{"fontFamily": "Lucida Console,Monaco,monospace"}}>Lucida Console</option>
    </select>
                <Input
                    label={"Font Size"}
                    value={fontSize}
                    onChange={handleFontSizeChange}
                
                />
                
                <label className="block text-sm text-white">
                Color
                </label>
                <input type="color" id="color" className="mb-2 bg-zinc-900 border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" value={color} onChange={handleColorChange}/>
            </>}

        </div>
    
    </>;
};

export default Settings;