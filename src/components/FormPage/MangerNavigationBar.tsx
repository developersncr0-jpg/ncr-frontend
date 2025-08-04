import React, { useState } from 'react';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';

const MangerNavigationBar: React.FC = () => {
  const [active, setActive] = useState('manager');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'HOME', path: '/managerhome' },
    { name: 'REGISTRANTS', path: '/manager' },
    { name: 'MEDIA' },
    { name: 'CAREERS' },
    { name: 'PROCUREMENT' },
    { name: 'Logout', path: '/' },
  ];

  React.useEffect(() => {
    if (window.location.pathname === '/managerhome') {
      setActive('HOME');
    }
  if (window.location.pathname === '/manager') {
    setActive('REGISTRANTS');
  } else if (window.location.pathname === '/media') {
    setActive('MEDIA');
  } else if (window.location.pathname === '/careers') {
    setActive('CAREERS');
  } else if (window.location.pathname === '/procurement') {
    setActive('PROCUREMENT');
  }
  }, []);



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

export default MangerNavigationBar;
