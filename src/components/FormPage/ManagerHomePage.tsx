import React, { useState } from 'react';
import './HomePage.css';
import MangerNavigationBar from './MangerNavigationBar';

const ManagerHomePage: React.FC = () => {




  return (
    <div>

   <MangerNavigationBar />
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

export default ManagerHomePage;
