import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ChevronRight, Star, Monitor, Zap, Disc } from 'lucide-react';
import Navbar from './Navbar';
import Features from './Features';
import AboutSection from './AboutSection';
import SpiderManSection from './SpidermanSection';
import KeyFeatures from './KeyFeatures';
import ProductShowcase from './ProductShowcase';
import PS5Features from './PS5Features';
import HeroSection from './HeroSection';
import GameFranchise from './GameFranchise';
import DiscoverMoreGames from './DiscoverMoreGames';
import AccessablityFeatures from './AccessablityFeatures';
import GameDetails from './GameDetails';
import Footer from './Footer';


const EmberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.8 ? '220, 38, 38' : '255, 255, 255';
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.003;
        if (this.y < 0 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
};


const SpiderManPage = () => {
  const [selectedOption, setSelectedOption] = useState('included');

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const priceCardRef = useRef(null);
  const bgGlowRef = useRef(null);


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 1 })
        .from(".hero-title span", {
          y: 100, opacity: 0, duration: 1.2, stagger: 0.1, skewY: 5
        }, "-=0.8")
        .fromTo(imageRef.current,
          { x: '10%', opacity: 0, scale: 1.15, filter: 'blur(15px)' },
          { x: '0%', opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: "power2.out" },
          "-=1.2"
        )
        .from(priceCardRef.current, {
          x: -50, opacity: 0, duration: 1, ease: "back.out(1.7)"
        }, "-=1.0");

    }, containerRef);
    return () => ctx.revert();
  }, []);


  const handleMouseMove = (e) => {
    if (!imageRef.current || !bgGlowRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPct = (clientX / innerWidth - 0.5);
    const yPct = (clientY / innerHeight - 0.5);


    gsap.to(imageRef.current, {
      rotateY: xPct * 10,
      rotateX: -yPct * 10,
      x: xPct * 20,
      duration: 1,
      ease: "power2.out"
    });


    gsap.to(bgGlowRef.current, {
      x: xPct * 50,
      y: yPct * 50,
      duration: 2,
      ease: "power1.out"
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-red-600 selection:text-white"
      onMouseMove={handleMouseMove}
    >


      <div className="fixed inset-0 z-0 bg-[#050505]">
        \
        <div ref={bgGlowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/20 rounded-full blur-[150px] opacity-60"></div>

        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png')]"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <EmberBackground />

      <div className="relative z-50">
        <Navbar />
      </div>

      \
      <main className="relative z-10 pt-32 lg:pt-40 pb-20 min-h-[90vh] flex flex-col justify-center max-w-[1600px] mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">


          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center space-y-10 relative">

            <div className="space-y-6">

              <div className="hero-badge flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-200">Game of the Year</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
                  <Monitor className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">PC Optimized</span>
                </div>
              </div>

              {/* Massive Cinematic Headline */}
              <h1 className="hero-title text-6xl sm:text-7xl xl:text-8xl font-medium leading-[0.9] tracking-tighter text-white">
                <span className="block">BE GREATER.</span>
                <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  TOGETHER.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 font-light max-w-lg leading-relaxed pl-4 border-l-2 border-red-600/60">
                Experience the remastered hit with next-gen visuals, immersive haptic feedback, and faster loading times on PS5 and PC.
              </p>
            </div>

            {/* --- HOLOGRAPHIC PRICING CARD --- */}
            <div ref={priceCardRef} className="relative w-full max-w-md group/card perspective-1000">
              {/* Moving Shine Border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded-2xl blur-sm opacity-50 animate-pulse"></div>

              <div className="relative bg-[#080808]/80 backdrop-blur-2xl rounded-2xl p-1.5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                {/* Selection 1 */}
                <div
                  onClick={() => setSelectedOption('included')}
                  className={`relative overflow-hidden cursor-pointer p-5 rounded-xl transition-all duration-300 border ${selectedOption === 'included' ? 'bg-white/5 border-red-500/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]' : 'border-transparent hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <h3 className="text-white font-bold text-lg tracking-tight">PS Plus Extra</h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 pl-6">Instant Access to Game Catalog</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedOption === 'included' ? 'border-red-500' : 'border-white/20'}`}>
                      {selectedOption === 'included' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>}
                    </div>
                  </div>
                </div>

                {/* Selection 2 */}
                <div
                  onClick={() => setSelectedOption('buy')}
                  className={`relative overflow-hidden cursor-pointer p-5 rounded-xl transition-all duration-300 border mt-1 ${selectedOption === 'buy' ? 'bg-white/5 border-red-500/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]' : 'border-transparent hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <div className="flex items-center gap-3">
                        <Disc className="w-4 h-4 text-gray-400" />
                        <h3 className="text-white font-bold text-lg tracking-tight">Standard Edition</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1 pl-7">
                        <span className="text-green-400 font-bold">₹2,319</span>
                        <span className="text-xs text-gray-500 line-through">₹3,999</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedOption === 'buy' ? 'border-red-500' : 'border-white/20'}`}>
                      {selectedOption === 'buy' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>}
                    </div>
                  </div>
                </div>

                {/* Cyberpunk Button */}
                <button className="relative w-full mt-3 group overflow-hidden bg-white text-black font-extrabold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                    {selectedOption === 'included' ? 'Subscribe Now' : 'Add to Cart'}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative h-[50vh] lg:h-[85vh] flex items-center justify-center lg:justify-end perspective-[2000px]">

            {/* Image Backlighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-red-600/20 to-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <img
              ref={imageRef}
              src="/image/main-1.png"
              onError={(e) => {
                e.target.src = "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-remastered-hero-banner-desktop-01-en-17jun22?$1600px$";
              }}
              alt="Spider-Man Remastered"
              className="relative z-20 w-full max-w-[900px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.9)] will-change-transform"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            />
          </div>

        </div>
      </main>


      <div className="relative z-10 bg-[#050505] shadow-[0_-50px_100px_#050505]">
        <Features />
        <AboutSection />
        <SpiderManSection />
        <KeyFeatures />
        <ProductShowcase />
        <PS5Features />
        <HeroSection />
        <GameFranchise />
        <DiscoverMoreGames />
        <AccessablityFeatures />
        <GameDetails />
        <Footer />
      </div>

    </div>
  );
};

export default SpiderManPage;