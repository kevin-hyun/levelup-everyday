import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero/index';
import Info from '../components/Info/index';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/Info/Data';
// import Services from "../components/Services";
import Footer from '../components/Footer';
import isLogin from '../components/utils/isLogin';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} isLogin={isLogin()} />
      <Navbar toggle={toggle} isLogin={isLogin()} />
      <Hero />
      <Info {...homeObjOne} />
      <Info {...homeObjTwo} />
      <Info {...homeObjThree} />
      {/* <Services /> */}
      <Footer />
    </>
  );
};

export default Home;
