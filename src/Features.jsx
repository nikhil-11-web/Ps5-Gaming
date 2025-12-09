import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, description, icon, className }) => (
  <div className={`feature-card relative group overflow-hidden rounded-2xl bg-[#111] border border-white/5 p-8 transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] ${className}`}>
    {/* Hover Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="mb-6 inline-block p-3 rounded-lg bg-white/5 text-red-500 group-hover:scale-110 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  </div>
);

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 2. Cards Stagger Animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Cards appear one by one
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 max-w-2xl">
          <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block pl-1">Next Gen Features</span>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Be Greater. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Together.</span>
          </h2>
          <p className="text-gray-400 text-lg border-l-2 border-red-600 pl-6">
            Feel the power of Spider-Man with immersive haptic feedback, dynamic adaptive triggers, and 3D Audio on PS5™ console and PC.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Ray Tracing */}
          <FeatureCard 
            className="lg:col-span-2" // Spans 2 columns
            title="Ray-Traced Reflections"
            description="See the city come to life with stunning ray-traced reflections and improved shadows that add depth and realism to the streets of Marvel's New York."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            }
          />

          {/* Card 2: Ultra High Speed SSD */}
          <FeatureCard 
            title="Fast Loading"
            description="Near-instant loading gets you into the action faster than ever before. Fast travel across Marvel's New York almost instantly."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            }
          />

          {/* Card 3: Adaptive Triggers */}
          <FeatureCard 
            title="Adaptive Triggers"
            description="Feel the tension of Spider-Man's webs in your hands with dynamic adaptive triggers on the DualSense™ wireless controller."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            }
          />

          {/* Card 4: Haptic Feedback */}
          <FeatureCard 
            className="lg:col-span-2"
            title="Haptic Feedback"
            description="Experience the impact of every punch, web shot, and wall run with immersive haptic feedback that brings the game to life."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            }
          />

        </div>
      </div>
    </section>
  );
};

export default Features;