import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Accessibility, Ear, EyeOff, HandMetal, PersonStanding } from 'lucide-react';

const AccessibilityFeatures = () => {
  const comp = useRef(null);
  const cardRef = useRef(null);
  const iconsRef = useRef([]);

  // Add refs to the array safely
  const addToRefs = (el) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial Load Animation for the Card
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // 2. Floating Animation for Icons
      iconsRef.current.forEach((icon, index) => {
        gsap.to(icon, {
          y: -15,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });

      // 3. Mouse Parallax Effect
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(iconsRef.current, {
          x: (i) => x * (i + 1),
          y: (i) => y * (i + 1),
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="relative w-full min-h-[600px] flex items-center overflow-hidden">
      
      
      <img 
        src="/image/bg-3.webp" 
        alt="Background Pattern" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

     

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-20">
        
        {/* --- LEFT SIDE: CONTENT CARD --- */}
        <div 
          ref={cardRef}
          className="bg-black text-white p-8 md:p-12 max-w-xl w-full shadow-2xl relative z-20"
        >
          <div className="mb-6">
            <div className="border-2 border-white rounded-full p-1 inline-block">
              <Accessibility size={32} strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Accessibility features
          </h2>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            PlayStation strives to create experiences that fit the needs of
            players of all abilities. Find out more about accessibility
            features included in this game, and other titles from
            PlayStation Studios.
          </p>

          <button className="bg-white text-black font-medium py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 ease-out">
            Find out more
          </button>
        </div>

        {/* --- RIGHT SIDE: FLOATING ICONS --- */}
        <div className="relative h-[400px] w-full hidden lg:block perspective-1000 z-20">
          
          <div 
            ref={addToRefs}
            className="absolute top-1/4 left-0 bg-yellow-500 p-4 rounded-full shadow-lg bg-opacity-90 backdrop-blur-sm"
          >
            <Ear size={40} color="white" strokeWidth={2} />
          </div>

          <div 
            ref={addToRefs}
            className="absolute top-10 right-10 bg-emerald-400 p-4 rounded-full shadow-lg bg-opacity-90 backdrop-blur-sm"
          >
            <HandMetal size={40} color="white" strokeWidth={2} />
          </div>

          <div 
            ref={addToRefs}
            className="absolute bottom-10 left-20 bg-indigo-400 p-4 rounded-full shadow-lg bg-opacity-90 backdrop-blur-sm"
          >
            <EyeOff size={40} color="white" strokeWidth={2} />
          </div>

          <div 
            ref={addToRefs}
            className="absolute bottom-1/4 right-0 bg-pink-500 p-4 rounded-full shadow-lg bg-opacity-90 backdrop-blur-sm"
          >
            <PersonStanding size={40} color="white" strokeWidth={2} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;