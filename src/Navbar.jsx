import React, { useState, useEffect } from 'react';

// Assets
const PlayStationLogo = () => (
  <svg className="w-8 h-8 fill-blue-500 hover:fill-blue-400 transition-colors duration-300" viewBox="0 0 50 50">
    <path d="M43.9,37.3c-0.6-0.3-1.4-0.4-2.1-0.2c-0.5,0.1-0.9,0.5-1.1,0.9c-0.2,0.4-0.1,1,0.3,1.3 c0.5,0.4,1.4,0.3,1.9-0.1C43.3,38.9,43.6,38.2,43.9,37.3z M30.8,32.2c-1.3-0.1-2.4,0.9-2.5,2.2c0,0.6,0.2,1.2,0.6,1.6 c0.4,0.4,1,0.6,1.6,0.6c1.3,0.1,2.4-0.9,2.5-2.2C33,33.1,32,32.1,30.8,32.2z M22,32.9c0,0-4,0.3-5.5,0.4c-1.2,0.1-1.3,1.2-0.2,1.6 c0.9,0.3,5.4,1.4,5.4,1.4c1.1,0.3,1.7-1.1,1.1-2.1C22.6,33.6,22.3,33.2,22,32.9z M13.8,36.5c-0.8-0.5-1.8-0.5-2.6-0.1 c-0.6,0.3-1,0.9-0.9,1.6c0,0.7,0.4,1.3,1,1.6c0.8,0.4,1.9,0.3,2.6-0.3C14.3,38.8,14.5,37.6,13.8,36.5z M47.3,35.4 c-0.2-1.6-1.1-3-2.5-4c-0.7-0.5-1.5-0.9-2.3-1.1c-0.5-0.1-1-0.2-1.5-0.2c-0.3,0-0.6,0-1,0c0.1,0,0.1,0,0.2,0 c1.4,0,2.8-0.4,4-1.2c1.9-1.3,2.9-3.6,2.6-5.8c-0.2-1.9-1.4-3.6-3.1-4.6c-1.3-0.8-2.9-1.2-4.5-1.1c-0.1,0-0.3,0-0.4,0 c-0.3,0-0.6,0-0.9,0c-0.1,0-0.2,0-0.3,0c-0.5,0-1,0.1-1.5,0.2c-1.6,0.4-3.1,1.4-4.1,2.7c-0.2,0.3-0.4,0.5-0.6,0.8 c-0.2-0.3-0.4-0.6-0.7-0.8c-1.1-1.3-2.6-2.2-4.3-2.6c-0.7-0.2-1.5-0.2-2.3-0.2c-0.2,0-0.5,0-0.7,0c-0.2,0-0.4,0-0.7,0 c-1.6,0-3.1,0.4-4.5,1.2c-1.8,1-3,2.7-3.2,4.7c-0.2,1.9,0.5,3.8,2,5.2c1.2,1.1,2.8,1.7,4.5,1.7l0.3,0c0,0-0.1,0-0.1,0 c-0.8,0-1.7,0.2-2.4,0.5c-1.1,0.4-2.1,1.2-2.7,2.2c-0.5,0.7-0.8,1.5-0.9,2.4c-0.1,0.8,0.1,1.6,0.5,2.3c0.1,0.2,0.3,0.5,0.5,0.7 c-2.3,0.4-4.5,1.5-6.1,3.2c-1.9,2-2.9,4.7-2.7,7.5c0.2,2.3,1.2,4.5,2.9,6.2c1.7,1.7,4,2.7,6.4,2.8h0.2c1.4,0,2.8-0.3,4.1-1 c1-0.5,1.9-1.2,2.7-2c0.2-0.2,0.4-0.4,0.6-0.6c0.2,0.2,0.4,0.4,0.7,0.6c1.3,1.2,2.9,1.9,4.7,1.9c0.2,0,0.4,0,0.6,0 c2.2-0.1,4.3-1,5.9-2.5c1.6-1.5,2.6-3.6,2.9-5.8C48.6,40,48.3,37.6,47.3,35.4z" />
  </svg>
);

const NavLink = ({ children }) => (
  <li className="relative cursor-pointer group px-2 py-1 overflow-hidden">
    <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-300 font-medium">{children}</span>
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
  </li>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md py-3 border-gray-200 shadow-sm' 
          : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center text-black">
        <div className="flex items-center gap-8">
          <PlayStationLogo />
          {/* Desktop Menu */}
          <ul className={`hidden lg:flex gap-6 text-sm tracking-tight transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-gray-100'}`}>
            {['Games', 'PS5', 'PS4', 'Services', 'Accessories', 'News', 'Store', 'Support'].map(item => (
              <NavLink key={item}>{item}</NavLink>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-[#0070d1] hover:bg-[#00439c] text-white font-bold py-2 px-6 rounded-full text-xs transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(0,112,209,0.4)]">
            Sign In
          </button>
          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden text-2xl ${isScrolled ? 'text-black' : 'text-white'}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Simple Mobile Menu Dropdown */}
      <div className={`absolute top-full left-0 w-full bg-white text-black p-4 shadow-xl transition-transform duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100' : 'scale-y-0'}`}>
        <ul className="flex flex-col gap-4 font-bold">
            {['Games', 'PS5', 'PS4', 'Services'].map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;