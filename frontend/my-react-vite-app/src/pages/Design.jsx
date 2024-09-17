import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { PiImagesThin } from "react-icons/pi";
import { CiVideoOn } from "react-icons/ci";
import { SiContentstack } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import dummyImage from '../assets/unsplash.jpg';
import empty from '../assets/empty.svg';

const Design = () =>{
    const {getAccessTokenSilently} = useAuth0();
    const [userToken, setUserToken] = React.useState('');
    const [currentTab, setCurrentTab] = React.useState('Image banner');
    const navigate = useNavigate();

    React.useEffect(()=>{
        const getToken=async()=>{
            const token = await getAccessTokenSilently({
                authorizationParams:{
                    audience:'https://dev-zhqru81kwfzddklq.jp.auth0.com/api/v2/'
                }
            });
            setUserToken(token);
            return token;
        }
        getToken();
    }, [])
    
    
    return<div className='bg-white' style={{height:'100vh'}}>
    {/* Side bar */}
    <aside id="default-sidebar" className="static top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-900">
    <h1 className='py-5'>Workspace</h1>
      <ul className="space-y-2 py-5 font-medium border-t border-gray-200">
         <li>
            <button onClick={()=>setCurrentTab('Image banner')} className={`flex  items-center p-2 text-white rounded-lg hover:bg-[#004b23] group ${currentTab=='Image banner'? 'bg-[#004b23]':''}`}>
               <PiImagesThin size={30} color='white'/>
               <span className="ms-3">Design Image banner</span>
            </button>
         </li>
         <li>
           <button onClick={()=>setCurrentTab('Video trailer')}  className={`flex items-center p-2 text-white rounded-lg hover:bg-[#004b23] group ${currentTab=='Video trailer'? 'bg-[#004b23]':''}`}>
               <CiVideoOn size={30} color='white'/>
               <span className="ms-3">Generate Video Trailer</span>
            </button>
         </li>
         <li>
            <button onClick={()=>setCurrentTab('Contents')}  className={`flex items-center p-2 text-white rounded-lg hover:bg-[#004b23] ${currentTab=='Contents'? 'bg-[#004b23]':''} group`}>
               <SiContentstack size={30} color='white'/>
               <span className="ms-3">Generate Promotional Contents</span>
            </button>
         </li>
        
        
      </ul>
   </div>
</aside>
    {currentTab=="Image banner" && <div className="absolute p-4 sm:ml-64" style={{width:'75%', top:'15%'}}>
        <div className='px-3'>
        <h1 className='text-2xl text-black'>Design High quality image banner with AI</h1>
        <hr className='m-2'/>
        <div className='m-5'>
            <div>
            <button onClick={()=>navigate('/design/image-banner')} style={{float:'right'}} className='text-base font-medium bg-[#9ef01a] mb-5 rounded-lg border border-[#9ef01a] p-3 text-zinc-900'>Create banner</button>
            </div>
            <div>
            <div className='flex justify-center' style={{clear:'both'}}>
                <img src={empty} width={'250px'} height={'250px'}></img>
                
            </div>
            <p className='text-black flex justify-center'>Your design is empty. Please start a new design</p>
            </div>

            {/* <div className="grid grid-cols-3 gap-4 mb-4" style={{clear:'both'}}>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" style={{height:'max-content'}}>
            
                <Link to="/design/image-banner" className='rounded-xl w-full' style={{display: "block", overflow:"hidden", height:'max-content'}}>
                    <img src={dummyImage} alt="img" style={{objectFit: 'cover'}}/>
                </Link>
                
            </div>    
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" style={{height:'max-content'}}>
            
                <Link to="/design/image-banner" className='rounded-xl w-full' style={{display: "block", overflow:"hidden", height:'max-content'}}>
                    <img src={dummyImage} alt="img" style={{objectFit: 'cover'}}/>
                </Link>
                
            </div>    
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" style={{height:'max-content'}}>
            
                <Link to="/design/image-banner" className='rounded-xl w-full' style={{display: "block", overflow:"hidden", height:'max-content'}}>
                    <img src={dummyImage} alt="img" style={{objectFit: 'cover'}}/>
                </Link>
                
            </div>    
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800" style={{height:'max-content'}}>
            
                <Link to="/design/image-banner" className='rounded-xl w-full' style={{display: "block", overflow:"hidden", height:'max-content'}}>
                    <img src={dummyImage} alt="img" style={{objectFit: 'cover'}}/>
                </Link>
                
            </div>    
            </div>     */}
        </div>
        </div>
    </div>}
    {currentTab=="Video trailer" && <div>Video trailer</div>}
    {currentTab=="Contents" && <div>Contents</div>}
    </div>;
}

export default Design;