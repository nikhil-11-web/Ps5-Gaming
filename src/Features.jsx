import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NoiseOverlay = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
  />
);



const SpotlightCard = ({ title, description, icon, className = "", index }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`feature-card relative group rounded-3xl bg-neutral-900/40 border border-white/10 overflow-hidden backdrop-blur-sm ${className}`}
    >
      
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.15), transparent 40%)`,
        }}
      />
      
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/5 to-white/0 text-red-500 border border-white/5 shadow-inner group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 ease-out">
          {icon}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-red-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-medium group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};


const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const featuresData = [
    {
      title: "Ray-Traced Reflections",
      description: "Witness the city come alive. Advanced ray-tracing calculates light paths in real-time for hyper-realistic reflections on skyscrapers and wet streets.",
      className: "md:col-span-2",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    {
      title: "Ultra-High Speed SSD",
      description: "Traversal is seamless. Fast travel across Marvel's New York happens almost instantly, keeping you immersed in the action.",
      className: "md:col-span-1",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Adaptive Triggers",
      description: "Feel the tension of the web-line. Triggers dynamically adjust resistance to mimic the physical sensation of swinging.",
      className: "md:col-span-1",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
    },
    {
      title: "Haptic Feedback",
      description: "Senses heightened. Feel the hum of electricity and the impact of combat directly in your palms via DualSense™.",
      className: "md:col-span-2",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refined Header Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(headerRef.current.querySelectorAll(".reveal-text"), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      })
      .from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-black overflow-hidden selection:bg-red-500/30">
      
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black opacity-60" />
      <NoiseOverlay />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
       
        <div ref={headerRef} className="mb-16 md:mb-24 max-w-3xl">
          <div className="reveal-text flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-red-600" />
            <span className="text-red-500 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-bold">Next Gen Technology</span>
          </div>
          
          <h2 className="reveal-text text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            Be Greater. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600">
              Together.
            </span>
          </h2>
          
          <p className="reveal-text text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
            Immerse yourself in a living Marvel's New York with features designed to utilize the full power of the <span className="text-white font-semibold">PlayStation 5</span> console.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map((feature, idx) => (
            <SpotlightCard 
              key={idx}
              index={idx}
              {...feature}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Features;