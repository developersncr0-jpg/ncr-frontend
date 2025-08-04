import React, { useState } from 'react';
import './HomePage.css';
import NavigationBar from './NavigationBar';

const HomePage: React.FC = () => {




  return (
    <div>

   <NavigationBar />
  <div className="logo-wrapper">
  <div className="login-logo">
    <h1 className="ncr-title">NCR</h1>
    <p className="ncr-subtitle">National Credit Regulator</p>
    <span className="ncr-tagline">Advocating For Inclusive Credit</span>
  </div>
</div>
</div>

  );
};

export default HomePage;
