import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is covered mostly in liquid water.',
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
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const planetVariants = {
    active: {
      x: '-50%',
      left: '50%',
      bottom: '-140px',
      scale: 3.4,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1) blur(0px)',
    },
    leftPreview: {
      x: '-50%',
      left: '16%',
      bottom: '100px',
      scale: 0.8,
      opacity: 0.45,
      zIndex: 20,
      filter: 'brightness(0.65) blur(0.5px)',
    },
    rightPreview: {
      x: '-50%',
      left: '84%',
      bottom: '100px',
      scale: 0.8,
      opacity: 0.45,
      zIndex: 20,
      filter: 'brightness(0.65) blur(0.5px)',
    },
    leftOut: {
      x: '-50%',
      left: '50%',
      bottom: '360px',
      scale: 0.15,
      opacity: 0,
      zIndex: 5,
      filter: 'brightness(0.2) blur(3px)',
    },
    rightOut: {
      x: '-50%',
      left: '50%',
      bottom: '360px',
      scale: 0.15,
      opacity: 0,
      zIndex: 5,
      filter: 'brightness(0.2) blur(3px)',
    },
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

      {/* Central Content Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none select-none">
        {/* Animated Details (Fade & Shift) */}
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

        {/* Static Anchor: GET STARTED Button */}
        <div className="pointer-events-auto">
          <button className="px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </div>

      {/* Interactive Navigation Arrows */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between items-center z-50 pointer-events-none">
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
      </div>

      {/* Orbital Sliders Track Container */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {planets.map((planet, idx) => {
          const { Component } = planet;
          let variant = 'rightOut';
          const diff = getCircularDiff(idx, activeIndex, planets.length);

          if (diff === 0) variant = 'active';
          else if (diff === -1) variant = 'leftPreview';
          else if (diff === 1) variant = 'rightPreview';
          else if (diff < -1) variant = 'leftOut';
          else if (diff > 1) variant = 'rightOut';

          return (
            <motion.div
              key={planet.name}
              initial={variant}
              animate={variant}
              variants={planetVariants}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 20,
                mass: 0.8,
              }}
              className="absolute cursor-pointer pointer-events-auto"
              onClick={() => setActiveIndex(idx)}
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