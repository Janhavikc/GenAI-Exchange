import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {useLocation, Link} from 'react-router-dom';

function Navbar() {
  const { loginWithRedirect, isAuthenticated, user, logout} = useAuth0();
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  const [profileInfo, setProfileInfo] = useState(false);
  const [openMenuBar, setOpenMenuBar] = useState(false);

  useEffect(() => {
    setUrl(location.hash!==''?location.hash:location.pathname);
  }, [location]);
  
  const getNameInitials = (name)=>{
    const spiltName = name.split(" ");
    if(spiltName && spiltName.length==2){
      return spiltName[0].charAt(0).toUpperCase() + spiltName[1].charAt(0).toUpperCase();
    }
    else if( spiltName && spiltName.length==1){
      return spiltName[0].charAt(0).toUpperCase();
    }
    return name;
  }

  
  return (<>
    <header className="fixed flex flex-wrap sm:justify-start bg-zinc-900 sm:flex-nowrap w-full text-sm py-3 z-50">
  <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
    
  <div className="relative inset-y-0 left-0 flex items-center sm:hidden mr-3">
        
    <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white m-5" aria-controls="mobile-menu" aria-expanded="false"
     onClick={()=>setOpenMenuBar(!openMenuBar)}>
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>
               
         <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
           <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
         </svg>
                
         <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
    </button>
  </div>
    
    
    <a className="sm:order-1 flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80" href="#">Snapgen</a>
    
    <div className="sm:order-3 flex items-center gap-x-2">
      
      {isAuthenticated?<>
      <button className='border-none bg-none' onClick={()=>setProfileInfo(!profileInfo)}>  
      <div className="font-bold text-gray-700 rounded-full bg-[#9ef01a] flex items-center justify-center font-mono" style={{height: '40px', width: '40px', 'fontSize': '20px'}}>{getNameInitials(user?.name)}</div>
      </button>  
      </>:
      <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[#9ef01a] bg-[#9ef01a] text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
       onClick={()=>loginWithRedirect()}>
        Login
      </button>}
    </div>
    <div id="hs-navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2" aria-labelledby="hs-navbar-alignment-collapse">
      <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
      <Link to="/" className={`px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${url=='/'?'border-b-4 border-[#9ef01a]':''}`}>Home</Link>
      <Link to="/design" className={`px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${url?.includes('design')?'border-b-4 border-[#9ef01a]':''}`}>Design</Link>          
      <Link to="/#aboutus" className={`px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${url?.includes('#aboutus')?'border-b-4 border-[#9ef01a]':''}`}>About us</Link>
      </div>
    </div>
    {profileInfo &&<div className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-zinc-00 text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" style={{marginTop:'10%', marginRight: '20px'}}>
           
    <div className="block px-4 py-2 text-sm text-[#9ef01a]" role="menuitem" tabindex="-1" id="user-menu-item-0">{user?.name}</div>
    <hr className='border-white'/>
    <button className="block px-4 py-2 text-sm text-white" role="menuitem" tabindex="-1" id="user-menu-item-1" onClick={()=>logout()}>
      Sign out</button>
    
  </div>}
  
  </nav>
</header>
 {openMenuBar &&<div className="sm:hidden" id="mobile-menu" style={{paddingTop:'17%'}}>
 <div className="space-y-1 px-2 pb-3 pt-2">
   <Link to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current={url=='/'?"page":''}>Home</Link>
    <Link to="/design" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" aria-current={url?.includes('design')?"page":''}>Design</Link>
     <Link to="/#aboutus" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" aria-current={url?.includes('aboutus')?"page":''}>About us</Link>
    
  </div>
</div>}
</>
  //   <nav className="bg-zinc-900">
  // <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  //   <div className="relative flex h-16 items-center justify-between">
  //     <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
  //       <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
  //         <span className="absolute -inset-0.5"></span>
  //         <span className="sr-only">Open main menu</span>
         
  //         <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  //         </svg>
          
  //         <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
  //           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  //         </svg>
  //       </button>
  //     </div>
  //     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
  //       <div className="flex flex-shrink-0 items-center">
  //         <h1>Snapgen</h1>
  //       </div>
  //       <div className="hidden sm:ml-6 sm:block">
  //         <div className="flex items-center space-x-4">
           
  //           <Link to="/" className={`px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${url=='/'?'border-b-4 border-[#9ef01a]':''}`}>Home</Link>
  //           <Link to="/design" className={`px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${url?.includes('design')?'border-b-4 border-[#9ef01a]':''}`}>Generate</Link>
  //           <Link to="#aboutus" className={`px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${url?.includes('#aboutus')?'border-b-4 border-[#9ef01a]':''}`}>About us</Link>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
       

  //       <div className="relative ml-3">
  //         <div>
  //           <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
  //             <span className="absolute -inset-1.5"></span>
  //             <span className="sr-only">Open user menu</span>
  //             {user?.name}
  //           </button>
  //         </div>

         
  //         <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
           
  //           <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
  //           <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
  //           <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  // <div className="sm:hidden" id="mobile-menu">
  //   <div className="space-y-1 px-2 pb-3 pt-2">
  //     <Link to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</Link>
  //     <Link to="/design" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Generate</Link>
  //     <Link to="#aboutus" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About us</Link>
      
  //   </div>
  // </div>
  // </nav>
  )
}

export default Navbar