import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// CONFIGURATION & DATA
// ==========================================
const placeholderImages = {
    // The background for the bottom text section
    textSectionBg: "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-remastered-hero-banner-desktop-01-en-17jun22?$1600px$",
    carousel: [
        { type: 'image', src: 'public/image/spider-1.webp' },
        { type: 'image', src: 'public/image/slide-2.webp' },
        // Added a thumbnail to the video object for better loading
        { type: 'video', src: 'https://youtu.be/Tsf5Wjb1uAM', thumbnail: 'https://img.youtube.com/vi/Tsf5Wjb1uAM/maxresdefault.jpg' },
        { type: 'image', src: 'public/image/slide-3.webp' },
        { type: 'image', src: 'public/image/slide-4.webp' },
    ]
};

// --- Sub-Component: Infinite Premium Carousel ---
const MediaCarousel = () => {
    // 1. Setup Infinite Loop: Clone the array 3 times [Clones-Left] [Originals] [Clones-Right]
    const originalItems = placeholderImages.carousel;
    const items = [...originalItems, ...originalItems, ...originalItems];
    
    // Start in the middle set of items to allow scrolling both ways immediately
    const [currentIndex, setCurrentIndex] = useState(originalItems.length);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [itemsPerScreen, setItemsPerScreen] = useState(3);
    const carouselRef = useRef(null);

    // 2. Responsive: Calculate how many items show per screen
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerScreen(1);      // Mobile: 1 item
            else if (window.innerWidth < 1024) setItemsPerScreen(2); // Tablet: 2 items
            else setItemsPerScreen(3);                               // Desktop: 3 items
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 3. Navigation Logic
    const handleNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    }, [isTransitioning]);

    const handlePrev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    }, [isTransitioning]);

    // 4. The "Teleport" Logic (Infinite Loop Magic)
    useEffect(() => {
        if (!isTransitioning) return;

        const transitionTime = 500; // Match CSS duration
        const timer = setTimeout(() => {
            setIsTransitioning(false);
            
            // If we scrolled too far right (into the 3rd set), jump back to the middle set
            if (currentIndex >= originalItems.length * 2) {
                setCurrentIndex(currentIndex - originalItems.length);
            }
            // If we scrolled too far left (into the 1st set), jump forward to the middle set
            else if (currentIndex < originalItems.length) {
                setCurrentIndex(currentIndex + originalItems.length);
            }
        }, transitionTime);

        return () => clearTimeout(timer);
    }, [currentIndex, isTransitioning, originalItems.length]);

    return (
        <div className="relative w-full max-w-[1600px] mx-auto px-0 md:px-6 mb-20 group">
             {/* Carousel Window */}
            <div className="overflow-hidden md:rounded-2xl relative z-10">
                {/* Cinema Gradient Masks (Fade edges) */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#111] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#111] to-transparent z-20 pointer-events-none"></div>

                <div 
                    ref={carouselRef}
                    className="flex will-change-transform"
                    style={{ 
                        // Calculate transform based on items per screen
                        transform: `translateX(-${(currentIndex * 100) / itemsPerScreen}%)`,
                        transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                >
                    {items.map((item, index) => {
                        // Check if this specific slide is the "Active" one (Center of screen)
                        // In a 3-item view, the active item is the one after the current index
                        let isActive = false;
                        if (itemsPerScreen === 1) isActive = index === currentIndex;
                        if (itemsPerScreen === 2) isActive = index === currentIndex;
                        if (itemsPerScreen === 3) isActive = index === currentIndex + 1;

                        return (
                            <div 
                                key={index} 
                                className="p-2 md:p-3 flex-shrink-0 transition-all duration-500"
                                style={{ width: `${100 / itemsPerScreen}%` }}
                            >
                                <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group/card
                                    ${isActive 
                                        ? 'scale-100 opacity-100 ring-1 ring-white/30 z-10 grayscale-0' 
                                        : 'scale-90 opacity-40 hover:opacity-70 blur-[1px] hover:blur-0 grayscale'}
                                `}>
                                    
                                    <img 
                                        src={item.type === 'video' ? item.thumbnail : item.src} 
                                        alt={`Slide ${index}`} 
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover/card:scale-110" 
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                                    {/* Play Button for Video */}
                                    {item.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] backdrop-blur-md group-hover/card:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 md:w-8 md:h-8 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Badge */}
                                    <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/20">
                                            {item.type === 'video' ? 'Trailer' : 'Screenshot'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button 
                onClick={handlePrev} 
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white z-30 transition-all duration-300 hover:bg-red-600 hover:border-red-500 hover:scale-110 shadow-lg active:scale-95 group-hover:opacity-100 md:opacity-0"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
                onClick={handleNext} 
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white z-30 transition-all duration-300 hover:bg-red-600 hover:border-red-500 hover:scale-110 shadow-lg active:scale-95 group-hover:opacity-100 md:opacity-0"
            >
                 <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
    );
};

// --- Main Component: About Section ---
const AboutSection = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Animation - Left Column Stagger
      gsap.from(leftColRef.current.children, {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      });

      // 2. Text Animation - Right Column Stagger
      gsap.from(rightColRef.current.children, {
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.2,
        ease: "power4.out"
      });
      
      // 3. Parallax Background Effect
      // Moves the background image slightly slower than scroll
      gsap.to(bgImageRef.current, {
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: '20%', 
        ease: "none"
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-10 pb-20 md:py-32 bg-[#111] overflow-hidden border-t border-white/5">
      
      {/* --- Infinite Carousel --- */}
      <MediaCarousel />

      {/* --- Text Content --- */}
      <div className="relative mt-12 lg:mt-24 py-16 lg:py-24">
          
          {/* Parallax Background Container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
             <div 
                ref={bgImageRef}
                className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center mix-blend-overlay filter blur-[2px]"
                style={{ backgroundImage: `url(${placeholderImages.textSectionBg})` }}
             ></div>
          </div>
          
          {/* Gradient Fades for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#111]/80 to-[#111]"></div>

          <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Title */}
            <div ref={leftColRef} className="relative">
                {/* Decorative Line */}
                <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-600 to-red-600 rounded-full opacity-0 lg:opacity-100"></div>
                
                <span className="inline-block py-1 px-3 rounded bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    Overview
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[1.05]">
                    Remastered & <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Enhanced for PS5™</span>
                </h2>
            </div>

            {/* Right Column: Content */}
            <div ref={rightColRef} className="text-gray-400 text-lg md:text-xl leading-relaxed space-y-8 font-light">
                <p>
                    This isn't the Spider-Man you've met or ever seen before. In <strong className="text-white font-semibold">Marvel's Spider-Man Remastered</strong>, we meet an experienced Peter Parker who's more masterful at fighting big crime in New York City.
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <p className="text-base text-gray-300">
                        <span className="text-yellow-500 text-xl mr-2">★</span>
                        Includes the complete award-winning game and all three DLC chapters in the <strong className="text-white">Marvel's Spider-Man: The City That Never Sleeps</strong> expansion.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;