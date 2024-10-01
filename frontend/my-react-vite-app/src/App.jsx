import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Design from './pages/Design';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';
import ImageEdit from './pages/ImageEdit';
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const locomotiveScroll = new LocomotiveScroll();
  const {isLoading} = useAuth0();
  const aboutUsRef = React.useRef(null);
  
  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white'>
        {isLoading ?<>
          <Spinner/>
        </>:<>
        <Navbar aboutUsRef={aboutUsRef}/>
        <Routes>
          <Route path='/design/image-banner' element={<PrivateRoute component={ImageEdit}/>}/>
          <Route path='/design' element={<PrivateRoute component={Design}/>} exact/>
          <Route path='/' element={<Home aboutUsRef={aboutUsRef}/>} exact/>

          
        </Routes>
        <Footer/>
        </>}
      
    </div>
  )
}

export default App