
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import Lenis from 'lenis'; // Import Lenis for smooth scroll
import Navbar from './Navbar'; // Import the new Navbar
import Features from './Features'; // Import the Features component
import AboutSection from './AboutSection';
import SpiderManSection from './SpidermanSection';
import KeyFeatures from './KeyFeatures';
import ProductShowcase from './ProductShowcase';
import PS5Features from './PS5Features';
import HeroSection from './HeroSection'; 
import GameFranchise from './GameFranchise'; 
import DiscoverMoreGames from './DiscoverMoreGames'


// --- Icons ---
const PlusIcon = () => (
  <svg className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 mr-2 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

// --- 1. Premium 3D Background (Geometric Shards) ---
const PremiumBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002); // Deep fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Create Geometric Shards (Tetrahedrons)
    const geometry = new THREE.TetrahedronGeometry(1, 0); // Triangular shards
    const count = 400;
    
    // InstancedMesh for performance
    const mesh = new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({
        color: 0xff3333,
        transparent: true,
        opacity: 0.6,
        wireframe: true, // Tech feel
        blending: THREE.AdditiveBlending
    }), count);

    const dummy = new THREE.Object3D();
    const positions = [];
    const speeds = [];

    for (let i = 0; i < count; i++) {
        // Random Position
        dummy.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 60
        );
        // Random Rotation
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        
        // Random Scale
        const scale = Math.random() * 0.8;
        dummy.scale.set(scale, scale, scale);

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        positions.push({ 
            x: dummy.position.x, 
            y: dummy.position.y, 
            z: dummy.position.z,
            rx: Math.random() * 0.01,
            ry: Math.random() * 0.01
        });
    }

    scene.add(mesh);

    // Mouse Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Animate each shard
        for (let i = 0; i < count; i++) {
            const pos = positions[i];
            
            // Gentle float
            dummy.position.set(pos.x, pos.y + Math.sin(Date.now() * 0.001 + pos.x) * 0.5, pos.z);
            
            // Rotate based on time + mouse
            dummy.rotation.x += pos.rx + (mouseY * 0.002);
            dummy.rotation.y += pos.ry + (mouseX * 0.002);
            dummy.scale.setScalar(0.5 + Math.sin(Date.now() * 0.002 + i) * 0.2); // Pulse scale

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;

        // Camera Sway
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen" />;
};

// --- 2. Main Page Component ---
const SpiderManPage = () => {
  const [selectedOption, setSelectedOption] = useState('included');
  
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const priceCardRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Initialize Lenis Smooth Scroll
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

  // 3D Tilt Effect for Image
  const handleImageMouseMove = (e) => {
    if (!imageRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate rotation (-15deg to 15deg)
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;

    gsap.to(imageRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 1,
        ease: "power2.out"
    });
  };

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Text Stagger
      tl.from(heroTextRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        skewY: 5
      })
      // Image Slide & Clear Blur
      .fromTo(imageRef.current, 
        { x: '20%', opacity: 0, scale: 1.1, filter: 'blur(20px)' },
        { x: '0%', opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8 },
        "-=1.2"
      )
      // Price Card Reveal
      .from(priceCardRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        clearProps: "all"
      }, "-=1.0");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-red-600 selection:text-white" onMouseMove={handleImageMouseMove}>
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png')]"></div>

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#1a0000] via-[#2b0505] to-[#0a0a0a]" />
      
      {/* Three.js 3D Layer */}
      <PremiumBackground />

      <Navbar />

      {/* --- Main Hero Content --- */}
      <main className="relative z-10 pt-24 min-h-screen flex flex-col justify-center max-w-[1600px] mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[80vh]">
          
          {/* Left Column: Text & Pricing */}
          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-8 lg:pr-10">
            
            <div ref={heroTextRef} className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded text-red-400 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                  PS5 Optimized
                </span>
                <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded text-blue-300">
                  PC Compatible
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tighter">
                Marvel's <br /> 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Spider-Man</span> <br /> 
                <span className="text-3xl sm:text-5xl italic font-serif text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Remastered</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-400 font-medium max-w-lg border-l-2 border-red-800 pl-4 opacity-80">
                Experience the remastered hit with next-gen visuals, immersive haptic feedback, and faster loading times.
              </p>
            </div>

            {/* Premium Pricing Card */}
            <div ref={priceCardRef} className="relative group w-full max-w-md perspective-1000">
              {/* Backlight Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-900 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              
              <div className="relative bg-[#121212]/80 backdrop-blur-2xl rounded-2xl p-1 border border-white/10 shadow-2xl">
                
                <div className="space-y-1">
                  {/* Option 1 */}
                  <label 
                    className={`relative flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 group/item overflow-hidden ${selectedOption === 'included' ? 'bg-white/5 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                    onClick={() => setSelectedOption('included')}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === 'included' ? 'border-red-500' : 'border-gray-600'}`}>
                      {selectedOption === 'included' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_red]" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-medium text-white">Included</span>
                        <span className="text-sm text-gray-500 line-through">₹3,999</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-yellow-400 bg-yellow-400/5 p-2 rounded-lg border border-yellow-400/10">
                        <PlusIcon />
                        <span className="opacity-90 leading-tight">Included with <strong>PlayStation Plus Extra</strong> catalogue.</span>
                      </div>
                    </div>
                  </label>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

                  {/* Option 2 */}
                  <label 
                    className={`relative flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 group/item ${selectedOption === 'buy' ? 'bg-white/5 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                    onClick={() => setSelectedOption('buy')}
                  >
                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === 'buy' ? 'border-red-500' : 'border-gray-600'}`}>
                      {selectedOption === 'buy' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_red]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-white">₹2,319</span>
                        <span className="text-sm text-gray-500 line-through">₹3,999</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">-42%</span>
                        <span className="text-[10px] text-gray-400">Limited time offer</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* CTA Button */}
                <div className="p-4 pt-2">
                  <button className="relative w-full overflow-hidden rounded-xl bg-[#d04000] hover:bg-[#ff5000] transition-colors duration-300 py-4 font-bold text-lg tracking-wide shadow-[0_10px_40px_-10px_rgba(208,64,0,0.6)] active:scale-[0.98] group/btn">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {selectedOption === 'included' ? 'Subscribe Now' : 'Add to Cart'}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: 3D Image Container */}
          <div ref={imageContainerRef} className="order-1 lg:order-2 relative h-[50vh] lg:h-auto flex items-center justify-center lg:justify-end perspective-1000">
            {/* Glow behind Spider-Man */}
            <div className="absolute w-[60%] h-[60%] bg-red-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
            
            <div className="relative z-20 transform-style-3d">
                <img 
                ref={imageRef}
                src="public/image/SpiderMan-img.webp" 
                // Robust Fallback incase local image fails
                onError={(e) => {
                    e.target.src = "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-remastered-hero-banner-desktop-01-en-17jun22?$1600px$";
                }}
                alt="Spider-Man"
                className="w-full max-w-[500px] xl:max-w-[750px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] lg:-mr-10 xl:-mr-20 will-change-transform"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', 
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }}
                />
            </div>
          </div>

        </div>
      </main>

      <Features/>
      <AboutSection/>
      <SpiderManSection/>
      <KeyFeatures/>
      <ProductShowcase/>
      <PS5Features/>
      <HeroSection/>
      <GameFranchise />
      <DiscoverMoreGames />
    </div>
  );
};

export default SpiderManPage;