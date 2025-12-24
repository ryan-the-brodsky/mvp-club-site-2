import React, { useState, useEffect, useRef } from 'react';

// Helper to get CSS variable value
const getCssVar = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const AnimatedValley = () => {
  // Track theme changes
  const [themeColors, setThemeColors] = useState({
    primary: '#1a365d',
    primaryLifted: '#4a6fa5',
    secondary: '#115e59',
    secondaryLifted: '#2d8a84',
    accent: '#d97706',
    accentLifted: '#fbbf24',
    accentSoft: '#f87171',
  });

  // Update colors when CSS variables change
  useEffect(() => {
    const updateColors = () => {
      setThemeColors({
        primary: getCssVar('--color-primary') || '#1a365d',
        primaryLifted: getCssVar('--color-primary-lifted') || '#4a6fa5',
        secondary: getCssVar('--color-secondary') || '#115e59',
        secondaryLifted: getCssVar('--color-secondary-lifted') || '#2d8a84',
        accent: getCssVar('--color-accent') || '#d97706',
        accentLifted: getCssVar('--color-accent-lifted') || '#fbbf24',
        accentSoft: getCssVar('--color-accent-soft') || '#f87171',
      });
    };

    // Initial update
    updateColors();

    // Watch for style changes on documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);
  const [phase, setPhase] = useState(-1); // -1 means not started
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive font sizes for SVG (larger on mobile for readability)
  const fontSize = {
    label: isMobile ? 14 : 10,
    labelLarge: isMobile ? 16 : 11,
    axis: isMobile ? 14 : 11,
    button: isMobile ? 24 : 16,
    coach: isMobile ? 20 : 16,
    coachSmall: isMobile ? 16 : 14,
    coachTiny: isMobile ? 14 : 12,
  };

  // Responsive button dimensions (much larger on mobile)
  const buttonDims = {
    width: isMobile ? 340 : 240,
    height: isMobile ? 80 : 60,
    x: isMobile ? 230 : 280,
    yInitial: isMobile ? 160 : 170,
    yReplay: isMobile ? 350 : 360,
    rx: isMobile ? 16 : 12,
    // Play icon triangle points
    iconX: isMobile ? 260 : 305,
    iconSize: isMobile ? 30 : 20,
    // Text position
    textX: isMobile ? 400 : 345,
  };

  const phases = [
    { name: "The Journey Begins", duration: 2000 },
    { name: "The Valley", duration: 2000 },
    { name: "Without Coaching...", duration: 2500 },
    { name: "But With Coaching...", duration: 2000 },
    { name: "First Win", duration: 1800 },
    { name: "Second Setback", duration: 1800 },
    { name: "Coaching Again", duration: 1800 },
    { name: "Building Momentum", duration: 1800 },
    { name: "Another Wobble", duration: 1800 },
    { name: "Coaching Support", duration: 1800 },
    { name: "Self-Sustaining", duration: 0 },
  ];

  // Intersection observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    setPhase(0);
    setIsPlaying(true);
    setHasPlayed(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (phase >= phases.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setPhase(p => p + 1);
    }, phases[phase].duration);

    return () => clearTimeout(timer);
  }, [phase, isPlaying]);

  // Journey points with coaching at each dip
  const points = {
    start: { x: 80, y: 120 },
    valley1: { x: 240, y: 300 },
    win1: { x: 360, y: 180 },
    dip2: { x: 440, y: 250 },
    win2: { x: 520, y: 160 },
    dip3: { x: 580, y: 200 },
    fluency: { x: 650, y: 130 },
    mastery: { x: 720, y: 80 },
  };

  // Path segments
  const pathToValley = `M ${points.start.x} ${points.start.y} C 140 120, 180 200, ${points.valley1.x} ${points.valley1.y}`;
  const quitPath = `M ${points.valley1.x} ${points.valley1.y} C 280 340, 340 370, 440 385`;
  
  const pathValleyToWin1 = `M ${points.valley1.x} ${points.valley1.y} C 280 280, 320 200, ${points.win1.x} ${points.win1.y}`;
  const pathWin1ToDip2 = `M ${points.win1.x} ${points.win1.y} C 390 200, 420 240, ${points.dip2.x} ${points.dip2.y}`;
  const pathDip2ToWin2 = `M ${points.dip2.x} ${points.dip2.y} C 470 240, 500 170, ${points.win2.x} ${points.win2.y}`;
  const pathWin2ToDip3 = `M ${points.win2.x} ${points.win2.y} C 540 170, 560 190, ${points.dip3.x} ${points.dip3.y}`;
  const pathDip3ToFluency = `M ${points.dip3.x} ${points.dip3.y} C 600 190, 630 145, ${points.fluency.x} ${points.fluency.y}`;
  const pathFluencyToMastery = `M ${points.fluency.x} ${points.fluency.y} C 680 120, 700 95, ${points.mastery.x} ${points.mastery.y}`;

  // Dark background matching hero section
  const sectionBg = 'var(--color-primary)';

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-16"
      style={{ backgroundColor: sectionBg }}
    >
      <style>{`
        @keyframes drawPath {
          from { stroke-dashoffset: 500; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes flyIn {
          0% { transform: translate(-30px, -30px) scale(0); opacity: 0; }
          70% { transform: translate(3px, 3px) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }

        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .valley-path-draw {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: drawPath 1.2s ease-out forwards;
        }

        .valley-quit-path {
          stroke-dasharray: 8 6;
          animation: dash 1s linear infinite;
        }

        .valley-coach-fly-in {
          animation: flyIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .valley-pop-in {
          animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .valley-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        .valley-fade-out {
          animation: fadeOut 0.5s ease forwards;
        }
      `}</style>
      
      <div 
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <p
            className="text-lg font-semibold uppercase tracking-wider mb-4"
            style={{ color: themeColors.accentLifted }}
          >
            The Adoption Paradox
          </p>
          <h2
            className="font-display text-3xl md:text-4xl leading-tight text-white"
          >
            Why Most People Quit—And How Coaching Changes That
          </h2>
        </div>

        {/* The Chicken-Egg Problem */}
        <div
          className="rounded-2xl p-8 mb-8 bg-white"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          {/* Desktop: horizontal layout with right arrows */}
          <div className="hidden md:flex justify-center items-center gap-5 mb-6">
            <div className="p-5 rounded-xl text-center bg-gray-50">
              <div className="text-gray-700 text-lg leading-relaxed">
                To <strong style={{ color: themeColors.secondary }}>see the value</strong><br />
                you need to be good at it
              </div>
            </div>
            <div className="text-4xl" style={{ color: themeColors.secondary }}>→</div>
            <div className="p-5 rounded-xl text-center bg-gray-50">
              <div className="text-gray-700 text-lg leading-relaxed">
                To <strong style={{ color: themeColors.secondary }}>get good</strong><br />
                you need to practice
              </div>
            </div>
            <div className="text-4xl" style={{ color: themeColors.secondary }}>→</div>
            <div className="p-5 rounded-xl text-center bg-gray-50">
              <div className="text-gray-700 text-lg leading-relaxed">
                To <strong style={{ color: themeColors.secondary }}>keep practicing</strong><br />
                you need to see the value
              </div>
            </div>
          </div>

          {/* Mobile: vertical layout with down arrows */}
          <div className="flex md:hidden flex-col items-center gap-3 mb-6">
            <div className="p-5 rounded-xl text-center bg-gray-50 w-full max-w-sm">
              <div className="text-gray-700 text-lg leading-relaxed">
                To <strong style={{ color: themeColors.secondary }}>see the value</strong><br />
                you need to be good at it
              </div>
            </div>
            <div className="text-3xl" style={{ color: themeColors.secondary }}>↓</div>
            <div className="p-5 rounded-xl text-center bg-gray-50 w-full max-w-sm">
              <div className="text-gray-700 text-lg leading-relaxed">
                To <strong style={{ color: themeColors.secondary }}>get good</strong><br />
                you need to practice
              </div>
            </div>
            <div className="text-3xl" style={{ color: themeColors.secondary }}>↓</div>
            <div className="p-5 rounded-xl text-center bg-gray-50 w-full max-w-sm">
              <div className="text-gray-700 text-lg leading-relaxed">
                To <strong style={{ color: themeColors.secondary }}>keep practicing</strong><br />
                you need to see the value
              </div>
            </div>
            <div className="text-3xl" style={{ color: themeColors.secondary }}>↺</div>
          </div>
          <div className="w-32 h-1 mb-6 rounded-full mx-auto" style={{ backgroundColor: themeColors.accent }}></div>
          <div className="text-center px-4">
            <span className="text-2xl font-semibold leading-tight" style={{ color: themeColors.primary }}>
              You can't see the value until you're already good.
            </span>
            <span className="text-gray-500 ml-2 text-xl">So people rationally quit.</span>
          </div>
        </div>

        {/* Main visualization */}
        <div
          className="rounded-2xl p-6 md:p-10 bg-white relative"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          {/* Phase indicator - only show during animation */}
          {isPlaying && phase >= 0 && (
            <div className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div
                className="px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
              >
                <div className="text-base md:text-sm font-semibold whitespace-nowrap" style={{ color: themeColors.primary }}>
                  {phases[phase].name}
                </div>
              </div>
            </div>
          )}

          <svg viewBox="0 0 800 420" className="w-full h-auto">
            <defs>
              <linearGradient id="startGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={themeColors.accentLifted} />
                <stop offset="100%" stopColor={themeColors.accent} />
              </linearGradient>
              <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={themeColors.secondary} />
                <stop offset="50%" stopColor={themeColors.secondaryLifted} />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id="quitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            {[...Array(9)].map((_, i) => (
              <line
                key={i}
                x1="40" y1={50 + i * 42}
                x2="780" y2={50 + i * 42}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Axis label - rotated MOTIVATION on the left */}
            <text
              x="10"
              y="210"
              fill="#9ca3af"
              fontSize={fontSize.axis}
              fontFamily="system-ui"
              fontWeight="600"
              textAnchor="middle"
              transform="rotate(-90, 10, 210)"
            >
              MOTIVATION
            </text>

            {/* Valley zone - visible phases 1-3, fades after */}
            {phase >= 1 && phase <= 3 && (
              <g className={phase === 3 ? 'valley-fade-out' : 'valley-fade-in'}>
                <rect 
                  x="190" y="260" 
                  width="100" height="90" 
                  rx="8" 
                  fill="#ef4444" 
                  fillOpacity="0.1"
                  stroke="#ef4444"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                />
                <text
                  x="240" y="340"
                  fill="#f87171"
                  fontSize={fontSize.label}
                  fontFamily="system-ui"
                  textAnchor="middle"
                >
                  THE VALLEY
                </text>
              </g>
            )}

            {/* Phase 0+: Initial descent path */}
            {phase >= 0 && (
              <path
                d={pathToValley}
                fill="none"
                stroke="url(#startGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
              />
            )}

            {/* Start point */}
            {phase >= 0 && (
              <g className="valley-fade-in">
                <circle cx={points.start.x} cy={points.start.y} r="12" fill={themeColors.accentLifted} filter="url(#glow)" />
                <circle cx={points.start.x} cy={points.start.y} r="5" fill={themeColors.primary} />
                <text x={points.start.x} y={points.start.y - 20} fill={themeColors.primary} fontSize={fontSize.label} fontWeight="600" textAnchor="middle">
                  Initial Excitement
                </text>
              </g>
            )}

            {/* Valley point */}
            {phase >= 1 && (
              <g className="valley-fade-in">
                <circle 
                  cx={points.valley1.x} 
                  cy={points.valley1.y} 
                  r="12" 
                  fill="#ef4444"
                  style={{ 
                    opacity: phase >= 4 ? 0.4 : 1,
                    transition: 'opacity 0.5s ease'
                  }}
                />
                <circle 
                  cx={points.valley1.x} 
                  cy={points.valley1.y} 
                  r="5" 
                  fill="#ffffff"
                  style={{ opacity: phase >= 4 ? 0.4 : 1, transition: 'opacity 0.5s ease' }}
                />
              </g>
            )}

            {/* Quit path - only phases 2-3, then fades */}
            {phase >= 2 && phase <= 3 && (
              <g className={phase === 3 ? 'valley-fade-out' : 'valley-fade-in'}>
                <path
                  d={quitPath}
                  fill="none"
                  stroke="url(#quitGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="valley-quit-path"
                />
                <text x="450" y="398" fill="#ef4444" fontSize={fontSize.labelLarge} fontWeight="500">
                  Without coaching: quit
                </text>
                <text x="450" y="414" fill="#94a3b8" fontSize={fontSize.label}>
                  "It's faster to just do it myself"
                </text>
              </g>
            )}

            {/* Coaching marker 1 at valley */}
            {phase >= 3 && (
              <g className={phase === 3 ? 'valley-coach-fly-in' : ''}>
                <circle
                  cx={points.valley1.x}
                  cy={points.valley1.y - 45}
                  r="22"
                  fill={themeColors.secondary}
                  filter="url(#glow)"
                />
                <text
                  x={points.valley1.x}
                  y={points.valley1.y - 39}
                  fill={themeColors.accentLifted}
                  fontSize={fontSize.coach}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  C
                </text>
              </g>
            )}

            {/* Path: Valley to First Win */}
            {phase >= 4 && (
              <path
                d={pathValleyToWin1}
                fill="none"
                stroke="url(#successGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
              />
            )}

            {/* First Win point */}
            {phase >= 4 && (
              <g className="valley-pop-in">
                <circle cx={points.win1.x} cy={points.win1.y} r="12" fill="#22c55e" filter="url(#glow)" />
                <circle cx={points.win1.x} cy={points.win1.y} r="5" fill="#ffffff" />
                <text x={points.win1.x} y={points.win1.y - 20} fill="#16a34a" fontSize={fontSize.label} fontWeight="600" textAnchor="middle">
                  First Win
                </text>
              </g>
            )}

            {/* Path: First Win to Dip 2 */}
            {phase >= 5 && (
              <path
                d={pathWin1ToDip2}
                fill="none"
                stroke="url(#successGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
              />
            )}

            {/* Dip 2 point */}
            {phase >= 5 && (
              <g className="valley-pop-in">
                <circle cx={points.dip2.x} cy={points.dip2.y} r="10" fill={themeColors.accent} />
                <circle cx={points.dip2.x} cy={points.dip2.y} r="4" fill="#ffffff" />
              </g>
            )}

            {/* Coaching marker 2 at dip 2 */}
            {phase >= 6 && (
              <g className={phase === 6 ? 'valley-coach-fly-in' : ''}>
                <circle
                  cx={points.dip2.x}
                  cy={points.dip2.y - 35}
                  r="18"
                  fill={themeColors.secondary}
                  filter="url(#glow)"
                />
                <text
                  x={points.dip2.x}
                  y={points.dip2.y - 30}
                  fill={themeColors.accentLifted}
                  fontSize={fontSize.coachSmall}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  C
                </text>
              </g>
            )}

            {/* Path: Dip 2 to Win 2 */}
            {phase >= 7 && (
              <path
                d={pathDip2ToWin2}
                fill="none"
                stroke="url(#successGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
              />
            )}

            {/* Win 2 point */}
            {phase >= 7 && (
              <g className="valley-pop-in">
                <circle cx={points.win2.x} cy={points.win2.y} r="12" fill="#22c55e" filter="url(#glow)" />
                <circle cx={points.win2.x} cy={points.win2.y} r="5" fill="#ffffff" />
              </g>
            )}

            {/* Path: Win 2 to Dip 3 */}
            {phase >= 8 && (
              <path
                d={pathWin2ToDip3}
                fill="none"
                stroke="url(#successGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
              />
            )}

            {/* Dip 3 point */}
            {phase >= 8 && (
              <g className="valley-pop-in">
                <circle cx={points.dip3.x} cy={points.dip3.y} r="9" fill={themeColors.accent} />
                <circle cx={points.dip3.x} cy={points.dip3.y} r="4" fill="#ffffff" />
              </g>
            )}

            {/* Coaching marker 3 at dip 3 (smaller) */}
            {phase >= 9 && (
              <g className={phase === 9 ? 'valley-coach-fly-in' : ''}>
                <circle
                  cx={points.dip3.x}
                  cy={points.dip3.y - 30}
                  r="14"
                  fill={themeColors.secondary}
                  filter="url(#glow)"
                  opacity="0.85"
                />
                <text
                  x={points.dip3.x}
                  y={points.dip3.y - 25}
                  fill={themeColors.accentLifted}
                  fontSize={fontSize.coachTiny}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  C
                </text>
              </g>
            )}

            {/* Path: Dip 3 to Fluency */}
            {phase >= 10 && (
              <path
                d={pathDip3ToFluency}
                fill="none"
                stroke="url(#successGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
              />
            )}

            {/* Fluency point */}
            {phase >= 10 && (
              <g className="valley-pop-in">
                <circle cx={points.fluency.x} cy={points.fluency.y} r="12" fill={themeColors.secondaryLifted} filter="url(#glow)" />
                <circle cx={points.fluency.x} cy={points.fluency.y} r="5" fill="#ffffff" />
                <text x={points.fluency.x} y={points.fluency.y - 20} fill={themeColors.secondary} fontSize={fontSize.label} fontWeight="600" textAnchor="middle">
                  Fluency
                </text>
              </g>
            )}

            {/* Path: Fluency to Mastery */}
            {phase >= 10 && (
              <path
                d={pathFluencyToMastery}
                fill="none"
                stroke="url(#successGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="valley-path-draw"
                style={{ animationDelay: '0.8s' }}
              />
            )}

            {/* AI-First Mastery point */}
            {phase >= 10 && (
              <g className="valley-pop-in" style={{ animationDelay: '1s' }}>
                <circle cx={points.mastery.x} cy={points.mastery.y} r="16" fill="#22c55e" filter="url(#glowStrong)" />
                <circle cx={points.mastery.x} cy={points.mastery.y} r="6" fill="#ffffff" />
                <text x={points.mastery.x} y={points.mastery.y - 25} fill={themeColors.primary} fontSize={fontSize.labelLarge} fontWeight="700" textAnchor="middle">
                  AI-First Mindset
                </text>
                <text x={points.mastery.x} y={points.mastery.y + 35} fill="#16a34a" fontSize={fontSize.label} textAnchor="middle">
                  Self-sustaining
                </text>
              </g>
            )}

            {/* Play Button - centered initially, bottom for replay */}
            {!isPlaying && (
              <g className="cursor-pointer" onClick={startAnimation}>
                {/* Large semi-transparent overlay to make clickable area bigger */}
                <rect
                  x={buttonDims.x - 20}
                  y={hasPlayed ? buttonDims.yReplay - 20 : buttonDims.yInitial - 20}
                  width={buttonDims.width + 40}
                  height={buttonDims.height + 40}
                  fill="transparent"
                />

                {/* Button background */}
                <rect
                  x={buttonDims.x}
                  y={hasPlayed ? buttonDims.yReplay : buttonDims.yInitial}
                  width={buttonDims.width}
                  height={buttonDims.height}
                  rx={buttonDims.rx}
                  fill={themeColors.accent}
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                    transition: 'all 0.2s'
                  }}
                  className="hover:brightness-110"
                />

                {/* Play icon */}
                <path
                  d={hasPlayed
                    ? `M ${buttonDims.iconX} ${buttonDims.yReplay + buttonDims.height/2 - buttonDims.iconSize/2} L ${buttonDims.iconX} ${buttonDims.yReplay + buttonDims.height/2 + buttonDims.iconSize/2} L ${buttonDims.iconX + buttonDims.iconSize * 0.8} ${buttonDims.yReplay + buttonDims.height/2} Z`
                    : `M ${buttonDims.iconX} ${buttonDims.yInitial + buttonDims.height/2 - buttonDims.iconSize/2} L ${buttonDims.iconX} ${buttonDims.yInitial + buttonDims.height/2 + buttonDims.iconSize/2} L ${buttonDims.iconX + buttonDims.iconSize * 0.8} ${buttonDims.yInitial + buttonDims.height/2} Z`
                  }
                  fill="white"
                />

                {/* Button text */}
                <text
                  x={buttonDims.textX}
                  y={hasPlayed ? buttonDims.yReplay + buttonDims.height/2 + fontSize.button/3 : buttonDims.yInitial + buttonDims.height/2 + fontSize.button/3}
                  fill="white"
                  fontSize={fontSize.button}
                  fontWeight="600"
                  fontFamily="system-ui"
                  textAnchor="middle"
                >
                  {hasPlayed ? 'Replay Journey' : 'Watch the Journey'}
                </text>
              </g>
            )}
          </svg>

          {/* Phase-specific caption */}
          <div
            className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl text-center bg-gray-50"
            style={{ minHeight: '80px' }}
          >
            {phase === 0 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: themeColors.primary }}>Everyone starts excited. The potential feels real.</div>
                <div className="text-base md:text-sm text-gray-500">"AI will change everything!"</div>
              </div>
            )}
            {phase === 1 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: '#dc2626' }}>Then you hit The Valley. Outputs aren't working. It feels slow.</div>
                <div className="text-base md:text-sm text-gray-500">"I could have done this myself faster."</div>
              </div>
            )}
            {phase === 2 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: '#dc2626' }}>Without support, people rationally quit.</div>
                <div className="text-base md:text-sm text-gray-500">Back to old ways. "I'll try again later." They never do.</div>
              </div>
            )}
            {phase === 3 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: themeColors.secondary }}>But with coaching at the friction point...</div>
                <div className="text-base md:text-sm text-gray-500">Accountability. Encouragement. Someone who helps you push through.</div>
              </div>
            )}
            {phase === 4 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: '#16a34a' }}>You get your first real win.</div>
                <div className="text-base md:text-sm text-gray-500">"Wait... that actually worked." The effort starts to feel worth it.</div>
              </div>
            )}
            {phase === 5 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: themeColors.accent }}>But then another setback. Progress plateaus.</div>
                <div className="text-base md:text-sm text-gray-500">"I'm in a rut. Same prompts, same results."</div>
              </div>
            )}
            {phase === 6 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: themeColors.secondary }}>Coaching again—expanding your approach.</div>
                <div className="text-base md:text-sm text-gray-500">New use cases. New workflows. Breaking through the plateau.</div>
              </div>
            )}
            {phase === 7 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: '#16a34a' }}>Another breakthrough. Momentum is building.</div>
                <div className="text-base md:text-sm text-gray-500">You're starting to see opportunities everywhere.</div>
              </div>
            )}
            {phase === 8 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: themeColors.accent }}>A smaller wobble. But you're more resilient now.</div>
                <div className="text-base md:text-sm text-gray-500">The setbacks get smaller. The recoveries get faster.</div>
              </div>
            )}
            {phase === 9 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: themeColors.secondary }}>Light-touch coaching. You're almost there.</div>
                <div className="text-base md:text-sm text-gray-500">Less intervention needed. The skill is becoming yours.</div>
              </div>
            )}
            {phase === 10 && (
              <div className="valley-fade-in">
                <div className="text-xl md:text-lg mb-2" style={{ color: '#16a34a' }}>Self-sustaining. Wins drive practice. Practice drives wins.</div>
                <div className="text-base md:text-sm text-gray-500">The value is self-evident. This is just how you work now.</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom insight - shows after animation */}
        {phase >= 10 && !isPlaying && (
          <div
            className="mt-8 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-6 valley-fade-in"
          >
            <div
              className="p-6 md:p-10 rounded-2xl"
              style={{ backgroundColor: themeColors.secondary }}
            >
              <div
                className="text-sm md:text-base font-semibold uppercase tracking-widest mb-4 md:mb-6"
                style={{ color: themeColors.accentLifted }}
              >
                Why Training Doesn't Work
              </div>
              <p className="text-white leading-relaxed text-lg md:text-xl">
                Training is knowledge transfer—one-time, front-loaded. But the problem isn't knowledge.
                It's <strong className="text-white">sustained practice through a period where it doesn't feel worth it yet.</strong>
              </p>
            </div>

            <div
              className="p-6 md:p-10 rounded-2xl bg-white"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              <div
                className="text-sm md:text-base font-semibold uppercase tracking-widest mb-4 md:mb-6"
                style={{ color: themeColors.accent }}
              >
                Why Coaching Works
              </div>
              <p className="leading-relaxed text-lg md:text-xl" style={{ color: themeColors.primary }}>
                Coaching keeps you in practice long enough to become someone who sees the value.
                <strong> It's the bridge that sustains practice until the value becomes self-evident.</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimatedValley;
