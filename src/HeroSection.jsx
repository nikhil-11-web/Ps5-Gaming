import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection= () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const monitorRef = useRef(null);
  const controllerRef = useRef(null);

  
  const monitorImage = "public/image/spider-2.webp";
  
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Text Animation (Slide in from left)
      gsap.from(textRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

  
      gsap.from(monitorRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });

      gsap.from(controllerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          scrub: 1, 
        },
        y: 100,
        duration: 1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#000a1f]"
    >
     
      
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#003791] to-transparent opacity-60 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#001f5c] to-transparent opacity-80"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
      
          <div ref={textRef} className="flex flex-col gap-6 lg:gap-8 max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-wide">
              Marvel's Spider-Man Remastered <br/>
              <span className="font-bold block mt-2">for PC</span>
            </h2>

            <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed opacity-90">
              The worlds of Peter Parker and Spider-Man collide in an original, action-packed story, now available on PC.
            </p>

            <div className="pt-4">
              <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1 text-sm md:text-base tracking-wide">
                Find out more
              </button>
            </div>
          </div>

          
          <div className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end">
            
          
            <div ref={monitorRef} className="relative z-10 w-full max-w-[650px]">
           
              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full z-[-1]"></div>
              
              <img 
                src={monitorImage} 
                alt="Spider-Man PC Gameplay" 
                className="w-full h-auto drop-shadow-2xl rounded-lg" 
              />
            </div>
            <div 
              ref={controllerRef}
              className="absolute -bottom-12 -right-4 md:-bottom-16 md:-right-8 lg:-bottom-20 lg:right-10 z-20 w-40 md:w-56 lg:w-64"
            >
              
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection ;