import React from 'react';

const MobileNav = ({ isActive, onToggle }) => {
  return (
    <i 
      className={`bi bi-list mobile-nav-toggle d-xl-none ${isActive ? 'bi-x' : ''}`}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    ></i>
  );
};

export default MobileNav;
