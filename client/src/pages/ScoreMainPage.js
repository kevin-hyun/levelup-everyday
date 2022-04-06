import React, { useState } from 'react';
import Footer from '../components/Footer';
import Score from '../components/Score';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const GoalPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Score />
      <Footer />
    </>
  );
};

export default GoalPage;
