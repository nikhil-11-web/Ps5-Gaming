import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Assets & Data ---
const ASSETS = {
    bgTexture: "https://www.transparenttextures.com/patterns/cubes.png",
    slides: [
        { type: 'image', src: 'public/image/slide-2.webp', title: 'New York City' },

        { type: 'video', src: 'public/video/video-1.mp4', thumbnail: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000', title: 'Symbiote Suit' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1000&auto=format&fit=crop', title: 'Combat System' },
        { type: 'image', src: 'public/image/slide-3.webp', title: 'Web Swinging' },
        { type: 'image', src: 'public/image/slide-5.webp', title: 'Villains' },
        { type: 'video', src: 'public/video/video-2.mp4', thumbnail: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000', title: 'Symbiote Suit' },
        { type: 'image', src: 'public/image/slide4.webp', title: 'Villains' }
    ]
};

const VideoModal = ({ videoSrc, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {

        gsap.fromTo(modalRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );
    }, []);

    if (!videoSrc) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
                onClick={onClose}
            ></div>


            <div ref={modalRef} className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.3)] border border-white/10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors duration-300 backdrop-blur-md"
                >
                    ✕
                </button>
                <video
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                />
            </div>
        </div>
    );
};


const MediaCard = ({ item, onVideoClick }) => {
    const videoRef = useRef(null);


    const handleMouseEnter = () => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="group relative w-[280px] md:w-[450px] aspect-video flex-shrink-0 mx-3 md:mx-4 rounded-xl cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => item.type === 'video' && onVideoClick(item.src)}
        >

            <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] group-hover:border-red-500/50 relative z-10">


                {item.type === 'video' ? (
                    <div className="relative w-full h-full">

                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0"
                        />

                        <video
                            ref={videoRef}
                            src={item.src}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-125 group-hover:bg-red-500">
                                <svg className="w-6 h-6 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                )}


                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition-opacity duration-300 pointer-events-none" />


                <div className="absolute bottom-0 left-0 p-6 w-full z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {item.type === 'video' ? 'Watch Trailer' : 'Gallery'}
                    </p>
                    <h3 className="text-white text-xl font-bold tracking-tight">{item.title}</h3>
                </div>
            </div>
        </div>
    );
};


const AboutSection = () => {
    const sectionRef = useRef(null);
    const marqueeRef = useRef(null);
    const textRef = useRef(null);


    const [activeVideo, setActiveVideo] = useState(null);


    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {

            const textElements = textRef.current.querySelectorAll('.reveal-line');
            gsap.from(textElements, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                },
                y: 80,
                opacity: 0,
                rotateX: -15,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out"
            });


            const tl = gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 40,
                ease: "none",
                repeat: -1,
            });


            const marqueeWrap = marqueeRef.current.parentElement;
            marqueeWrap.addEventListener('mouseenter', () => gsap.to(tl, { timeScale: 0.2, duration: 0.5 }));
            marqueeWrap.addEventListener('mouseleave', () => gsap.to(tl, { timeScale: 1, duration: 0.5 }));

        }, sectionRef);

        return () => ctx.revert();
    }, []);


    const renderItems = [...ASSETS.slides, ...ASSETS.slides, ...ASSETS.slides];

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#050505] overflow-hidden min-h-screen flex flex-col justify-center group"
        >


            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
                style={{
                    background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(30, 64, 175, 0.15), transparent 80%)`
                }}
            />

            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x + 100}px ${mousePos.y + 100}px, rgba(220, 38, 38, 0.08), transparent 60%)`
                }}
            />


            <div className="absolute inset-0 bg-repeat opacity-10 pointer-events-none z-0"
                style={{ backgroundImage: `url(${ASSETS.bgTexture})`, backgroundSize: '120px' }} />


            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />


            <div className="relative z-10 pt-20 md:pt-32 pb-12">


                <div className="mb-20 md:mb-28 relative">
                    {/* Side Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

                    <div className="w-full overflow-hidden py-10">
                        <div ref={marqueeRef} className="flex w-fit items-center">
                            {renderItems.map((item, idx) => (
                                <MediaCard
                                    key={idx}
                                    item={item}
                                    onVideoClick={setActiveVideo}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Text Grid */}
                <div ref={textRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pointer-events-auto">

                    {/* Left: Titles */}
                    <div className="lg:col-span-7">
                        <div className="overflow-hidden mb-4">
                            <div className="reveal-line flex items-center gap-3">
                                <span className="h-[1px] w-12 bg-red-600 inline-block shadow-[0_0_10px_red]"></span>
                                <span className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold">The Experience</span>
                            </div>
                        </div>

                        <h2 className="reveal-line text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-2 drop-shadow-2xl">
                            UNLEASH
                        </h2>
                        <h2 className="reveal-line text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 tracking-tighter leading-[0.9]">
                            GREATNESS.
                        </h2>
                    </div>

                    {/* Right: Description */}
                    <div className="lg:col-span-5 flex flex-col gap-8 pt-4">
                        <div className="reveal-line bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-red-500/30">
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                The city that never sleeps is yours to protect. Experience a brand new story as an experienced Peter Parker, balancing a chaotic personal life with the responsibility of being Marvel's New York’s only hope.
                            </p>
                        </div>

                        <div className="reveal-line flex flex-wrap gap-3 text-xs md:text-sm text-gray-500 font-mono tracking-wider">
                            <span className="border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 hover:text-white transition-colors cursor-default">PS5™ OPTIMIZED</span>
                            <span className="border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 hover:text-white transition-colors cursor-default">HAPTIC FEEDBACK</span>
                            <span className="border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 hover:text-white transition-colors cursor-default">RAY TRACING</span>
                        </div>
                    </div>

                </div>
            </div>


            {activeVideo && (
                <VideoModal
                    videoSrc={activeVideo}
                    onClose={() => setActiveVideo(null)}
                />
            )}

        </section>
    );
};

export default AboutSection;