import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, User } from 'lucide-react'; 

// --- PREMIUM CIRCULAR LOGO ---
const Logo = () => (
  <div className="group relative cursor-pointer flex items-center justify-center">
    
    {/* 1. Outer Glow (activates on hover) */}
    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* 2. The Circle Container */}
    <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-b from-white/20 to-white/5 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,112,209,0.5)] group-hover:scale-105 overflow-hidden">
      
      {/* 3. Inner Background (Dark behind image) */}
      <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
        
        {/* 4. The Image */}
        <img 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
          src="/image/bg-main.png"  // Fixed path for React public folder
          alt="Brand Logo" 
        />
        
        {/* 5. Glass Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"></div>
      </div>
    </div>
  </div>
);

// --- Navigation Link Component ---
const NavLink = ({ children, mobile = false }) => (
  <li className={`relative cursor-pointer group ${mobile ? 'w-full py-3 border-b border-white/5' : 'px-2 py-1'}`}>
    <span className={`relative z-10 transition-all duration-300 font-medium tracking-wide flex items-center justify-between
      ${mobile ? 'text-xl text-gray-200 group-hover:text-white' : 'text-sm text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`}>
      {children}
      {mobile && <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />}
    </span>
    
    {/* Desktop Hover Underline Glow */}
    {!mobile && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100 blur-[1px]"></span>
    )}
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
    <>
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled 
            ? 'bg-[#050505]/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent py-6 border-b border-transparent'
          }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* LEFT: Logo & Links */}
          <div className="flex items-center gap-10 lg:gap-12">
            <Logo />
            
            {/* Desktop Menu */}
            <ul className="hidden lg:flex gap-8 text-sm uppercase tracking-widest font-semibold">
              {['Games', 'Hardware', 'Services', 'News', 'Shop', 'Support'].map(item => (
                <NavLink key={item}>{item}</NavLink>
              ))}
            </ul>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-5">
            
            {/* Sign In Button (Premium Glass Style) */}
            <button className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-2 px-5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(0,112,209,0.3)] group">
              <User className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors relative group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              {/* Button Glow */}
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>

        {/* --- SCROLL PROGRESS LINE (Lighting Effect) --- */}
        <div className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-1000 ${isScrolled ? 'w-full opacity-50' : 'w-0 opacity-0'}`}></div>
      </nav>

      {/* --- MOBILE MENU (Dark Glass Drawer) --- */}
      <div 
        className={`fixed inset-0 z-40 bg-[#020202]/95 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] lg:hidden flex flex-col pt-32 px-8
        ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col gap-2">
           {['Games', 'Hardware', 'Services', 'News', 'Shop', 'Support'].map((item, index) => (
             <NavLink key={item} mobile>{item}</NavLink>
           ))}
        </ul>

        <div className="mt-10">
          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(0,112,209,0.5)]">
            Sign In / Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;