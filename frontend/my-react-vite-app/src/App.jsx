import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import LocomotiveScroll from 'locomotive-scroll';
import Home from './pages/Home';
import Design from './pages/Design';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const {isLoading, isAuthenticated} = useAuth0();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoading && isAuthenticated){
      navigate('/design');
    }
    
  }, [isAuthenticated, isLoading])

  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white' style={{padding:'0px 20px'}}>
        {isLoading ?<>
          <Spinner/>
        </>:<>
        <Navbar/>
        <Routes>
          
          <Route path='/design' element={<PrivateRoute component={Design}/>} exact/>
          <Route path='/' element={<Home/>} exact/>

          
        </Routes>
        <Footer/>
        </>}
      
    </div>
  )
}

export default App