import React, { useState } from 'react';

const WorkLoop = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    { num: '01', name: 'Articulate', desc: 'Define what you actually need—the real outcome, not just the surface request', color: '#2d8a6e' },
    { num: '02', name: 'Build', desc: 'Gather context, examples, and constraints that will shape the output', color: '#3a7ca5' },
    { num: '03', name: 'Prompt', desc: 'Craft your request with clarity, specificity, and the right level of structure', color: '#d4a039' },
    { num: '04', name: 'Execute', desc: 'Run the prompt and generate initial outputs', color: '#2d8a6e' },
    { num: '05', name: 'Evaluate', desc: 'Apply your judgment—what works? What doesn\'t? What\'s missing?', color: '#3a7ca5' },
    { num: '06', name: 'Iterate', desc: 'Refine based on evaluation. Loop back as needed until you hit the target.', color: '#e87957' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '3rem 1rem',
    }}>
      <style>{`
        @keyframes workloop-flowDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -30; }
        }

        @keyframes workloop-fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .workloop-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 900px;
        }

        .workloop-header {
          text-align: center;
          animation: workloop-fadeIn 0.6s ease-out;
        }

        .workloop-header-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3a7ca5;
          margin-bottom: 0.75rem;
        }

        .workloop-header-title {
          font-family: 'Zilla Slab', 'Playfair Display', serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: #1a2332;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .workloop-header-subtitle {
          font-size: 1rem;
          color: #5a6a7a;
          max-width: 600px;
          line-height: 1.6;
        }

        .workloop-loop-container {
          position: relative;
          width: 580px;
          height: 580px;
        }

        .workloop-loop-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .workloop-loop-path {
          fill: none;
          stroke: #e0d8cf;
          stroke-width: 3;
        }

        .workloop-loop-path-animated {
          fill: none;
          stroke: url(#workloopGradient);
          stroke-width: 3;
          stroke-dasharray: 10 20;
          animation: workloop-flowDash 2s linear infinite;
        }

        .workloop-step-node {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transform: translate(-50%, -50%);
        }

        .workloop-step-node:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .workloop-step-node.active {
          transform: translate(-50%, -50%) scale(1.15);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .workloop-step-border {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 50%;
          border: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .workloop-step-node:hover .workloop-step-border,
        .workloop-step-node.active .workloop-step-border {
          border-color: var(--step-color);
        }

        .workloop-step-num {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          opacity: 0.5;
          margin-bottom: 2px;
        }

        .workloop-step-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a2332;
          text-align: center;
        }

        .workloop-step-indicator {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          margin-top: 6px;
          transition: all 0.3s ease;
        }

        .workloop-center-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 200px;
        }

        .workloop-center-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .workloop-center-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a2332;
          margin-bottom: 0.25rem;
        }

        .workloop-center-subtitle {
          font-size: 0.75rem;
          color: #5a6a7a;
        }

        .workloop-detail-card {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          width: 180px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          text-align: center;
          animation: workloop-fadeIn 0.2s ease-out;
        }

        .workloop-detail-num {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }

        .workloop-detail-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a2332;
          margin-bottom: 0.5rem;
        }

        .workloop-detail-desc {
          font-size: 0.8rem;
          color: #5a6a7a;
          line-height: 1.5;
        }

        .workloop-footer-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #e8a85c, #e89c4a);
          color: #1a2332;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(232, 168, 92, 0.3);
          animation: workloop-fadeIn 0.6s ease-out;
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .workloop-footer-icon {
          font-size: 1rem;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .workloop-loop-container {
            width: 340px;
            height: 340px;
          }

          .workloop-step-node {
            width: 70px;
            height: 70px;
          }

          .workloop-step-name {
            font-size: 0.7rem;
          }

          .workloop-step-num {
            font-size: 0.55rem;
          }

          .workloop-step-indicator {
            width: 16px;
            height: 2px;
          }

          .workloop-header-title {
            font-size: 1.5rem;
          }

          .workloop-detail-card {
            width: 140px;
            padding: 1rem;
          }

          .workloop-detail-name {
            font-size: 0.9rem;
          }

          .workloop-detail-desc {
            font-size: 0.7rem;
          }
        }
      `}</style>

      <div className="workloop-container">
        <div className="workloop-header">
          <div className="workloop-header-label">Our Methodology</div>
          <div className="workloop-header-title">The Work Loop: Your Operating System<br/>for Human + AI Collaboration</div>
          <div className="workloop-header-subtitle">
            This isn't a prompt template. It's a way of thinking—a repeatable framework that transforms how you approach any task with AI.
          </div>
        </div>

        <div className="workloop-loop-container">
          <svg className="workloop-loop-svg" viewBox="0 0 580 580">
            <defs>
              <linearGradient id="workloopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2d8a6e" />
                <stop offset="25%" stopColor="#3a7ca5" />
                <stop offset="50%" stopColor="#d4a039" />
                <stop offset="75%" stopColor="#3a7ca5" />
                <stop offset="100%" stopColor="#e87957" />
              </linearGradient>
              <marker id="workloopArrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#c0b8af" />
              </marker>
            </defs>

            {/* Main loop circle */}
            <circle cx="290" cy="290" r="210" className="workloop-loop-path" />
            <circle cx="290" cy="290" r="210" className="workloop-loop-path-animated" />

            {/* Direction arrows on the path */}
            <path d="M 290 80 L 295 90 L 285 90 Z" fill="#c0b8af" />
            <path d="M 500 290 L 490 295 L 490 285 Z" fill="#c0b8af" />
            <path d="M 290 500 L 285 490 L 295 490 Z" fill="#c0b8af" />
            <path d="M 80 290 L 90 285 L 90 295 Z" fill="#c0b8af" />
          </svg>

          {/* Step nodes positioned around the circle */}
          {steps.map((step, i) => {
            // Position nodes around the circle, starting from top
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const radius = 210;
            const centerX = 290;
            const centerY = 290;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Scale for responsive
            const containerWidth = 580;
            const percentX = (x / containerWidth) * 100;
            const percentY = (y / containerWidth) * 100;

            return (
              <div
                key={i}
                className={`workloop-step-node ${activeStep === i ? 'active' : ''}`}
                style={{
                  left: `${percentX}%`,
                  top: `${percentY}%`,
                  '--step-color': step.color
                }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="workloop-step-border" style={{ borderColor: 'transparent' }} />
                <span className="workloop-step-num" style={{ color: step.color }}>{step.num}</span>
                <span className="workloop-step-name">{step.name}</span>
                <div className="workloop-step-indicator" style={{ background: step.color }} />
              </div>
            );
          })}

          {/* Center content */}
          {activeStep === null ? (
            <div className="workloop-center-content">
              <div className="workloop-center-icon">🔄</div>
              <div className="workloop-center-title">Continuous Loop</div>
              <div className="workloop-center-subtitle">Hover on a step to learn more</div>
            </div>
          ) : (
            <div className="workloop-detail-card">
              <div className="workloop-detail-num" style={{ color: steps[activeStep].color }}>
                {steps[activeStep].num}
              </div>
              <div className="workloop-detail-name">{steps[activeStep].name}</div>
              <div className="workloop-detail-desc">{steps[activeStep].desc}</div>
            </div>
          )}
        </div>

        <div className="workloop-footer-pill">
          <span className="workloop-footer-icon">↻</span>
          Continuous improvement through iteration
        </div>
      </div>
    </div>
  );
};

export default WorkLoop;
