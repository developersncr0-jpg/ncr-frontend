import React, { useState } from 'react';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Fill Form', path: '/newForm' },
    { name: 'Application Status', path: '/tracking' },
    { name: 'Logout', path: '/' },
  ];

  const handleClick = (item: { name: string; path: string }) => {
    setActive(item.name);
    if (item.name === 'Logout') {
      localStorage.clear();
    }
    navigate(item.path);
  };

  return (
    <div className="custom-navbar">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`custom-nav-item ${active === item.name ? 'active' : ''}`}
          onClick={() => handleClick(item)}
        >
          {item.name.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default NavigationBar;
