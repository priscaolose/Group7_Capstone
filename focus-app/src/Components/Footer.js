import React from 'react';
import '../CSSFolders/Footer.css'; 

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {year} Focus. All rights reserved.</p>
    </footer> 
  );
};


export default Footer;
