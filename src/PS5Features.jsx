import React, { useLayoutEffect, useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const featuresList = [
  { title: "Stunning visuals", description: "Experience the critically acclaimed hit with updated graphical assets and in stunning dynamic 4K/HDR." },
  { title: "Fast loading", description: "Fast loading with the PS5 console's ultra-high-speed SSD gets you back into Marvel's New York quicker than ever before." },
  { title: "Adaptive triggers", description: "Feel Spider-Man's webs in your hands with the DualSense™ controller's adaptive triggers." },
  { title: "Haptic feedback", description: "Feel all of Spider-Man's gadgets and arsenal with haptic feedback that brings incredible immersion." },
  { title: "Tempest 3D AudioTech", description: "Hear Marvel's Spider-Man with 3D spatial audio. Notice sounds you didn't catch the first time around." }
];

// --- 3D Component using Standard Mesh (Most Stable) ---
const StableImagePlane = ({ imageUrl }) => {
  const meshRef = useRef();
  
  // 1. Load the texture securely
  const texture = useLoader(TextureLoader, imageUrl);

  // 2. Continuous Animation Loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle bobbing
      meshRef.current.position.y = Math.sin(t / 1.5) * 0.1; 
      // Gentle twist
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.05;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={meshRef} scale={[3.5, 5, 1]}>
          {/* PlaneGeometry: Width, Height */}
          <planeGeometry args={[1, 1]} />
          {/* MeshBasicMaterial: Simplest material, no lighting bugs */}
          <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      {/* Ground Shadow */}
      <ContactShadows 
        position={[0, -2.6, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4.5} 
        color="#000000"
      />
    </group>
  );
};

const PS5Features = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // --- TEST MODE ---
  // Step 1: Does this internet image work? 
  // If YES -> The code is good, your local path is the problem.
  // If NO -> The 3D Canvas is the problem.
  // const ps5ImageUrl = "https://placehold.co/600x800/transparent/white.png?text=PS5+Test";
  
  // Step 2: Once Step 1 works, swap to your local path:
  const ps5ImageUrl = "/image/game-tool.webp"; 

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Only animate TEXT. Do not animate the Canvas container to avoid hiding it.
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full py-20 lg:py-32 overflow-hidden relative font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* --- 3D CANVAS CONTAINER --- */}
          {/* Added explicit height style to force browser to render it */}
          <div className="w-full relative z-10 order-2 lg:order-1 h-[500px] lg:h-[700px]" style={{ minHeight: '500px' }}>
            
            <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-400">Loading 3D Model...</div>}>
              {/* Added 'resize' prop to prevent canvas collapse */}
              <Canvas 
                camera={{ position: [0, 0, 8], fov: 40 }} 
                resize={{ scroll: false }}
                style={{ width: '100%', height: '100%' }}
              >
                <ambientLight intensity={1} />
                <Environment preset="studio" />
                <StableImagePlane imageUrl={ps5ImageUrl} />
              </Canvas>
            </Suspense>

          </div>

          {/* --- CONTENT --- */}
          <div ref={contentRef} className="flex flex-col gap-8 order-1 lg:order-2">
            <div>
              <h2 className="text-4xl lg:text-5xl font-light text-black tracking-tight mb-2">
                PS5™ features
              </h2>
              <div className="w-16 h-1 bg-[#0070d1] mt-2"></div>
            </div>

            <ul className="space-y-6">
              {featuresList.map((item, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="mt-2 w-2 h-2 bg-[#0070d1] flex-shrink-0 rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
                  <p className="text-[#333333] leading-relaxed text-[15px] lg:text-[17px] font-light">
                    <strong className="font-bold text-black block mb-1">
                      {item.title}
                    </strong>
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button className="bg-[#0070d1] hover:bg-[#005fa3] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-1 text-xs md:text-sm tracking-widest uppercase">
                Find out more about PS5
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PS5Features;