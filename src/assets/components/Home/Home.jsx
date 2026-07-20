import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Play } from 'lucide-react';

import Mercury from './planets/Mercury';
import Venus from './planets/Venus';
import Earth from './planets/Earth';
import Mars from './planets/Mars';
import Jupiter from './planets/Jupiter';
import Saturn from './planets/Saturn';
import Uranus from './planets/Uranus';
import Neptune from './planets/Neptune';
import Pluto from './planets/Pluto';

const planets = [
  {
    name: 'MERCURY',
    tag: 'THE INNERMOST PLANET',
    description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It experiences extreme temperature fluctuations.',
    Component: Mercury,
  },
  {
    name: 'VENUS',
    tag: 'SISTER TO EARTH',
    description: 'Venus is the second planet from the Sun. It has a thick, toxic atmosphere that traps heat in a runaway greenhouse effect.',
    Component: Venus,
  },
  {
    name: 'EARTH',
    tag: 'OUR HOME PLANET',
    description: "Earth is the third planet from the Sun. Earth's axis of rotation is tilted with respect to its orbital plane, producing seasons on Earth. The gravitational interaction between Earth and the Moon causes tides, stabilizes Earth's orientation on its axis, and gradually slows its rotation.",
    Component: Earth,
  },
  {
    name: 'MARS',
    tag: 'THE RED PLANET',
    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was once wetter and warmer.',
    Component: Mars,
  },
  {
    name: 'JUPITER',
    tag: 'THE GIANT WORLD',
    description: 'Jupiter is more than twice as massive than the other planets of our solar system combined. The Great Red Spot is a centuries-old storm.',
    Component: Jupiter,
  },
  {
    name: 'SATURN',
    tag: 'THE RINGED JEWEL',
    description: 'Saturn is adorned with a dazzling, complex system of icy rings. It is a gas giant and the second-largest planet in our system.',
    Component: Saturn,
  },
  {
    name: 'URANUS',
    tag: 'THE ICE GIANT',
    description: 'Uranus is an ice giant that rotates at an extreme tilt of nearly 98 degrees, making it spin on its side relative to its orbit.',
    Component: Uranus,
  },
  {
    name: 'NEPTUNE',
    tag: 'THE WINDY WORLD',
    description: 'Neptune is the eighth and most distant major planet orbiting our Sun. It is dark, cold, and whipped by supersonic winds.',
    Component: Neptune,
  },
  {
    name: 'PLUTO',
    tag: 'THE DWARF PLANET',
    description: 'Pluto is a complex and mysterious dwarf planet in the Kuiper Belt, featuring glaciers, mountains of water ice, and a blue atmosphere.',
    Component: Pluto,
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to Mercury
  const [isDetailMode, setIsDetailMode] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % planets.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + planets.length) % planets.length);
  };

  const getCircularDiff = (idx, active, total) => {
    let diff = idx - active;
    const half = Math.floor(total / 2);
    while (diff > half) diff -= total;
    while (diff < -half) diff += total;
    return diff;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && !isDetailMode) handleNext();
      if (e.key === 'ArrowLeft' && !isDetailMode) handlePrev();
      if (e.key === 'ArrowDown') setIsDetailMode(true);
      if (e.key === 'ArrowUp') setIsDetailMode(false);
    };

    let lastScrollTime = 0;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 800) return;

      if (e.deltaY > 30 && !isDetailMode) {
        setIsDetailMode(true);
        lastScrollTime = now;
      } else if (e.deltaY < -30 && isDetailMode) {
        setIsDetailMode(false);
        lastScrollTime = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isDetailMode, activeIndex]);

  // Planet placement variants - using absolute pixel values (numbers) for 'bottom' key to ensure Framer Motion
  // executes a perfectly smooth interpolation without unit mixing issues (like string vs percentage)
  const planetVariants = {
    active: {
      x: '-50%',
      left: '50%',
      bottom: -140,
      scale: 3.4,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1) blur(0px)',
    },
    leftPreview: {
      x: '-50%',
      left: '16%',
      bottom: 100,
      scale: 0.8,
      opacity: 0.45,
      zIndex: 20,
      filter: 'brightness(0.65) blur(0.5px)',
    },
    rightPreview: {
      x: '-50%',
      left: '84%',
      bottom: 100,
      scale: 0.8,
      opacity: 0.45,
      zIndex: 20,
      filter: 'brightness(0.65) blur(0.5px)',
    },
    leftOut: {
      x: '-50%',
      left: '50%',
      bottom: 360,
      scale: 0.15,
      opacity: 0,
      zIndex: 5,
      filter: 'brightness(0.2) blur(3px)',
    },
    rightOut: {
      x: '-50%',
      left: '50%',
      bottom: 360,
      scale: 0.15,
      opacity: 0,
      zIndex: 5,
      filter: 'brightness(0.2) blur(3px)',
    },
    detail: {
      x: '-50%',
      left: '70%',
      bottom: 180, // Pixel offset matches ~22% on standard viewports, vertically centered with left text
      scale: 2.6,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1) blur(0px)',
    },
    hiddenOutLeft: {
      x: '-50%',
      left: '-20%',
      bottom: 100,
      scale: 0.1,
      opacity: 0,
      zIndex: 0,
      filter: 'brightness(0) blur(5px)',
    },
    hiddenOutRight: {
      x: '-50%',
      left: '120%',
      bottom: 100,
      scale: 0.1,
      opacity: 0,
      zIndex: 0,
      filter: 'brightness(0) blur(5px)',
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative w-full h-[calc(100vh-82px)] overflow-hidden bg-[#050510]">
      {/* Background space elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,16,35,0.4)_0%,rgba(5,5,16,1)_80%)] z-0" />
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')] opacity-30 z-0" />

      {/* Back to Browser Button (Detail Mode Only) */}
      <AnimatePresence>
        {isDetailMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-8 z-50 pointer-events-auto"
          >
            <button
              onClick={() => setIsDetailMode(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer text-sm font-semibold"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Back to Selection</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-40 pointer-events-none select-none">
        <AnimatePresence mode="wait">
          {!isDetailMode ? (
            /* ──────── CAROUSEL MODE CONTENT ──────── */
            <motion.div
              key="carousel-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="max-w-xl text-center px-6 mb-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex flex-col items-center"
                  >
                    <motion.span
                      variants={textVariants}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="text-cyan-400 font-mono tracking-[0.4em] text-sm uppercase font-bold mb-3"
                    >
                      {planets[activeIndex].tag}
                    </motion.span>
                    <motion.h1
                      variants={textVariants}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-6xl md:text-8xl font-black tracking-wider mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400"
                    >
                      {planets[activeIndex].name}
                    </motion.h1>
                    <motion.p
                      variants={textVariants}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md font-sans"
                    >
                      {planets[activeIndex].description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Get Started Button */}
              <div className="flex flex-col items-center gap-3 pointer-events-auto mt-2">
                <button
                  onClick={() => setIsDetailMode(true)}
                  className="px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Get Started
                </button>
                <div 
                  onClick={() => setIsDetailMode(true)}
                  className="flex flex-col items-center text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-xs uppercase tracking-widest font-bold mt-2 animate-bounce"
                >
                  <span className="mb-1">Scroll Down to Explore</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ) : (
            /* ──────── DETAIL MODE CONTENT ──────── */
            <motion.div
              key="detail-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-start pl-12 md:pl-24 max-w-2xl"
            >
              <div className="flex flex-col items-start text-left pointer-events-auto">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-cyan-400 font-mono tracking-[0.4em] text-sm uppercase font-bold mb-2"
                >
                  {planets[activeIndex].tag}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-7xl md:text-9xl font-serif tracking-wide mb-6 text-white font-light uppercase"
                >
                  {planets[activeIndex].name}
                </motion.h1>

                {/* Divider Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 72 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-0.75 bg-cyan-400 mb-6 shadow-[0_0_8px_#22d3ee]"
                />

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md font-sans mb-8"
                >
                  {planets[activeIndex].description}
                </motion.p>

                {/* Action Buttons Row */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <button className="px-8 py-3.5 rounded-full bg-slate-100 hover:bg-white text-black font-bold uppercase tracking-widest text-sm shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer">
                    Learn More
                  </button>
                  <button className="p-3.5 rounded-full bg-slate-900/60 border border-slate-700 hover:border-cyan-400 text-white hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Navigation Arrows (Carousel Mode Only) */}
      <AnimatePresence>
        {!isDetailMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between items-center z-50 pointer-events-none"
          >
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-slate-900/40 border border-slate-800 text-white hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-slate-900/40 border border-slate-800 text-white hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbital Sliders Track Container */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {planets.map((planet, idx) => {
          const { Component } = planet;
          let variant = 'rightOut';

          if (isDetailMode) {
            variant = idx === activeIndex ? 'detail' : (idx < activeIndex ? 'hiddenOutLeft' : 'hiddenOutRight');
          } else {
            const diff = getCircularDiff(idx, activeIndex, planets.length);
            if (diff === 0) variant = 'active';
            else if (diff === -1) variant = 'leftPreview';
            else if (diff === 1) variant = 'rightPreview';
            else if (diff < -1) variant = 'leftOut';
            else if (diff > 1) variant = 'rightOut';
          }

          return (
            <motion.div
              key={planet.name}
              initial={variant}
              animate={variant}
              variants={planetVariants}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 22,
                mass: 0.9,
              }}
              className="absolute cursor-pointer pointer-events-auto"
              onClick={() => {
                if (!isDetailMode) {
                  setActiveIndex(idx);
                }
              }}
            >
              <Component />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;