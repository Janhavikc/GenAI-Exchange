import * as React from 'react';

import LandingPage from '../components/LandingPage';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Eyes from '../components/Eyes';
import Cards from '../components/Cards';

const Home = ()=>{
  
    return<div>
      
      <LandingPage/>
      <Marquee/>
      <About/>
      <Eyes/>
      <Cards/>
      
    </div>
};

export default Home;