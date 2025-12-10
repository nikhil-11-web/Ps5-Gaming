import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Be greater",
    description: "When a new villain threatens Marvel’s New York, Peter Parker and Spider-Man’s worlds collide. To save the city and those he loves, he must rise up and be greater."
  },
  {
    title: "Feel like Spider-Man",
    description: "After eight years behind the mask, Peter Parker is a crime-fighting master. Feel the full power of a more experienced Spider-Man with improvisational combat, dynamic acrobatics, fluid urban traversal and environmental interactions. A rookie no longer, this is the most skilful Spider-Man you’ve ever played."
  },
  {
    title: "Worlds collide",
    description: "The worlds of Peter Parker and Spider-Man collide in an original action-packed story. In this new Spider-Man universe, iconic characters from Peter and Spider-Man’s lives have been reimagined, placing familiar characters in unique roles."
  },
  {
    title: "Marvel’s New York is your playground",
    description: "The Big Apple comes to life as Insomniac’s most expansive and interactive world yet. Swing through vibrant neighbourhoods and catch breathtaking views of iconic Marvel and Manhattan landmarks. Use the environment to defeat villains with epic takedowns in true blockbuster action."
  },
  {
    title: "Enjoy The City That Never Sleeps complete content",
    description: "Get access to three story chapters that include a complete and expansive new storyline, additional challenges, new allies and enemies from the Spider-Man universe plus additional suits to unlock."
  }
];

const KeyFeatures = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Header Animation (Slow fade up)
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // 2. Feature Cards Animation (Staggered reveal)
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1, // Fast stagger for a domino effect
        ease: "power3.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      // Using a gradient gives it that "Premium" cinematic lighting look
      className="relative w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a60f0f] via-[#7d0404] to-[#4a0202] text-white py-24 px-6 md:px-16 lg:px-24 overflow-hidden antialiased"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-center mb-20 md:mb-28">
          <h2 
            ref={headerRef} 
            className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-center drop-shadow-lg"
          >
            Key features
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 lg:gap-y-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className="group flex flex-col gap-4 cursor-default"
            >
              {/* Title with Hover Effect */}
              <h3 className="text-2xl md:text-3xl font-medium tracking-wide transition-colors duration-300 group-hover:text-red-200">
                {feature.title}
              </h3>

              {/* Decorative Line (Premium Detail) */}
              <div className="w-12 h-[2px] bg-red-400/50 group-hover:w-24 group-hover:bg-white transition-all duration-500 ease-out"></div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;