import * as React from 'react';
import {Canvas, Rect, Circle, Textbox, Image} from 'fabric';
import { FaRegSquare, FaRegCircle } from "react-icons/fa6";
import './ImageEdit.css';
import Settings from '../components/Settings.jsx';
import CanvasSettings from '../components/CanvasSettings.jsx';
import { TfiText } from "react-icons/tfi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoImage } from "react-icons/go";
import ImageSelection from '../components/ImageSelection.jsx';
import {useSearchParams} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const ImageEdit = ()=>{
    const canvasRef = React.useRef(null);
    const {getAccessTokenSilently} = useAuth0();
    const [canvas, setCanvas] = React.useState(null);
    const [guidlines, setGuidelines] = React.useState([]);
    const [selectedObject, setSelectedObject] = React.useState(null);
    const [imageSelected, setImageSelected] = React.useState(false);
    const [image, setImage] = React.useState("");
    const [token, setToken] = React.useState("");
    const [searchParams] = useSearchParams();
    const canvas_id = searchParams.get('q');
    const initCanvas = React.useRef(null);
    

    React.useEffect(()=>{
        const getToken=async()=>{
            const token = await getAccessTokenSilently();
            setToken(token);
            
            return token;
        }

       getToken()
    }, []);

    const loadCanvasFromDB = async() =>{
        
        try{
            const res = await fetch(`https://${window.location.hostname}/api/get-one-banner?canvas_id=${canvas_id}`,{
            method:'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }});
            const data = await res.json();
            if(data?.canvas){

                initCanvas.current.clear();
                initCanvas.current.loadFromJSON(JSON.stringify(data.canvas), ()=>{
                    initCanvas.current.renderAll()
                });
                setCanvas(initCanvas.current);

                setTimeout(()=>initCanvas.current.renderAll(), 1)
                
            }
        }catch(e){
            console.error(e);
        } 
    }

    React.useEffect(()=>{
        if(canvasRef.current && token){
           initCanvas.current = new Canvas(canvasRef.current, {
                width:500,
                height:500,
                preserveObjectStacking:true
            });

            initCanvas.current.backgroundColor = '#fff';
            initCanvas.current.renderAll();

            setCanvas(initCanvas.current);
    
            loadCanvasFromDB()
        
            const updateCanvas= async()=>{
                if(token){
                    initCanvas.current.backgroundColor = '#fff';
                    try{
                        await fetch(`https://${window.location.hostname}/api/update-image-banner`,{
                            method:'PUT',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify({
                                canvas_id,
                                canvas:initCanvas.current,
                                imageData: initCanvas.current.toDataURL('png')
                            })
                        });
        
                    }catch(e){
                        console.error(e);
                    }
                }
            };
           
            initCanvas.current.on('object:added', updateCanvas);
            initCanvas.current.on('object:modified', updateCanvas);
            initCanvas.current.on('object:removed', updateCanvas);

        
            // initCanvas.on("object:moving", (event)=>{
            //     handleObjectMoving(initCanvas, event.target, guidlines, setGuidelines)
            // })
            // initCanvas.on("object:modified", ()=>{
            //     clearGuidlines(initCanvas, guidlines, setGuidelines)
            // })

            return()=>{

                initCanvas.current.off('object:added', updateCanvas);
            initCanvas.current.off('object:modified', updateCanvas);
            initCanvas.current.off('object:removed', updateCanvas);
                
                initCanvas.current.dispose();
            }
        }
    }, [token])


    const addRectangle =()=>{
        setImageSelected(false);
        if(canvas){
            const rect = new Rect({
                top:100,
                left:50,
                width:100,
                height:60,
                fill: '#D84D42'
            });

            canvas.add(rect);
        }
    }
    const addText =()=>{
        setImageSelected(false);
        if(canvas){
            const text = new Textbox('Text', {
                top:100,
                left:50,
                fill: '#000',
            });

            canvas.add(text);
        }
    }
    const addCircle =()=>{
        setImageSelected(false);
        if(canvas){
            const circle = new Circle({
                top:100,
                left:100,
                radius:50,
                fill: '#2F4DC6'
            });

            canvas.add(circle);
        }
    }

     // Initiating the deleteHandler function
     var deletePolygonHandler = function() {
        setImageSelected(false);
        if(selectedObject){
            var obj = selectedObject;
            canvas.remove(obj);
            canvas.renderAll();
        }
       
    };

    const imageEdit = () =>{
        setImageSelected(true);
    }

    React.useEffect(()=>{
        if(image){
            const imageElement = document.getElementById(image);
            const imageFabric = new Image(imageElement, {
                
            })
            canvas.add(imageFabric);
            canvas.renderAll();
            setImage('');
        }
    }, [image])
    
    

    return <div className='ImageEdit bg-zinc-400'>
        <div className='bg-zinc-900 Toolbar'>
            <p>Layers</p>
            <hr className='border-white'/>
            <button onClick={imageEdit} className='border-none bg-none mb-2 flex justify-center'>
             <GoImage/>
            </button>
            <button onClick={addText} className='border-none bg-none mb-2 flex justify-center'>
             <TfiText/>
            </button>
            <button onClick={addRectangle} className='border-none bg-none mb-2 flex justify-center'>
             <FaRegSquare/>
            </button>
            <button onClick={addCircle} className='border-none bg-none flex justify-center mb-2 '>
             <FaRegCircle/>
            </button>
            <button onClick={deletePolygonHandler} className='border-none bg-none flex justify-center'>
             <RiDeleteBinLine/>
            </button>
            {imageSelected && <ImageSelection setImage={setImage} canvas={canvas}/>}
            
        </div>
        
        <canvas id='canvas' ref={canvasRef}></canvas>
        <Settings canvas={canvas} currentObj={setSelectedObject}/>
        <CanvasSettings canvas={canvas}/>
    </div>
};

export default ImageEdit;