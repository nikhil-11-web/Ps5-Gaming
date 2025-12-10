import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const SpiderManSection = () => {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Parallax Background Effect
      gsap.to(bgImageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100, // Move image slightly for depth
        scale: 1.1,
      });

      // 2. Left Column Animation (Slide in from left)
      gsap.fromTo(
        leftContentRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", // Starts when top of section hits 75% of viewport
          },
        }
      );

      // 3. Right Column Animation (Fade up)
      gsap.fromTo(
        rightContentRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 4. Footer Fine Print (Fade in late)
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 0.6, // Fine print is usually dimmer
          duration: 1.5,
          delay: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen overflow-hidden bg-black text-white flex flex-col justify-center py-20 lg:py-32"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImageRef}
          // Using a placeholder that resembles the dark NYC vibe. 
          // Replace this with your actual local asset.
          src="public/image/slide-2.webp" 
          alt="Spider-Man Background"
          className="w-full h-[120%] object-cover opacity-60"
        />
        {/* Dark Gradient Overlay for readability (Premium feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          
          {/* Left Column: Headline */}
          <div ref={leftContentRef} className="flex flex-col justify-center">
            <h3 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-gray-300 mb-6">
              What is Marvel's Spider-Man Remastered?
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              Remastered and enhanced for <span className="font-semibold text-blue-400">PS5™ console</span> – experience the complete award-winning adventure with updated visuals and immersive new features.*
            </h2>
          </div>

          {/* Right Column: Description */}
          <div ref={rightContentRef} className="text-gray-300 text-base md:text-lg leading-relaxed space-y-8 font-light">
            <p>
              This isn’t the Spider-Man you’ve met or ever seen before. In <em className="italic text-white">Marvel’s Spider-Man Remastered</em>, we meet an experienced Peter Parker who’s more masterful at fighting big crime in New York City. At the same time, he’s struggling to balance his chaotic personal life and career while the fate of Marvel’s New York rests upon his shoulders.
            </p>
            <p>
              Discover the complete web-slinging story with the <em className="italic text-white">Marvel’s Spider-Man: Miles Morales Ultimate Edition</em>. This unmissable bundle includes a voucher code** for <em className="italic text-white">Marvel’s Spider-Man Remastered</em> – the complete award-winning game, including all three DLC chapters in the <em className="italic text-white">Marvel’s Spider-Man: The City That Never Sleeps</em> adventure – remastered and enhanced for the PS5 console.
            </p>
          </div>
        </div>

        {/* Footer / Fine Print */}
        <div ref={footerRef} className="border-t border-gray-800 pt-8 mt-12 text-[10px] md:text-xs text-gray-500 leading-relaxed max-w-5xl">
          <p className="mb-2">
            *Marvel's Spider-Man Remastered for the PS5 console is available as part of the Marvel's Spider-Man: Miles Morales Ultimate Edition or available for Rs 1000 when purchased with Marvel's Spider-Man Miles Morales Standard Edition. PS4 Standard Edition owners must upgrade to PS5 version (at no cost) in order to redeem. To upgrade PS4 Standard Edition disc to the digital PS5 version, you will need a PS5 console with a disc drive.
          </p>
          <p>
            **Account for PlayStation™Network, and internet connection required for code redemption. Code expires [01/01/2024].
          </p>
        </div>

      </div>
    </section>
  );
};

export default SpiderManSection;