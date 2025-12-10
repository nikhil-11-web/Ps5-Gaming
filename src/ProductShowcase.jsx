import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    title: "Marvel's Spider-Man Remastered",
    platform: "PS5",
    originalPrice: "Rs 3,999",
    // REPLACE with your local image: import img1 from './assets/spiderman-ps5.jpg'
    image: "public/image/SpiderMan-img.webp",
    features: [],
  },
  {
    id: 2,
    title: "Marvel's Spider-Man: Game of the Year Edition",
    platform: "PS4",
    originalPrice: "Rs 2,999",
    // REPLACE with your local image: import img2 from './assets/spiderman-ps4.jpg'
    image: "public/image/SpiderMan-img.webp",
    features: [
      "Marvel's Spider-Man",
      "The Heist",
      "The City That Never Sleeps:",
      "Turf Wars",
      "Silver Lining"
    ], 
  }
];

const ProductShowcase = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
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
    <section ref={containerRef} className="bg-[#050505] py-16 px-4 md:px-12 lg:px-24 min-h-screen flex items-center justify-center font-sans antialiased">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        
        {products.map((product) => (
          <div 
            key={product.id} 
            ref={addToRefs}
            // Card container: Flex column ensures footer always aligns at bottom
            className="group flex flex-col bg-[#141414] rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(217,78,24,0.3)]"
          >
            
            {/* --- FIXED IMAGE SECTION --- */}
            {/* 'aspect-video' forces 16:9 ratio on all screens. 'relative' needed for the shine effect. */}
            <div className="relative w-full aspect-video overflow-hidden bg-[#0a0a0a] border-b border-white/5">
              
              <img 
                src={product.image} 
                alt={product.title} 
                // object-cover ensures image fills the box without stretching
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
              />
              
              {/* Premium "Shine" Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-10 pointer-events-none"></div>
              
              {/* Vignette Shadow for text readability (optional) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-40"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-grow relative">
              
              {/* Platform Badge */}
              <div className="flex justify-center mb-4 md:mb-6">
                <span className="bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-sm tracking-[0.2em] uppercase backdrop-blur-md">
                  {product.platform}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-center leading-snug tracking-wide">
                {product.title}
              </h3>

              {/* Bullet Points */}
              {product.features.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8 text-sm text-gray-400">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-orange-500 text-xs mt-1">●</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex-grow"></div>
              )}

              {/* Footer / Pricing Section */}
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex flex-wrap items-baseline justify-center gap-3 mb-4">
                  <span className="text-2xl md:text-3xl text-white font-light tracking-wide">Included</span>
                  <span className="text-gray-600 text-base md:text-lg line-through font-light decoration-1">
                    {product.originalPrice}
                  </span>
                </div>

                {/* PS Plus Note */}
                <div className="flex items-center justify-center gap-3 mb-6 bg-amber-500/5 py-3 px-4 rounded-lg border border-amber-500/10">
                  <div className="flex-shrink-0">
                     <Plus className="w-4 h-4 text-amber-500 fill-current" strokeWidth={4} />
                  </div>
                  <p className="text-amber-500 text-xs font-semibold leading-tight tracking-wide">
                    Subscribe to PlayStation Plus Extra
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 md:gap-4">
                  <button className="flex-grow bg-gradient-to-r from-[#d94e18] to-[#ff6b35] hover:from-[#ff5a1f] hover:to-[#ff8555] text-white font-bold py-3 md:py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/25 text-xs md:text-sm tracking-widest uppercase">
                    Subscribe
                  </button>
                  <button className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300 group/btn active:scale-95 flex-shrink-0">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ProductShowcase;