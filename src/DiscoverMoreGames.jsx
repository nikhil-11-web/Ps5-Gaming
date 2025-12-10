import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DiscoverMoreGames = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const games = [
    { src: "/image/Dicovergames.webp", alt: "PS5 Game Collection" },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
     
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

     
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
    
      className="relative bg-[#00439c] overflow-hidden min-h-[400px] flex items-center"
    >
      
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full bg-[#005cce] transform -skew-x-12 translate-x-16 z-0 origin-bottom hidden lg:block"></div>


      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
         
          <div ref={textRef} className="text-white flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-4 tracking-wide">
              Discover more great <br/>
              <span className="font-bold">PS5 games</span>
            </h2>
            
            <p className="text-base lg:text-lg text-blue-100 mb-8 font-light leading-relaxed max-w-md">
              Explore a range of stunning titles available now or coming soon to PS5.
            </p>
            
            <a
              href="#"
              className="inline-block bg-white text-[#00439c] font-bold py-3 px-8 rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-md text-sm tracking-wider uppercase"
            >
              Start browsing
            </a>
          </div>

          
          <div ref={imageRef} className="relative w-full flex justify-center lg:justify-end">
         
            <div className="w-full max-w-[550px] rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500 border border-white/10 bg-black/10">
                <img 
                  src={games[0].src} 
                  alt={games[0].alt} 
                  className="w-full h-auto object-cover block" 
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiscoverMoreGames;