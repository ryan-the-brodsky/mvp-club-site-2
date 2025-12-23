import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Users, Zap, Target, RefreshCw, Building2, GraduationCap, CheckCircle2, Quote, ChevronDown, Sparkles, Brain, Compass, Layers, TrendingUp, Shield, Calendar, MessageCircle } from 'lucide-react';
import ColorExplorer from './ColorExplorer';
import { COLOR_PALETTES, generateTheme, applyTheme } from './theme-system';
import logoImage from './mvp-club-logo.jpeg';
import AnimatedValley from './AnimatedValley';
import ElementHelix from './ElementHelix';
import WorkLoop from './WorkLoop';

// MVP Club Consulting - Complete Single Page Website
// Brand colors from skill + Section-level content depth + warm approachable voice

const MVPClubWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const theme = generateTheme(COLOR_PALETTES.default);
    applyTheme(theme);
  }, []);

  // Navigation sections
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'problem', label: 'What We Do' },
    { id: 'organizations', label: 'For Organizations' },
    { id: 'practitioners', label: 'For Practitioners' },
    { id: 'team', label: 'About Us' },
    // { id: 'testimonials', label: 'Community' }, // Hidden until we have real testimonials
    { id: 'contact', label: 'Get Started' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // Reusable animated section wrapper
  const AnimatedSection = ({ children, className = '', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${className}`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        .font-display { font-family: 'Zilla Slab', serif; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }

        /* Smooth scrolling */
        html { scroll-behavior: smooth; }

        /* Custom animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
        
        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, var(--color-accent-lifted) 0%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Card hover effects */
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px var(--color-primary-muted);
        }
      `}</style>

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 py-4"
        style={{
          backgroundColor: 'var(--color-primary)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 font-display text-2xl font-medium cursor-pointer"
            style={{ color: 'var(--color-accent-lifted)' }}
            onClick={() => scrollToSection('hero')}
          >
            <img
              src={logoImage}
              alt="MVP Club Logo"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span>MVP Club</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {sections.slice(1, -1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: 'rgba(255,255,255,0.8)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-lifted)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >
                {section.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'white' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div 
            className="lg:hidden absolute top-full left-0 right-0 py-6 px-6"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="block w-full text-left py-3 text-white/80 hover:text-white transition-colors font-medium"
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10 animate-float"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          />
          <div 
            className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10 animate-float"
            style={{ backgroundColor: 'var(--color-accent)', animationDelay: '-2s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection>
                <p
                  className="text-lg font-semibold uppercase tracking-wider mb-4"
                  style={{ color: 'var(--color-accent-lifted)' }}
                >
                  Strategic AI Transformation
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={100}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                  Turn AI Access Into{' '}
                  <span className="gradient-text">Genuine Capability</span>
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
                  We coach your team to bring an AI-first mindset to real work and implement AI workflows.
                  Get measurable productivity gains in 4 weeks by doing actual work, not sitting through programs.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('organizations')}
                    className="px-8 py-4 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Start a 4-Week Pilot
                  </button>
                  <button
                    onClick={() => scrollToSection('practitioners')}
                    className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'transparent',
                      border: '2px solid rgba(255,255,255,0.3)',
                      color: 'white'
                    }}
                  >
                    Join the Community
                  </button>
                </div>
              </AnimatedSection>
            </div>

            {/* Hero Visual - Element Helix */}
            <AnimatedSection delay={400} className="hidden lg:block">
              <ElementHelix />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-lg font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                The AI Adoption Gap
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                You Have the Tools. Where's the Transformation?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Organizations are investing heavily in AI-and getting surprisingly little in return. 
                Not because the technology isn't ready. Because the approach is wrong.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                stat: '95%',
                label: 'of AI projects fail to deliver ROI',
                subtext: 'Most see zero measurable bottom-line impact',
                color: 'var(--color-accent-soft)',
                source: 'MIT Project NANDA, 2025',
                link: 'https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf'
              },
              {
                stat: '42%',
                label: 'of companies abandoned AI initiatives',
                subtext: 'Up from just 17% in 2024—a 147% increase',
                color: 'var(--color-accent)',
                source: 'S&P Global Market Intelligence, 2025',
                link: 'https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning'
              },
              {
                stat: '89%',
                label: 'of workers worry about AI impact on job security',
                subtext: 'Employee anxiety driving hesitation to adopt',
                color: 'var(--color-secondary)',
                source: 'Resume Now AI Disruption Report, 2025',
                link: 'https://www.resume-now.com/job-resources/careers/ai-disruption-report'
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block card-hover p-8 rounded-2xl text-center transition-all duration-200"
                  style={{ backgroundColor: 'white', textDecoration: 'none' }}
                >
                  <div
                    className="font-display text-5xl mb-3"
                    style={{ color: item.color }}
                  >
                    {item.stat}
                  </div>
                  <div className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{item.subtext}</div>
                  <div className="text-xs text-gray-400 italic">Source: {item.source}</div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* The Real Pressure */}
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto my-16">
              <h3 className="font-display text-2xl md:text-3xl mb-6" style={{ color: 'var(--color-primary)' }}>
                The Real Pressure: Doing More With Less
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        Teams Need to See Success: Fast
                      </div>
                      <p className="text-gray-600 text-sm">
                        The question isn't "Should we do AI?" It's "How do we get value THIS MONTH?"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        Pilot first, scale what works
                      </div>
                      <p className="text-gray-600 text-sm">
                        Start with one team, prove value, then expand—no big rollouts.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        Teams are too busy for "big transformation programs"
                      </div>
                      <p className="text-gray-600 text-sm">
                        They need workflows that work, not workshops that don't.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        AI adoption isn't about knowledge, it's about practice
                      </div>
                      <p className="text-gray-600 text-sm">
                        Success comes from coaching through setbacks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Real Problem */}
          <AnimatedSection>
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{ backgroundColor: 'white' }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--color-primary)' }}>
                    Why Traditional Approaches Fail
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Organizations treat AI like traditional software: deploy it, run a training session, 
                    expect adoption. But AI isn't traditional software. It requires a fundamentally 
                    different relationship-one built on practice, experimentation, and continuous learning.
                  </p>
                  <div className="space-y-3">
                    {[
                      "One-time training doesn't build lasting skills",
                      "Generic workshops don't address specific workflows",
                      "Big rollouts fail when teams are already overwhelmed",
                      "You don't need more education—you need workflows that work"
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: 'var(--color-accent-soft)' }}
                        >
                          <X size={12} color="white" />
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div 
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="text-center mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                    >
                      The Transformation Required
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">Traditional Software</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>AI Systems</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">User operates tool</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>Manager collaborates</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">One-time training</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>Continuous practice</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">Predictable outputs</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>Creative potential</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Journey Section - Animated Valley */}
      <AnimatedValley />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-lg font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                Our Philosophy
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                The New Unit of Labor: Human + AI Teams
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe the fundamental unit of work is shifting. Not from human to AI. 
                But from individual employee to the Employee + AI Team. An inseparable 
                collaboration where each brings irreplaceable strengths.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Human Strengths */}
            <AnimatedSection delay={100}>
              <div
                className="p-8 rounded-2xl h-full bg-white"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                  >
                    <Users size={24} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl" style={{ color: 'var(--color-primary)' }}>Human Strengths</h3>
                    <p className="text-gray-500 text-sm">What you bring to the team</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Strategic initiative and direction-setting',
                    'Contextual nuance and judgment',
                    'Institutional knowledge',
                    'Connecting outputs to business value',
                    'Final evaluation and refinement'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} style={{ color: 'var(--color-accent)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* AI Strengths */}
            <AnimatedSection delay={200}>
              <div
                className="p-8 rounded-2xl h-full bg-white"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <Sparkles size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl" style={{ color: 'var(--color-primary)' }}>AI Strengths</h3>
                    <p className="text-gray-500 text-sm">What AI brings to the team</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Rapid content generation at scale',
                    'Pattern recognition and insight surfacing',
                    'Unlimited ideation capacity',
                    'Quick data analysis',
                    'Tireless iteration and variation'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Zap size={18} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Key Principles */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Practice Over Training',
                desc: 'AI mastery requires continuous practice, not one-time instruction'
              },
              {
                icon: RefreshCw,
                title: 'Experimentation is Essential',
                desc: 'Learning happens through trial, error, and iteration'
              },
              {
                icon: Compass,
                title: 'Context Matters',
                desc: 'Integration must be tailored to specific roles and workflows'
              }
            ].map((principle, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-8 rounded-2xl text-center h-full bg-white"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <principle.icon size={28} style={{ color: 'white' }} />
                  </div>
                  <h4 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>{principle.title}</h4>
                  <p className="text-gray-600 text-base leading-relaxed">{principle.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section - The Work Loop */}
      <section id="methodology" style={{ backgroundColor: '#faf5f0' }}>
        <WorkLoop />
      </section>

      {/* For Organizations Section */}
      <section id="organizations" className="py-24" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={24} style={{ color: 'var(--color-accent-lifted)' }} />
              <p
                className="text-lg font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                For Organizations
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 max-w-2xl">
              4-Week Productivity Sprint
            </h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl font-semibold">
              Start Small. Prove Value. Scale Fast.
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl leading-relaxed">
              A rapid productivity sprint that installs AI workflows into your team's real processes—without
              training programs, strategy cycles, or major time commitments. Get measurable productivity
              gains in 4 weeks by doing actual work, not sitting through programs.
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                weeks: 'Week 1',
                title: 'Workflow Discovery',
                activities: [
                  'Identify 2-3 high-value use cases',
                  'Map current processes',
                  'Define success metrics'
                ]
              },
              {
                weeks: 'Week 2-3',
                title: 'Build + Install',
                activities: [
                  'Create tailored AI workflows',
                  'Install into real team processes',
                  'Train by doing actual work'
                ]
              },
              {
                weeks: 'Week 4',
                title: 'Measure + Expand',
                activities: [
                  'Track impact on cycle time, output, workload',
                  'Identify next workflows to automate',
                  'Design scale plan (optional)'
                ]
              }
            ].map((phase, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-xl h-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-accent-lifted)' }}
                  >
                    {phase.weeks}
                  </div>
                  <h4 className="font-display text-lg text-white mb-4">{phase.title}</h4>
                  <div className="space-y-2">
                    {phase.activities.map((activity, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={14} style={{ color: 'var(--color-accent-lifted)' }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* What You Get Summary */}
          <AnimatedSection>
            <div
              className="p-8 rounded-xl mb-16 max-w-3xl mx-auto bg-white"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '2px solid var(--color-secondary)' }}
            >
              <h3 className="font-display text-2xl mb-6 text-center" style={{ color: 'var(--color-primary)' }}>What You Get</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  '2-3 production-ready AI workflows',
                  'Role-specific prompt libraries',
                  'Loom walkthroughs for each workflow',
                  'Measurable productivity gains',
                  'Clear roadmap for broader rollout'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Deliverables */}
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl text-white mb-6">What You Walk Away With</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Working AI Workflows (Not Just Ideas)',
                      desc: '2-3 fully functional, team-tested workflows with copy/paste prompts ready for production use'
                    },
                    {
                      title: 'Role-Based Playbooks',
                      desc: 'Tailored for your specific roles (PM, Designer, Analyst, etc.) with 3-5 tactical workflows per role'
                    },
                    {
                      title: 'Video Walkthroughs',
                      desc: 'Loom recordings showing exactly how to use each workflow—no guesswork, no ambiguity'
                    },
                    {
                      title: 'Impact Metrics',
                      desc: 'Measure cycle time reduction, track output increases, prove ROI for broader rollout'
                    }
                  ].map((deliverable, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <div className="font-semibold text-white mb-1">{deliverable.title}</div>
                      <div className="text-white/80 text-sm">{deliverable.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-8 rounded-xl bg-white"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '2px solid var(--color-accent)' }}
              >
                <h3 className="font-display text-xl mb-6" style={{ color: 'var(--color-primary)' }}>Target Outcomes</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Faster project delivery (measured in days saved)', icon: TrendingUp },
                    { label: 'Reduced employee workload (same output, less time)', icon: Target },
                    { label: 'Sustainable AI capability (practice builds lasting skills)', icon: Layers },
                    { label: 'Clear path to scale (pilot proves the model)', icon: Brain }
                  ].map((outcome, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      >
                        <outcome.icon size={20} style={{ color: 'white' }} />
                      </div>
                      <span className="text-gray-700">{outcome.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="mt-8 w-full py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                >
                  Schedule a Discovery Call
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* For Practitioners Section */}
      <section id="practitioners" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={24} style={{ color: 'var(--color-secondary)' }} />
              <p
                className="text-lg font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-secondary)' }}
              >
                For Practitioners
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-6 max-w-2xl" style={{ color: 'var(--color-primary)' }}>
              Join the AI-First Practitioner Community
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Not ready for enterprise transformation? Join a community of practitioners 
              building real AI skills through guided practice, shared learning, and expert support.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Layers,
                title: 'Structured Courses',
                desc: 'Self-paced curriculum based on the Work Loop methodology. From mindset shift to advanced practice.',
                features: ['9-module AI-First Practitioner course', 'Hands-on exercises with real tasks', 'Progress tracking and milestones']
              },
              {
                icon: Users,
                title: 'Active Community',
                desc: 'Learn alongside others on the same journey. Share wins, troubleshoot challenges, build together.',
                features: ['Weekly community discussions', 'Peer feedback on your work', 'Collaborative problem-solving']
              },
              {
                icon: Calendar,
                title: 'Live Events',
                desc: 'Regular workshops, Q&As, and guest sessions to deepen your practice and expand your network.',
                features: ['Monthly live workshops', 'Office hours with coaches', 'Special guest practitioners']
              }
            ].map((offering, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="card-hover bg-white p-8 rounded-2xl h-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <offering.icon size={28} style={{ color: 'white' }} />
                  </div>
                  <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{offering.desc}</p>
                  <div className="space-y-2">
                    {offering.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Community CTA */}
          <AnimatedSection>
            <div 
              className="p-8 md:p-12 rounded-2xl text-center"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              <h3 className="font-display text-2xl text-white mb-4">
                Start Building Real AI Skills Today
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join a community of practitioners who are actively developing their Human + AI 
                collaboration skills through practice, not just theory.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-accent-lifted)', color: 'var(--color-primary)' }}
              >
                Join the Community
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-lg font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                About Us
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
                Meet the Team
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                We're practitioners first-people who've navigated the AI transformation 
                ourselves and are passionate about helping others do the same.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ryan Brodsky',
                role: 'Technical Implementation Manager',
                bio: 'Software Developer who uses AI to create customer support articles, prototype applications, and has shipped 50+ feature requests using AI-assisted development.',
                expertise: ['Technical Implementation', 'AI Development', 'Software Engineering'],
                image: '/ryan-brodsky.jpg'
              },
              {
                name: 'Matt Hastings',
                role: 'AI Adoption Lead',
                bio: 'Has run over 100 AI adoption coaching sessions. Manages AI implementation team at General Assembly and designs AI training products for Fortune 500 clients.',
                expertise: ['AI Coaching', 'Training Design', 'Enterprise Solutions'],
                image: '/matt-hastings.png'
              },
              {
                name: 'Jill Ozovek',
                role: 'AI Coach & Learning Designer',
                bio: 'Certified Professional Coach who led learning design including AI programming and agentic workflows at GA. Sets up AI workflows for startups and runs AI coaching sessions for MVP Club.',
                expertise: ['Professional Coaching', 'Learning Design', 'AI Workflows'],
                image: '/jill-ozovek.jpg'
              }
            ].map((member, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="card-hover bg-white p-8 rounded-2xl text-center h-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="font-display text-xl mb-1" style={{ color: 'var(--color-primary)' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-secondary)' }}>{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hidden until we have real testimonials */}
      {false && <section id="testimonials" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-lg font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-primary-lifted)' }}
              >
                Community Voices
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                What Our Community Says
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We've been running live workshops and community events for the past year. 
                Here's what participants are saying about their transformation.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats bar */}
          <AnimatedSection>
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl mb-16"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {[
                { stat: '50+', label: 'Community Members' },
                { stat: '20+', label: 'Live Events Hosted' },
                { stat: '100+', label: 'Workshop Participants' },
                { stat: '1 Year', label: 'Building Together' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl mb-1" style={{ color: 'var(--color-accent-lifted)' }}>
                    {item.stat}
                  </div>
                  <div className="text-white/70 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "The Work Loop completely changed how I approach tasks with AI. I went from getting 'meh' results to outputs that actually surprise me.",
                name: "Community Member",
                role: "Marketing Professional",
                highlight: "Work Loop framework"
              },
              {
                quote: "Finally, someone who gets that this isn't about learning prompts-it's about changing how you think. The mindset shift was exactly what I needed.",
                name: "Workshop Participant",
                role: "Product Manager",
                highlight: "Mindset transformation"
              },
              {
                quote: "The community aspect is huge. Seeing how others apply these concepts to their work has accelerated my own learning dramatically.",
                name: "Community Member",
                role: "Consultant",
                highlight: "Community learning"
              },
              {
                quote: "I used to feel overwhelmed by AI. Now I feel like I have a genuine superpower. The confidence came from actually practicing, not just reading about it.",
                name: "Course Graduate",
                role: "Operations Lead",
                highlight: "Confidence through practice"
              },
              {
                quote: "The emphasis on context engineering was eye-opening. My prompts are 10x more effective now that I understand how to set up AI for success.",
                name: "Workshop Participant",
                role: "Content Creator",
                highlight: "Context engineering"
              },
              {
                quote: "This isn't corporate training-it's genuine capability building. You can feel the difference in how the material is designed and delivered.",
                name: "Community Member",
                role: "Team Lead",
                highlight: "Genuine approach"
              }
            ].map((testimonial, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="card-hover bg-white p-6 rounded-xl h-full flex flex-col">
                  <Quote size={24} style={{ color: 'var(--color-accent)' }} className="mb-4 opacity-50" />
                  <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-semibold text-sm" style={{ color: 'var(--color-primary)' }}>
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 text-xs">{testimonial.role}</div>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                    >
                      {testimonial.highlight}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>}

      {/* CTA Section */}
      <section id="contact" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                Ready to Transform How You Work with AI?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're transforming an organization or developing your own skills, 
                we have a path for you. Choose what fits your situation.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* B2B Path */}
            <AnimatedSection delay={100}>
              <div className="bg-white p-8 rounded-2xl h-full flex flex-col">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                >
                  <Building2 size={28} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                  For Organizations
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  Start small. Prove value fast. Scale what works.
                  <br /><br />
                  4-week pilot sprint for one team, one workflow, one problem.
                  No big rollout. No company-wide program.
                  Just real work getting done faster with AI.
                  <br /><br />
                  <strong>If it works, we scale. If it doesn't, we stop.</strong>
                </p>
                <div className="space-y-3 mb-6">
                  {['15-minute workflow diagnostic', 'Pilot one team—expand if it works', 'Immediate productivity gains'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-lg font-semibold text-center transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                >
                  Book a Discovery Call
                </a>
              </div>
            </AnimatedSection>

            {/* B2C Path */}
            <AnimatedSection delay={200}>
              <div className="bg-white p-8 rounded-2xl h-full flex flex-col">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  <MessageCircle size={28} style={{ color: 'white' }} />
                </div>
                <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                  For Practitioners
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Join our community of AI-first practitioners. Access courses, 
                  live events, and a supportive community to build your skills 
                  through practice.
                </p>
                <div className="space-y-3 mb-6">
                  {['Immediate community access', 'Self-paced courses', 'Live workshops & events'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://mvpclub.mn.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-lg font-semibold text-center transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                >
                  Join the Community
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Quick contact - Hidden until email is set up
          <AnimatedSection delay={300}>
            <div className="text-center mt-12">
              <p className="text-white/60 text-sm">
                Not sure which path is right? Email us at{' '}
                <a
                  href="mailto:hello@mvpclub.co"
                  className="underline hover:text-white transition-colors"
                  style={{ color: 'var(--color-accent-lifted)' }}
                >
                  hello@mvpclub.co
                </a>
              </p>
            </div>
          </AnimatedSection>
          */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-display text-xl" style={{ color: 'var(--color-accent-lifted)' }}>
              MVP Club Consulting
            </div>
            <div className="flex items-center gap-8">
              {['Philosophy', 'For Organizations', 'For Practitioners', 'About Us'].map((link, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(
                    link === 'Philosophy' ? 'philosophy' :
                    link === 'For Organizations' ? 'organizations' :
                    link === 'For Practitioners' ? 'practitioners' : 'team'
                  )}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
            <div className="text-white/50 text-sm">
              © 2025 MVP Club Consulting
            </div>
          </div>
        </div>
      </footer>

      {/* Color Explorer Dev Mode */}
      <ColorExplorer />
    </div>
  );
};

export default MVPClubWebsite;
