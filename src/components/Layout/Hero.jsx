import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFish } from 'react-icons/fa'; 
import heroImg from "../../assets/Hero_img.png";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[600px] lg:h-[85vh] flex flex-col md:flex-row overflow-hidden bg-white"
    >
      
      {/* Left Half - Image Section with Parallax & Magic */}
      <div className={`w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>
        
        {/* Sepia & Color Grade Overlay */}
        <div className="absolute inset-0 bg-amber-900/10 z-10 pointer-events-none mix-blend-sepia"></div> 

        {/* Floating Particles (Dust Motes) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
             {[...Array(5)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-white rounded-full opacity-60 animate-float"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 10}s`
                    }}
                />
             ))}
        </div>

        <img
          src={heroImg}
          alt="Toddler reaching for curtain"
          className="w-full h-full object-cover object-top transition-transform duration-100 ease-out"
          style={{ 
              transform: `scale(1.1) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`, // Parallax effect
          }}
        />
      </div>

      {/* Right Half - Content Section */}
      <div className="w-full md:w-1/2 h-auto md:h-full flex items-center justify-center p-8 md:p-12 lg:p-16 relative bg-white">
        
        {/* Animated Fish Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
             {[...Array(12)].map((_, i) => (
                <FaFish 
                    key={i} 
                    className="absolute text-gray-800 animate-swim"
                    style={{
                        top: `${(i * 11) % 90 + 5}%`,
                        left: `-20%`,
                        fontSize: `${60 + (i % 5) * 15}px`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${12 + (i % 6) * 3}s`
                    }}
                />
             ))}
        </div>

        <div className="max-w-xl relative z-10 flex flex-col items-start text-left">
          
          {/* Headline */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase text-gray-900 leading-[0.9] mb-6 transform transition-all duration-1000 delay-300 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            Learning Kids <br/> Are Great <br/> Imitators
            <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600">
                Give them something great to imagine
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-base md:text-lg text-gray-600 font-medium mb-10 max-w-md transform transition-all duration-1000 delay-700 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
             Unlock your child's potential with our curated collection of educational toys and games designed to inspire creativity.
          </p>

          {/* CTA Button */}
          <div 
            className={`transform transition-all duration-1000 delay-1000 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <Link
                to="/collections/all"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gray-950 text-white text-sm md:text-base font-bold tracking-wider uppercase overflow-hidden shadow-lg transition-all hover:bg-blue-600 hover:shadow-blue-500/30 hover:scale-105 active:scale-95 animate-pulse-slow"
            >
                <span className="relative z-10">Shop Now</span>
            </Link>
          </div>

        </div>
      </div>

      {/* CSS Styles for Custom Animations */}
      <style>{`
        @keyframes swim {
            0% { transform: translateX(-50px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(110vw) rotate(5deg); opacity: 0; }
        }
        .animate-swim {
            animation: swim linear infinite;
        }
        @keyframes slowZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        @keyframes pulse-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            20% { opacity: 0.6; }
            50% { transform: translateY(-20px) translateX(10px); }
            80% { opacity: 0.6; }
            100% { transform: translateY(-40px) translateX(-10px); opacity: 0; }
        }
        .animate-float {
            animation: float linear infinite;
        }
      `}</style>

    </section>
  );
};

export default Hero;