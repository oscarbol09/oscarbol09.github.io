import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const EyeTrackerMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [speechBubbleText, setSpeechBubbleText] = useState('¡Hola! Sigo tu cursor 👀');
  const [bubbleVisible, setBubbleVisible] = useState(false);

  const { playClick, playSuccess } = useSoundEffects();

  // Eye position offsets
  const mouseXMotion = useMotionValue(0);
  const mouseYMotion = useMotionValue(0);

  // Springs for smooth, organic eye movement
  const springX = useSpring(mouseXMotion, { stiffness: 420, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseYMotion, { stiffness: 420, damping: 28, mass: 0.5 });

  // Head tilt based on mouse position
  const headRotateX = useTransform(springY, [-12, 12], ['8deg', '-8deg']);
  const headRotateY = useTransform(springX, [-12, 12], ['-10deg', '10deg']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxEyeRadius = 9; // maximum pupil offset in px

      if (dist === 0) {
        mouseXMotion.set(0);
        mouseYMotion.set(0);
      } else {
        const angle = Math.atan2(dy, dx);
        const clampedDist = Math.min(dist * 0.035, maxEyeRadius);
        mouseXMotion.set(Math.cos(angle) * clampedDist);
        mouseYMotion.set(Math.sin(angle) * clampedDist);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseXMotion, mouseYMotion]);

  // Periodic random blinking
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      const nextInterval = 2500 + Math.random() * 4000;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, nextInterval);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Click reaction
  const handleMascotClick = () => {
    playSuccess();
    setIsHappy(true);
    setSpeechBubbleText('¡Que genial explorar el portafolio! 🚀');
    setBubbleVisible(true);

    setTimeout(() => {
      setIsHappy(false);
    }, 1800);

    setTimeout(() => {
      setBubbleVisible(false);
    }, 3500);
  };

  const handleGlobalClick = () => {
    // Quick micro-reaction to any click
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 300);
  };

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none flex flex-col items-center justify-center [perspective:800px] ${className}`}
      onMouseEnter={() => {
        playClick();
        setSpeechBubbleText('¡Darius AI Companion en línea! ✨');
        setBubbleVisible(true);
      }}
      onMouseLeave={() => setBubbleVisible(false)}
      onClick={handleMascotClick}
    >
      {/* Interactive Speech Bubble Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{
          opacity: bubbleVisible ? 1 : 0,
          y: bubbleVisible ? -8 : 10,
          scale: bubbleVisible ? 1 : 0.9,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="pointer-events-none absolute -top-12 z-30 whitespace-nowrap rounded-full border border-cyan-500/30 bg-[#090912]/95 px-3 py-1 font-mono text-[11px] text-cyan-300 shadow-lg backdrop-blur-md"
      >
        <span>{speechBubbleText}</span>
        <div className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-cyan-500/30 bg-[#090912]" />
      </motion.div>

      {/* Main Mascot Floating Head with 3D Tilt */}
      <motion.div
        style={{
          rotateX: headRotateX,
          rotateY: headRotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
        className="group relative flex h-24 w-28 cursor-pointer items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-b from-[#131320] to-[#08080f] p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-glow-cyan"
      >
        {/* Antenna Ears Left & Right */}
        <div className="absolute -top-3 left-4 h-4 w-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#06b6d4]" />
        <div className="absolute -top-3 right-4 h-4 w-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#06b6d4]" />

        {/* Visor Screen */}
        <div className="relative flex h-14 w-22 items-center justify-around rounded-2xl border border-cyan-500/20 bg-[#040408] px-3 py-1 shadow-inner">
          {/* Subtle Screen Scanline Highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/10 to-transparent" />

          {/* Left Eye */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 overflow-hidden shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            {isHappy ? (
              /* Happy squinting eye arc */
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="h-3 w-5 border-t-3 border-cyan-300 rounded-t-full"
              />
            ) : isBlinking ? (
              /* Blink closed eyelid line */
              <div className="h-0.5 w-5 bg-cyan-300 rounded-full" />
            ) : (
              /* Pupil that tracks the cursor */
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                }}
                className="relative flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              >
                {/* Pupil Light Reflection */}
                <div className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-white" />
              </motion.div>
            )}
          </div>

          {/* Right Eye */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 overflow-hidden shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            {isHappy ? (
              /* Happy squinting eye arc */
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="h-3 w-5 border-t-3 border-cyan-300 rounded-t-full"
              />
            ) : isBlinking ? (
              /* Blink closed eyelid line */
              <div className="h-0.5 w-5 bg-cyan-300 rounded-full" />
            ) : (
              /* Pupil that tracks the cursor */
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                }}
                className="relative flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              >
                {/* Pupil Light Reflection */}
                <div className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-white" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Mascot Mini Telemetry Badge */}
        <div className="absolute -bottom-2 flex items-center gap-1 rounded-full border border-cyan-500/40 bg-[#07070d] px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-300 shadow-md">
          <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
          <span>DARIUS BOT</span>
        </div>
      </motion.div>
    </div>
  );
};
