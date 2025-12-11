import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Twitter, Instagram, Youtube, Globe, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const topRef = useRef(null);
  const columnsRef = useRef([]);
  const bottomRef = useRef(null);

  // Helper to add refs to the array
  const addToRefs = (el) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Trigger slightly earlier
        }
      });

      // 1. Breadcrumbs Fade In
      tl.from(topRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 2. Columns "Waterfall" Effect
      tl.from(columnsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, 
        ease: "power3.out",
      }, "-=0.4");

      // 3. Bottom Legal Section Fade Up
      tl.from(bottomRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      // FIX: Inline style for background image to ensure it loads correctly
      style={{ backgroundImage: "url('/image/bg-image.webp')" }}
      className="relative text-white w-full font-sans pt-16 pb-12 overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
    >
      {/* --- Overlay: Makes text readable on top of image --- */}
      <div className="absolute inset-0  z-0"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        
        {/* --- TOP: LOGO & BREADCRUMBS --- */}
        <div ref={topRef} className="mb-14 border-b border-white/10 pb-10">
          <div className="flex items-center gap-3 mb-6 group cursor-pointer w-fit">
             {/* Logo Path Fixed: Removed 'public' */}
             <img className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" src="/image/footer-logo-1.webp" alt="PlayStation Logo" />
             <span className="text-3xl font-light tracking-widest pt-1 uppercase">PlayStation</span>
          </div>

          <div className="text-xs md:text-sm text-blue-200/80 flex flex-wrap gap-2 items-center font-medium">
            <a href="#" className="hover:text-white hover:underline transition-all duration-200">Home</a>
            <span className="opacity-50 text-[10px]">▶</span>
            <a href="#" className="hover:text-white hover:underline transition-all duration-200">Games</a>
            <span className="opacity-50 text-[10px]">▶</span>
            <span className="text-white opacity-90">Marvel's Spider-Man Remastered</span>
          </div>
        </div>

        {/* --- MAIN GRID LINKS --- */}
        {/* Responsive: 2 cols on mobile -> 3 on tablet -> 6 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12 mb-16">
          
          <FooterColumn 
            addToRefs={addToRefs}
            title="About" 
            links={["About SIE", "Careers", "PlayStation Studios", "PlayStation Productions", "Corporate", "History of PlayStation"]} 
          />

          <FooterColumn 
            addToRefs={addToRefs}
            title="Products" 
            links={["PS5", "PS4", "PS VR2", "PS Plus", "Accessories", "Games"]} 
          />

          <FooterColumn 
            addToRefs={addToRefs}
            title="Values" 
            links={["Environment", "Accessibility", "Online safety", "Diversity, equity & inclusion"]} 
          />

          <FooterColumn 
            addToRefs={addToRefs}
            title="Support" 
            links={["Support hub", "PlayStation Safety", "Status", "PlayStation Repairs", "Password reset"]} 
          />

          <FooterColumn 
            addToRefs={addToRefs}
            title="Resources" 
            links={["Terms of service", "PS Store cancellation policy", "Age ratings", "Health warning", "Developers"]} 
          />

          {/* Socials Column */}
          <div ref={addToRefs} className="space-y-6 col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="font-bold text-lg tracking-wide text-blue-400">Connect</h3>
            <div className="flex gap-4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Youtube} />
            </div>
            <div className="pt-4 space-y-3">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-blue-600 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 w-full justify-center">
                 Download App
              </button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM: LEGAL --- */}
        <div ref={bottomRef} className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-start gap-8 opacity-80">
          
          {/* SIE LOGO Area */}
          <div className="flex-shrink-0 group">
             {/* The CSS Diamond Logo (Sony Style) */}
             <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#f5d51e] rotate-45 transform shadow-[0_0_15px_#f5d51e] group-hover:rotate-180 transition-transform duration-700 ease-in-out"></div>
                <Globe className="absolute w-5 h-5 text-black z-10" />
             </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h4 className="text-lg font-light tracking-wide text-white">Sony Interactive Entertainment</h4>
            <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed">
              © 2026 Sony Interactive Entertainment Europe Limited (SIEE)<br />
              All content, games titles, trade names and/or trade dress, trademarks, artwork and associated imagery are trademarks and/or copyright material of their respective owners. All rights reserved. 
              <a href="#" className="underline ml-1 text-blue-400 hover:text-white transition-colors">More info</a>
            </p>
            
            <div className="flex flex-wrap gap-4 text-[11px] text-gray-500 pt-2">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">Website Terms</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
};

// --- HELPER COMPONENTS ---

const FooterColumn = ({ title, links, addToRefs }) => (
  <div ref={addToRefs} className="space-y-5">
    <h3 className="font-bold text-lg tracking-wide text-blue-400">{title}</h3>
    <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="block hover:text-white hover:translate-x-1 transition-all duration-300 ease-out">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ Icon }) => (
  <a 
    href="#" 
    className="bg-white/5 p-2 rounded-full hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(37,99,235,0.5)] transition-all duration-300"
  >
    <Icon size={20} strokeWidth={1.5} />
  </a>
);

export default Footer;