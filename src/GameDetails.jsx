import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GameDetails = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const logoRef = useRef(null); // Ref for the new image

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Specs (Left)
      tl.from(leftColRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      })
      // 2. Legal Text (Right)
      .from(rightColRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      // 3. Marvel Logo (Bottom)
      .from(logoRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // Force white background with inline style to override any global CSS conflicts
      style={{ backgroundColor: '#ffffff' }}
      className="w-full relative z-10 text-sm md:text-[15px] leading-relaxed font-sans border-t border-gray-100"
    >
      <div className="container mx-auto px-6 py-12 md:py-24">
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mb-16">

          {/* --- LEFT COLUMN: SPECS --- */}
          <div className="w-full">
            <dl ref={leftColRef} className="space-y-4 md:space-y-3">
              <DetailRow label="Platform:" value="PS5" />
              <DetailRow label="Release:" value="4/5/2023" />
              <DetailRow label="Publisher:" value="Sony Interactive Entertainment" />
              <DetailRow label="Genres:" value="Action" />
              <DetailRow label="Voice:" value="English, French (France), German, Italian" />
              <DetailRow 
                label="Screen Languages:" 
                value="Czech, Danish, Dutch, English, Finnish, French (France), German, Greek, Hungarian, Italian, Norwegian, Swedish" 
              />
            </dl>
          </div>

          {/* --- RIGHT COLUMN: LEGAL TEXT --- */}
          <div ref={rightColRef} className="text-gray-900 space-y-5 md:space-y-6">
            <p>
              Download of this product is subject to the PlayStation Network Terms
              of Service and our Software Usage Terms plus any specific additional
              conditions applying to this product. If you do not wish to accept
              these terms, do not download this product. See Terms of Service for
              more important information.
            </p>
            <p>
              You can download and play this content on the main PS5 console
              associated with your account (through the “Console Sharing and
              Offline Play” setting) and on any other PS5 consoles when you login
              with your same account.
            </p>
            <p>
              See <a href="#" className="text-[#0072ce] hover:underline font-medium">Health Warnings</a> for 
              important health information before using this product.
            </p>
            <p>
              Library programs ©Sony Interactive Entertainment Inc. exclusively
              licensed to Sony Interactive Entertainment Europe. Software Usage
              Terms apply, See <a href="#" className="text-[#0072ce] hover:underline font-medium">eu.playstation.com/legal</a> for 
              full usage rights.
            </p>
          </div>

        </div>

        {/* --- BOTTOM LOGO --- */}
        {/* Centered, properly sized, and animated */}
        <div 
          ref={logoRef} 
          className="w-full flex justify-center items-center pt-8 border-t border-gray-100"
        >
          <img 
            className="h-12 md:h-16 w-auto object-contain hover:opacity-80 transition-opacity duration-300" 
            src="/image/marvel-img.webp" 
            alt="Marvel Logo" 
          />
        </div>

      </div>
    </section>
  );
};

// --- HELPER COMPONENT ---
const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-0 items-baseline border-b sm:border-none border-gray-100 pb-2 sm:pb-0">
    <dt className="text-gray-500 font-normal text-xs sm:text-sm uppercase sm:normal-case tracking-wider sm:tracking-normal">
      {label}
    </dt>
    <dd className="text-black font-bold">
      {value}
    </dd>
  </div>
);

export default GameDetails;