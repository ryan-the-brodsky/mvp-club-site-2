import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Users, Zap, Target, RefreshCw, Building2, GraduationCap, CheckCircle2, Quote, ChevronDown, Sparkles, Brain, Compass, Layers, TrendingUp, Shield, Calendar, MessageCircle } from 'lucide-react';
import ColorExplorer from './ColorExplorer';
import { COLOR_PALETTES, generateTheme, applyTheme } from './theme-system';
import AnimatedValley from './AnimatedValley';

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
    { id: 'problem', label: 'The Problem' },
    { id: 'journey', label: 'The Journey' },
    { id: 'philosophy', label: 'Our Philosophy' },
    { id: 'methodology', label: 'The Work Loop' },
    { id: 'organizations', label: 'For Organizations' },
    { id: 'practitioners', label: 'For Practitioners' },
    { id: 'team', label: 'About Us' },
    { id: 'testimonials', label: 'Community' },
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
            className="font-display text-2xl font-medium cursor-pointer"
            style={{ color: 'var(--color-accent-lifted)' }}
            onClick={() => scrollToSection('hero')}
          >
            MVP Club
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
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
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
                  Your team has the tools. They need the mindset. We transform how people 
                  think and work with AI-building confident, capable Human + AI teams that 
                  deliver real business results.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('organizations')}
                    className="px-8 py-4 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Transform Your Organization
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

            {/* Hero Visual */}
            <AnimatedSection delay={400} className="hidden lg:block">
              <div 
                className="relative p-8 rounded-2xl"
                style={{ backgroundColor: 'rgba(17, 94, 89, 0.3)' }}
              >
                <div className="space-y-4">
                  {/* Visual representation of Human + AI */}
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                    >
                      <Users size={28} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-display text-xl mb-1">Human</div>
                      <div className="text-white/60 text-sm">Strategy • Judgment • Context</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-0.5 bg-white/20" />
                    <div 
                      className="px-4 py-1 rounded-full text-sm font-medium mx-4"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                    >
                      +
                    </div>
                    <div className="w-12 h-0.5 bg-white/20" />
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    >
                      <Sparkles size={28} style={{ color: 'var(--color-accent-lifted)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-display text-xl mb-1">AI</div>
                      <div className="text-white/60 text-sm">Speed • Pattern Recognition • Scale</div>
                    </div>
                  </div>
                  
                  <div 
                    className="mt-6 p-4 rounded-xl text-center"
                    style={{ backgroundColor: 'rgba(251, 191, 36, 0.15)' }}
                  >
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">The Result</div>
                    <div className="text-white font-display text-lg">Genuine Competitive Advantage</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24" style={{ backgroundColor: '#faf5f0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p 
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                The AI Adoption Crisis
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
                stat: '10%',
                label: 'of employees use AI for high-value tasks',
                subtext: 'Despite having enterprise-wide access',
                color: 'var(--color-accent-soft)'
              },
              {
                stat: '$47B',
                label: 'spent on AI tools by 2025',
                subtext: 'Most investments failing to deliver ROI',
                color: 'var(--color-accent)'
              },
              {
                stat: '73%',
                label: 'report "AI anxiety" at work',
                subtext: 'Uncertain how to integrate AI meaningfully',
                color: 'var(--color-secondary)'
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div 
                  className="card-hover p-8 rounded-2xl text-center"
                  style={{ backgroundColor: 'white' }}
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
                  <div className="text-sm text-gray-500">{item.subtext}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* The Real Problem */}
          <AnimatedSection>
            <div 
              className="rounded-2xl p-8 md:p-12"
              style={{ backgroundColor: 'var(--color-primary-tint-solid)' }}
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
                      "Tool access without mindset shift = wasted investment",
                      "Fear and uncertainty prevent meaningful adoption"
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
                      style={{ backgroundColor: 'var(--color-accent-tint-solid)', color: 'var(--color-accent)' }}
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
      <section id="philosophy" className="py-24" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p 
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                Our Philosophy
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
                The New Unit of Labor: Human + AI Teams
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
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
                className="p-8 rounded-2xl h-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                  >
                    <Users size={24} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white">Human Strengths</h3>
                    <p className="text-white/60 text-sm">What you bring to the team</p>
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
                      <CheckCircle2 size={18} style={{ color: 'var(--color-accent-lifted)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* AI Strengths */}
            <AnimatedSection delay={200}>
              <div 
                className="p-8 rounded-2xl h-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)', border: '2px solid #fbbf24' }}
                  >
                    <Sparkles size={24} style={{ color: 'var(--color-accent-lifted)' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white">AI Strengths</h3>
                    <p className="text-white/60 text-sm">What AI brings to the team</p>
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
                      <Zap size={18} style={{ color: 'var(--color-accent-lifted)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* The Collaboration Model */}
          <AnimatedSection>
            <div 
              className="p-8 rounded-2xl text-center"
              style={{ backgroundColor: 'rgba(251, 191, 36, 0.15)' }}
            >
              <h3 className="font-display text-2xl text-white mb-8">The Complementary Collaboration</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { human: 'Human Drives Goals', arrow: '→', ai: 'AI Reduces Friction' },
                  { human: 'AI Generates Insights', arrow: '→', ai: 'Human Connects to Value' },
                  { human: 'AI Iterates Fast', arrow: '→', ai: 'Human Evaluates & Refines' }
                ].map((flow, i) => (
                  <div key={i} className="flex items-center justify-center gap-3">
                    <span className="text-white/80">{flow.human}</span>
                    <ArrowRight size={16} style={{ color: 'var(--color-accent-lifted)' }} />
                    <span className="text-white font-semibold">{flow.ai}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Key Principles */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
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
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
                  >
                    <principle.icon size={24} style={{ color: 'var(--color-accent-lifted)' }} />
                  </div>
                  <h4 className="font-display text-lg text-white mb-2">{principle.title}</h4>
                  <p className="text-white/70 text-sm">{principle.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section - The Work Loop */}
      <section id="methodology" className="py-24" style={{ backgroundColor: '#faf5f0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p 
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                Our Methodology
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                The Work Loop: Your Operating System for Human + AI Collaboration
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                This isn't a prompt template. It's a way of thinking-a repeatable framework 
                that transforms how you approach any task with AI.
              </p>
            </div>
          </AnimatedSection>

          {/* Work Loop Visual */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { 
                    num: '01', 
                    title: 'Articulate', 
                    desc: 'Define what you actually need-the real outcome, not just the surface request',
                    color: 'var(--color-primary)'
                  },
                  { 
                    num: '02', 
                    title: 'Build', 
                    desc: 'Gather context, examples, and constraints that will shape the output',
                    color: 'var(--color-secondary)'
                  },
                  { 
                    num: '03', 
                    title: 'Prompt', 
                    desc: 'Craft your request with clarity, specificity, and the right level of structure',
                    color: 'var(--color-accent)'
                  },
                  { 
                    num: '04', 
                    title: 'Execute', 
                    desc: 'Run the prompt and generate initial outputs',
                    color: 'var(--color-secondary-lifted)'
                  },
                  {
                    num: '05',
                    title: 'Evaluate',
                    desc: "Apply your judgment-what works? What doesn't? What's missing?",
                    color: 'var(--color-primary-lifted)'
                  },
                  { 
                    num: '06', 
                    title: 'Iterate', 
                    desc: 'Refine based on evaluation. Loop back as needed until you hit the target.',
                    color: 'var(--color-accent-soft)'
                  }
                ].map((step, i) => (
                  <AnimatedSection key={i} delay={i * 100}>
                    <div 
                      className="card-hover p-6 rounded-xl bg-white h-full"
                      style={{ borderTop: `4px solid ${step.color}` }}
                    >
                      <div 
                        className="font-display text-3xl mb-2"
                        style={{ color: step.color }}
                      >
                        {step.num}
                      </div>
                      <h4 
                        className="font-display text-lg mb-2"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Loop indicator */}
              <div className="mt-8 flex justify-center">
                <div 
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent-tint-solid)' }}
                >
                  <RefreshCw size={18} style={{ color: 'var(--color-accent)' }} />
                  <span className="font-medium" style={{ color: 'var(--color-primary)' }}>
                    Continuous improvement through iteration
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Why This Works */}
          <AnimatedSection>
            <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--color-primary)' }}>
                  Why Most People Skip Steps 1-2
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  The hidden leverage in AI work isn't the prompt-it's the preparation. 
                  Most people jump straight to "Prompt" and wonder why results feel mediocre.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The Articulate and Build steps force you to externalize tacit knowledge. 
                  You know more than you think-but AI can't read your mind. The Work Loop 
                  helps you surface that knowledge and put it to work.
                </p>
              </div>
              <div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: 'var(--color-secondary-tint-solid)' }}
              >
                <div className="font-display text-lg mb-4" style={{ color: 'var(--color-secondary)' }}>
                  The "Good Enough" Mindset
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Perfectionism kills AI adoption. The Work Loop embraces iteration-start 
                  rough, refine fast. Your first output isn't meant to be final. It's meant 
                  to give you something to evaluate and improve.
                </p>
                <div 
                  className="px-4 py-2 rounded-lg inline-block text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-accent-lifted)' }}
                >
                  "Done is better than perfect-iteration makes it better than done."
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* For Organizations Section */}
      <section id="organizations" className="py-24" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={24} style={{ color: 'var(--color-accent-lifted)' }} />
              <p 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                For Organizations
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 max-w-2xl">
              6-Week Strategic Transformation
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-2xl leading-relaxed">
              A comprehensive program that transforms your workforce from "AI access" to 
              "AI capability"-with measurable outcomes and a clear roadmap.
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                weeks: 'Week 1-2',
                title: 'Leadership Discovery',
                activities: [
                  'C-suite interviews',
                  'AI initiatives audit',
                  'Priority mapping'
                ]
              },
              {
                weeks: 'Week 3-4',
                title: 'Organizational Deep Dive',
                activities: [
                  'Management interviews',
                  'Employee surveys',
                  'Workflow analysis'
                ]
              },
              {
                weeks: 'Week 5',
                title: 'Strategy Development',
                activities: [
                  'Opportunity prioritization',
                  'ROI projections',
                  'Roadmap creation'
                ]
              },
              {
                weeks: 'Week 6',
                title: 'Alignment & Design',
                activities: [
                  'Leadership presentation',
                  'Program design',
                  'Success metrics'
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
                        <CheckCircle2 size={14} style={{ color: 'var(--color-secondary-lifted)' }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Deliverables */}
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl text-white mb-6">What You'll Receive</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Data Report',
                      desc: 'Comprehensive analysis of employee interviews and qualitative insights'
                    },
                    {
                      title: 'Prioritization Matrix',
                      desc: 'Strategic framework mapping business priorities against AI opportunities'
                    },
                    {
                      title: 'Transformation Roadmap',
                      desc: 'Detailed 3-6 month implementation plan with milestones'
                    },
                    {
                      title: 'Program Design',
                      desc: 'Complete specification for ongoing training and support'
                    }
                  ].map((deliverable, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
                    >
                      <div className="font-semibold text-white mb-1">{deliverable.title}</div>
                      <div className="text-white/60 text-sm">{deliverable.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="p-8 rounded-xl"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <h3 className="font-display text-xl text-white mb-6">Target Outcomes</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Increased AI adoption rates', icon: TrendingUp },
                    { label: 'Measurable productivity gains', icon: Target },
                    { label: 'Clear ROI on AI investments', icon: Layers },
                    { label: 'Cultural shift toward AI-first thinking', icon: Brain }
                  ].map((outcome, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}
                      >
                        <outcome.icon size={20} style={{ color: 'var(--color-accent-lifted)' }} />
                      </div>
                      <span className="text-white">{outcome.label}</span>
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
      <section id="practitioners" className="py-24" style={{ backgroundColor: 'var(--color-secondary-tint-solid)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={24} style={{ color: 'var(--color-secondary)' }} />
              <p 
                className="text-sm font-semibold uppercase tracking-wider"
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
                    style={{ backgroundColor: 'var(--color-secondary-tint-solid)' }}
                  >
                    <offering.icon size={28} style={{ color: 'var(--color-secondary)' }} />
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
      <section id="team" className="py-24" style={{ backgroundColor: '#faf5f0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p 
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                About Us
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                Meet the Team
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're practitioners first-people who've navigated the AI transformation 
                ourselves and are passionate about helping others do the same.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ryan',
                role: 'Founder & Lead Consultant',
                bio: 'Strategic transformation leader with deep experience in helping organizations navigate technology adoption and cultural change.',
                expertise: ['Strategic Consulting', 'AI Adoption', 'Organizational Change']
              },
              {
                name: 'Co-Founder',
                role: 'Community & Education',
                bio: 'Passionate about building learning communities and creating pathways for people to develop new capabilities.',
                expertise: ['Community Building', 'Course Design', 'Facilitation']
              },
              {
                name: 'Co-Founder',
                role: 'Technology & Product',
                bio: 'Bringing technical depth and hands-on AI expertise to ensure our methods are grounded in real-world application.',
                expertise: ['Technical Implementation', 'AI Systems', 'Product Development']
              }
            ].map((member, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="card-hover bg-white p-8 rounded-2xl text-center h-full">
                  {/* Placeholder avatar */}
                  <div 
                    className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: i === 0 ? 'var(--color-primary)' : i === 1 ? 'var(--color-secondary)' : 'var(--color-secondary-lifted)' }}
                  >
                    <Users size={40} style={{ color: 'var(--color-accent-lifted)' }} />
                  </div>
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
                        style={{ backgroundColor: 'var(--color-secondary-tint-solid)', color: 'var(--color-secondary)' }}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24" style={{ backgroundColor: 'var(--color-primary-tint-solid)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p 
                className="text-sm font-semibold uppercase tracking-wider mb-4"
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
                      style={{ backgroundColor: 'var(--color-accent-tint-solid)', color: 'var(--color-accent)' }}
                    >
                      {testimonial.highlight}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
                Ready to Transform How You Work with AI?
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
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
                  style={{ backgroundColor: 'var(--color-primary-tint-solid)' }}
                >
                  <Building2 size={28} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                  For Organizations
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Transform your workforce with our 6-week strategic program. 
                  Book a discovery call to discuss your organization's needs and 
                  see if we're a good fit.
                </p>
                <div className="space-y-3 mb-6">
                  {['30-minute discovery call', 'Custom scope assessment', 'No commitment required'].map((item, i) => (
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
                  style={{ backgroundColor: 'var(--color-secondary-tint-solid)' }}
                >
                  <MessageCircle size={28} style={{ color: 'var(--color-secondary)' }} />
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

          {/* Quick contact */}
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
              © 2024 MVP Club Consulting
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
