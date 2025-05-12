import React from 'react';
import {Link } from 'react-router-dom' ;
import facebook from '../assets/facebook.png' ;
import instagram from '../assets/instagram.png' ;
import twitter from '../assets/twitter.png'; 

const Footer = () => {
  return (
    <footer className="bg-[#38598b] text-white py-6 mt-10 ">
      <div className="container mx-auto text-center">
        {/* Top Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">PS REALTORS</h2>
          <p>Helping people find property since 2023</p>
        </div>

        {/* Links Section */}
        <div className="flex justify-center space-x-6 mb-4">
          <Link to = "/"><p className='hover:underline'>Home</p></Link>
          <Link to = "/about"><p className='hover:underline'>About Us</p></Link>
          <Link to = "/properties"><p className='hover:underline'>Properties</p></Link>
          <Link to = "/contact"><p className='hover:underline'>Contact</p></Link>
        </div>

        {/* Social Media Section */}
        <div className="mb-4">
          <p>Follow us on:</p>
          <div className="flex gap-10 justify-center space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={facebook} alt="Facebook" className="w-10 h-10" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={twitter} alt="Twitter" className="w-10 h-10" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={instagram} alt="LinkedIn" className="w-10 h-10" />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
