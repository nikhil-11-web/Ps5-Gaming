import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const games = [
  {
    id: 1,
    title: "Marvel's Spider-Man: Miles Morales",
    // Correct Path: "/image/..." (Do not use "public/")
    image: "/image/spider-3.webp",
  },
  {
    id: 2,
    title: "Marvel's Spider-Man 2",
    image: "/image/spider-4.webp",
  },
  {
    id: 3,
    title: "Marvel's Spider-Man",
    image: "/image/spider-5.webp",
  }
];

const GameFranchise = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  // --- GSAP Animation Setup ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Cards Animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2, 
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      // FIX 1: Use inline style for background image to ensure it loads correctly
      style={{ backgroundImage: "url('/image/bg-2.webp')" }}
      // FIX 2: Added 'bg-cover bg-center' so the image scales perfectly on all screens
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-cover bg-center overflow-hidden font-sans text-white"
    >
      {/* Optional Overlay to make text more readable against the background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* --- Section Title --- */}
        <div className="flex justify-center mb-16 md:mb-24">
          <h2 
            ref={titleRef} 
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-center font-bold tracking-wide leading-tight drop-shadow-xl"
          >
            Explore games from the <br className="hidden md:block" />
            Marvel's Spider-Man franchise
          </h2>
        </div>

        {/* --- Game Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {games.map((game) => (
            <div 
              key={game.id} 
              ref={addToRefs}
              className="group flex flex-col items-center text-center"
            >
              
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 border border-white/10">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
         
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

            
              <h3 className="text-xl md:text-2xl font-medium mb-6 tracking-wide drop-shadow-lg">
                {game.title}
              </h3>

              <button className="bg-white text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] text-sm tracking-wider uppercase">
                Learn more
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GameFranchise;