import React, { useState } from 'react';
import Footer from '../components/Footer';
import CreateIndex from '../components/Goal/indexGoalCreate';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const GoalCreatePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <CreateIndex />
      <Footer />
    </>
  );
};

export default GoalCreatePage;
