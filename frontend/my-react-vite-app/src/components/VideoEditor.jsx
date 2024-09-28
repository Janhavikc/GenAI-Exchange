import * as React from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Spinner from './Spinner';

const VideoEditor = ({token}) =>{

    const [videoSrc, setVideoSrc] = React.useState('');
    const [imageFile, setImageFile] = React.useState([]);
    const [soundFile, setSoundFile] = React.useState({});
    const [productName, setProductName] = React.useState("");
    const [theme, setTheme] = React.useState("");
    const [frame, setFrame] = React.useState(1);
    const [loading, setLoading]= React.useState(false);
    const [audioMode, setAudioMode] = React.useState('no audio');
    
    
    const ffmpeg = createFFmpeg({
        log: true
        // corePath:'http://localhost:3000/src/components/ffmpeg-core.js'
    })

    React.useEffect(() => {
        // Enable cross-origin isolation for this page only
        document.head.appendChild(createMetaTag('Cross-Origin-Embedder-Policy', 'require-corp'));
        document.head.appendChild(createMetaTag('Cross-Origin-Opener-Policy', 'same-origin'));
    
        return () => {
          // Clean up headers when navigating away from the page
          removeMetaTag('Cross-Origin-Embedder-Policy');
          removeMetaTag('Cross-Origin-Opener-Policy');
        };
      }, []);
    
      const createMetaTag = (name, content) => {
        const meta = document.createElement('meta');
        meta.httpEquiv = name;
        meta.content = content;
        return meta;
      };
    
      const removeMetaTag = (name) => {
        const meta = document.querySelector(`meta[http-equiv="${name}"]`);
        if (meta) {
          document.head.removeChild(meta);
        }
      };

    const createVideo = async()=>{
        if(token && productName && theme && frame){
        try{
            // await load();
           
            setLoading(true);
            await ffmpeg.load();
            let urlsToFetch = [];
            for(let i=0; i<frame; i++){
                urlsToFetch.push(`http://${window.location.hostname}:5000/api/imagen`)
            }
           
            
            const fetchPromises = urlsToFetch.map(url => 
                fetch(url, {
                    method:'POST',
                    body:JSON.stringify({
                        search:productName,
                        theme:theme,
                        width:1440,
                        height:700
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.blob())
            );
            
            Promise.all(fetchPromises)
                .then(async(responses) => {
                    const responseData = responses.map(response => response);
                   
                    const url = responseData.map(i=>i);
                    setImageFile(url);
                    let concatFiles  = [];
                    for (let i = 0; i < url.length; i++) {
                        ffmpeg.FS('writeFile',`image${i}.png`, await fetchFile(url[i]));
                        concatFiles.push(`image${i}.png`);
                    }
        
                    // ffmpeg.FS('writeFile',"imageList.txt", new TextEncoder().encode(imageList));
        
        
                    ffmpeg.FS('writeFile','sound.mp3', await fetchFile(soundFile));
                    
                         

                    await ffmpeg.run('-framerate', '0.5', "-i", 'image%d.png' , "-i", "sound.mp3", "-c:v", "libx264", "-t", "10", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "snapgen.mp4");
                    const data = await ffmpeg.FS('readFile','snapgen.mp4')
                    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], {type:'video/mp4'})))
                    
                })
                .catch(error => console.error('Error fetching data:', error))
                .finally(()=> setLoading(false))
        


                 // Write images to FFmpeg virtual file system

           
           
            }catch(e){
                console.error(e);
            }
        }
    }
    
    const handleChangeSound = (e) =>{
        const file = e.target.files[0];
        setSoundFile(file);
    }

    return<><div className='flex' style={{justifyContent:'space-between'}}>

    <div className="mb-5">
      <label for="product-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
      <input onChange={(e)=>setProductName(e.target.value)} type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
    </div>
    <div className="mb-5">
      <label for="Theme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Theme</label>
      <input onChange={(e)=>setTheme(e.target.value)} type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">eg. Diwali, Independence day</p>  
    </div>
    <div className="mb-5">
    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select number of frames</label>
  <select defaultValue={1} id="countries" onChange={(e)=>setFrame(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
    </select>
    </div>
    
    
    </div>
    <div className='mb-5 flex'>
        <div className="flex items-center me-4">
            <input defaultChecked={true} onChange={(e)=>{setAudioMode(e.target.value); setSoundFile({});}} id="inline-radio" type="radio" value="no audio" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
            <label for="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No audio</label>
        </div>
        <div className="flex items-center me-4">
            <input id="inline-2-radio" type="radio" onChange={(e)=>setAudioMode(e.target.value)} value="upload audio" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
            <label for="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload audio</label>
        </div>
    </div>
    {audioMode=='upload audio' && <div className='block mb-5'>
    {/* <label className="block mb-2 text-sm font-medium text-gray-900" for="file_input">Choose file</label> */}
    <input onChange={handleChangeSound} className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="sound" type="file" accept="audio/*"/>
    </div>}
    <button disabled={loading} onClick={createVideo} className='py-2 px-3 items-center gap-x-2 text-sm font-medium rounded-lg border border-[#9ef01a] bg-[#9ef01a] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'>Generate Video</button>
    <div className='m-5'></div>
    {loading && <div style={{position:'relative'}}><Spinner/></div>}
    {!loading && videoSrc &&<video src={videoSrc} width={'1440'} height={'700'} controls></video>}
    </>;
}

export default VideoEditor;