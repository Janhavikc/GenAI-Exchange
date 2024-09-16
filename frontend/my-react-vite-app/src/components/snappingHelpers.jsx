import { Line } from "fabric";

const snappingDistance = 10;

export const handleObjectMoving = (canvas, obj, guidlines, setGuidelines)=>{
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const left = obj.left;
    const top = obj.top;
    const right = left + obj.width * obj.scaleX;
    const bottom = top + obj.height * obj.scaleY;

    const centerX = left + (obj.width * obj.scaleX)/2;
    const centerY = top + (obj.height * obj.scaleY)/2;

    let newGuidelines = [];
    clearGuidlines(canvas);

    let snapped = false;

    if(Math.abs(left)<snappingDistance){
        obj.set({left:0});
        if(!guidlineExists(canvas, "vertical-left")){
            const line = createVerticalGuideline(canvas, 0, "vertical-left");
            newGuidelines.push(line)
            canvas.add(line)
        }
        snapped = true;
    }
    if(Math.abs(top)<snappingDistance){
        obj.set({top:0});
        if(!guidlineExists(canvas, "horizontal-top")){
            const line = createVerticalGuideline(canvas, 0, "horizontal-top");
            newGuidelines.push(line)
            canvas.add(line)
        }
        snapped = true;
    }
    if(Math.abs(right-canvasWidth)<snappingDistance){
        obj.set({left:canvasWidth - obj.width * obj.scaleX});
        if(!guidlineExists(canvas, "vertical-right")){
            const line = createVerticalGuideline(canvas, canvasWidth, "vertical-right");
            newGuidelines.push(line)
            canvas.add(line)
        }
        snapped = true;
    }
    if(Math.abs(bottom - canvasHeight)<snappingDistance){
        obj.set({top: canvasHeight - obj.height * obj.scaleY});
        if(!guidlineExists(canvas, "horizontal-bottom")){
            const line = createVerticalGuideline(canvas, canvasHeight, "horizontal-bottom");
            newGuidelines.push(line)
            canvas.add(line)
        }
        snapped = true;
    }

    if(!snapped){
        clearGuidlines(canvas);
    }else{
        setGuidelines(newGuidelines);
    }

    canvas.renderAll();
}    

export const createVerticalGuideline= (canvas, x, id) =>{
    return new Line([x, 0, x, canvas.height], {
        id,
        stroke:'red',
        strokeWidth:1,
        selectable:false,
        evented:false,
        strokeDashArray:[5,5],
        opacity:0.8
    })
} 
export const createHorizontalGuideline= (canvas, y, id) =>{
    return new Line([0, y, canvas.width, y], {
        id,
        stroke:'red',
        strokeWidth:1,
        selectable:false,
        evented:false,
        strokeDashArray:[5,5],
        opacity:0.8
    })
}

export const clearGuidlines = (canvas) =>{
    const objects = canvas.getObjects("line")
    objects.forEach(obj => {
        if(
            (obj.id && obj.id.startsWith("vertical-")) ||
            obj.id.startsWith("horizontal-")
        ){
            canvas.remove(obj);
        }
    });
    canvas.renderAll();
}

const guidlineExists = (canvas, id) =>{
    const objects = canvas.getObjects("line");
    return objects.some((obj)=>obj.id == id);
}