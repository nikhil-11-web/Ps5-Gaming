import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Plus, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    title: "Marvel's Spider-Man Remastered",
    platform: "PS5",
    originalPrice: "₹ 3,999",
    image: "public/image/SpiderMan-img.webp",
    features: [
      "4K Dynamic Resolution",
      "Ray-traced Reflections",
      "Haptic Feedback Support",
      "Tempest 3D AudioTech"
    ],
  },
  {
    id: 2,
    title: "Marvel's Spider-Man: GOTY Edition",
    platform: "PS4",
    originalPrice: "₹ 2,999",
    image: "public/image/SpiderMan-img.webp",
    features: [
      "Marvel's Spider-Man Full Game",
      "The Heist (DLC)",
      "Turf Wars (DLC)",
      "Silver Lining (DLC)"
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
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
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
    <section ref={containerRef} className="relative py-24 px-4 md:px-8 min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">


      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>


      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">

        {products.map((product) => (
          <div
            key={product.id}
            ref={addToRefs}
            className="group flex flex-col relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.15)]"
          >


            <div className="relative w-full aspect-[16/9] overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 z-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-top transform transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />


              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-90"></div>


              <div className="absolute top-4 left-4 z-20">
                <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                  {product.platform}
                </span>
              </div>
            </div>


            <div className="p-6 md:p-8 flex flex-col flex-grow -mt-4 relative z-10">


              <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 leading-tight tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {product.title}
              </h3>

              <div className="mb-8 flex-grow">
                {product.features.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        <Check className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              <div className="mt-auto pt-6 border-t border-white/5">

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Included with</span>
                    <span className="text-white font-bold text-lg">PlayStation Plus</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-sm line-through block">{product.originalPrice}</span>
                    <span className="text-green-400 text-sm font-bold uppercase tracking-wider">Free Subscription</span>
                  </div>
                </div>


                <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-amber-500/10 to-transparent p-3 rounded-lg border-l-2 border-amber-500">
                  <Plus className="w-5 h-5 text-amber-500" />
                  <p className="text-amber-500 text-xs md:text-sm font-medium">
                    Save {product.originalPrice} with Extra Plan
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 relative overflow-hidden group/btn bg-white text-black font-bold py-3.5 rounded-xl transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    <span className="relative z-10 text-sm uppercase tracking-widest">Subscribe Now</span>
                  </button>

                  <button className="w-14 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300">
                    <Heart className="w-6 h-6" />
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