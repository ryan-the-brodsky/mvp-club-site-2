import React from 'react';

const ElementHelix = () => {
  const humanAttributes = ['Strategy', 'Judgment', 'Context'];
  const aiAttributes = ['Speed', 'Patterns', 'Scale'];

  // Base dimensions - all other values scale from these
  const baseWidth = 280;
  const baseHeight = 360;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '1rem',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes helixRotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes nodeFloat {
          0%, 100% { transform: translateZ(calc(70px * var(--helix-scale, 1))); }
          50% { transform: translateZ(calc(70px * var(--helix-scale, 1))) scale(1.02); }
        }

        @keyframes nodeFloatBack {
          0%, 100% { transform: translateZ(calc(-70px * var(--helix-scale, 1))); opacity: 0.5; }
          50% { transform: translateZ(calc(-70px * var(--helix-scale, 1))) scale(1.02); opacity: 0.55; }
        }

        @keyframes pulseConnection {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        @keyframes flowDot {
          0% { left: 0; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: calc(100% - 6px); opacity: 0; }
        }

        @keyframes flowDotReverse {
          0% { right: 0; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { right: calc(100% - 6px); opacity: 0; }
        }

        @keyframes emergePulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(232, 121, 87, 0.2), 0 0 80px rgba(212, 175, 55, 0.15);
          }
          50% {
            box-shadow: 0 0 60px rgba(232, 121, 87, 0.35), 0 0 100px rgba(212, 175, 55, 0.25);
          }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes subtleShimmer {
          0% { background-position: -100% center; }
          100% { background-position: 200% center; }
        }

        .helix-wrapper {
          --helix-scale: 1;
          --helix-width: 280px;
          --helix-height: 360px;
          --helix-node-size: 48px;
          --helix-node-offset: 80px;
          --helix-connection-width: 110px;
          --helix-emergence-size: 72px;
          --helix-gap: 2rem;
          --helix-side-min-width: 100px;
          --helix-font-scale: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          perspective: calc(1200px * var(--helix-scale));
        }

        .helix-header-section {
          text-align: center;
          animation: fadeSlideUp 0.6s ease-out forwards;
        }

        .helix-header-label {
          font-size: clamp(0.55rem, calc(0.65rem * var(--helix-font-scale)), 0.7rem);
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.5rem;
        }

        .helix-header-title {
          font-size: clamp(0.9rem, calc(1.1rem * var(--helix-font-scale)), 1.2rem);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.02em;
        }

        .helix-main-section {
          display: flex;
          align-items: center;
          gap: var(--helix-gap);
        }

        .helix-side-labels {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: var(--helix-side-min-width);
        }

        .helix-side-labels.right {
          align-items: flex-end;
        }

        .helix-side-label-header {
          font-size: clamp(0.75rem, calc(0.9rem * var(--helix-font-scale)), 1rem);
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .helix-human-color { color: #e87957; }
        .helix-ai-color { color: #d4af37; }

        .helix-side-label-item {
          font-size: clamp(0.65rem, calc(0.8rem * var(--helix-font-scale)), 0.85rem);
          color: rgba(255, 255, 255, 0.45);
          padding: 0.35rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
          cursor: default;
        }

        .helix-side-label-item:last-child {
          border-bottom: none;
        }

        .helix-side-label-item:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .helix-side-label-item.human:hover {
          color: #e87957;
        }

        .helix-side-label-item.ai:hover {
          color: #d4af37;
        }

        .helix-container {
          position: relative;
          width: var(--helix-width);
          height: var(--helix-height);
          transform-style: preserve-3d;
        }

        .helix-structure {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: helixRotate 25s linear infinite;
        }

        .helix-rung {
          position: absolute;
          left: 50%;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .helix-node {
          width: var(--helix-node-size);
          height: var(--helix-node-size);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          transition: all 0.3s ease;
          cursor: pointer;
          gap: 2px;
        }

        .helix-node:hover {
          transform: scale(1.08) !important;
        }

        .helix-human-node {
          background: linear-gradient(135deg, rgba(232, 121, 87, 0.12), rgba(232, 121, 87, 0.04));
          border: 1px solid rgba(232, 121, 87, 0.5);
          animation: nodeFloat 4s ease-in-out infinite;
        }

        .helix-human-node:hover {
          border-color: rgba(232, 121, 87, 0.9);
          background: linear-gradient(135deg, rgba(232, 121, 87, 0.25), rgba(232, 121, 87, 0.1));
        }

        .helix-ai-node {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(212, 175, 55, 0.04));
          border: 1px solid rgba(212, 175, 55, 0.5);
          animation: nodeFloatBack 4s ease-in-out infinite;
        }

        .helix-ai-node:hover {
          border-color: rgba(212, 175, 55, 0.9);
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.1));
        }

        .helix-element-symbol {
          font-size: clamp(1rem, calc(1.25rem * var(--helix-font-scale)), 1.4rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .helix-element-number {
          font-size: clamp(0.4rem, calc(0.5rem * var(--helix-font-scale)), 0.55rem);
          font-weight: 500;
          opacity: 0.6;
          letter-spacing: 0.05em;
        }

        .helix-human-text { color: #e87957; }
        .helix-ai-text { color: #d4af37; }

        .helix-connection {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(232, 121, 87, 0.4),
            rgba(255, 255, 255, 0.15),
            rgba(212, 175, 55, 0.4)
          );
          animation: pulseConnection 3s ease-in-out infinite;
        }

        .helix-flow-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          top: -2.5px;
        }

        .helix-flow-to-ai {
          background: #e87957;
          box-shadow: 0 0 8px rgba(232, 121, 87, 0.6);
          animation: flowDot 3s linear infinite;
        }

        .helix-flow-to-human {
          background: #d4af37;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
          animation: flowDotReverse 3s linear infinite;
        }

        .helix-emergence-zone {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: var(--helix-emergence-size);
          height: var(--helix-emergence-size);
          border-radius: 8px;
          background: linear-gradient(135deg,
            rgba(232, 121, 87, 0.08) 0%,
            rgba(212, 175, 55, 0.08) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.15);
          animation: emergePulse 4s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          gap: 2px;
        }

        .helix-emergence-symbol {
          font-size: clamp(1.2rem, calc(1.5rem * var(--helix-font-scale)), 1.7rem);
          font-weight: 600;
          background: linear-gradient(135deg, #e87957, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .helix-emergence-label {
          font-size: clamp(0.35rem, calc(0.45rem * var(--helix-font-scale)), 0.5rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .helix-result-section {
          text-align: center;
          animation: fadeSlideUp 0.6s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
          max-width: 400px;
          padding: 0 1rem;
        }

        .helix-result-divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          margin: 0 auto 1rem;
        }

        .helix-result-label {
          font-size: clamp(0.5rem, calc(0.6rem * var(--helix-font-scale)), 0.65rem);
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          margin-bottom: 0.5rem;
        }

        .helix-result-headline {
          font-size: clamp(1.1rem, calc(1.5rem * var(--helix-font-scale)), 1.7rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 0.5rem;
          background: linear-gradient(
            90deg,
            #e87957 0%,
            #d4af37 35%,
            #ffffff 50%,
            #d4af37 65%,
            #e87957 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: subtleShimmer 8s linear infinite;
        }

        .helix-result-subtext {
          font-size: clamp(0.7rem, calc(0.85rem * var(--helix-font-scale)), 0.95rem);
          color: rgba(255, 255, 255, 0.45);
          font-weight: 400;
          line-height: 1.6;
        }

        .helix-result-emphasis {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Large desktop (1440px+) */
        @media (min-width: 1440px) {
          .helix-wrapper {
            --helix-scale: 1.1;
            --helix-width: 300px;
            --helix-height: 390px;
            --helix-node-size: 52px;
            --helix-node-offset: 88px;
            --helix-connection-width: 120px;
            --helix-emergence-size: 78px;
            --helix-font-scale: 1.05;
          }
        }

        /* Desktop (1280-1439px) */
        @media (min-width: 1280px) and (max-width: 1439px) {
          .helix-wrapper {
            --helix-scale: 1;
            --helix-width: 280px;
            --helix-height: 360px;
            --helix-node-size: 48px;
            --helix-node-offset: 80px;
            --helix-connection-width: 110px;
            --helix-emergence-size: 72px;
            --helix-font-scale: 1;
          }
        }

        /* Small desktop / large tablet (1024-1279px) - HIDE SIDE LABELS */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .helix-wrapper {
            --helix-scale: 0.9;
            --helix-width: 260px;
            --helix-height: 340px;
            --helix-node-size: 44px;
            --helix-node-offset: 75px;
            --helix-connection-width: 100px;
            --helix-emergence-size: 66px;
            --helix-font-scale: 0.95;
          }

          .helix-side-labels {
            display: none;
          }

          .helix-main-section {
            gap: 0;
          }
        }

        /* Tablet landscape (768-1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .helix-wrapper {
            --helix-scale: 0.85;
            --helix-width: 240px;
            --helix-height: 310px;
            --helix-node-size: 42px;
            --helix-node-offset: 70px;
            --helix-connection-width: 95px;
            --helix-emergence-size: 62px;
            --helix-gap: 1.5rem;
            --helix-side-min-width: 85px;
            --helix-font-scale: 0.9;
          }

          .helix-side-labels {
            display: none;
          }

          .helix-main-section {
            gap: 0;
          }
        }

        /* Tablet portrait / large phone (480-767px) */
        @media (min-width: 480px) and (max-width: 767px) {
          .helix-wrapper {
            --helix-scale: 0.75;
            --helix-width: 220px;
            --helix-height: 280px;
            --helix-node-size: 38px;
            --helix-node-offset: 62px;
            --helix-connection-width: 85px;
            --helix-emergence-size: 56px;
            --helix-gap: 1rem;
            --helix-side-min-width: auto;
            --helix-font-scale: 0.85;
          }

          .helix-main-section {
            flex-direction: column;
          }

          .helix-side-labels {
            flex-direction: row;
            gap: 1.5rem;
            justify-content: center;
          }

          .helix-side-labels.right {
            align-items: flex-start;
          }
        }

        /* Mobile (375-479px) */
        @media (min-width: 375px) and (max-width: 479px) {
          .helix-wrapper {
            --helix-scale: 0.65;
            --helix-width: 200px;
            --helix-height: 260px;
            --helix-node-size: 34px;
            --helix-node-offset: 55px;
            --helix-connection-width: 75px;
            --helix-emergence-size: 50px;
            --helix-gap: 0.75rem;
            --helix-side-min-width: auto;
            --helix-font-scale: 0.8;
          }

          .helix-main-section {
            flex-direction: column;
          }

          .helix-side-labels {
            flex-direction: row;
            gap: 1rem;
            justify-content: center;
          }

          .helix-side-labels.right {
            align-items: flex-start;
          }

          .helix-result-section {
            max-width: 280px;
          }
        }

        /* Extra small mobile (<375px) */
        @media (max-width: 374px) {
          .helix-wrapper {
            --helix-scale: 0.55;
            --helix-width: 180px;
            --helix-height: 230px;
            --helix-node-size: 30px;
            --helix-node-offset: 48px;
            --helix-connection-width: 65px;
            --helix-emergence-size: 44px;
            --helix-font-scale: 0.75;
          }

          .helix-main-section {
            flex-direction: column;
          }

          .helix-side-labels {
            flex-direction: row;
            gap: 0.75rem;
            justify-content: center;
          }

          .helix-side-labels.right {
            align-items: flex-start;
          }

          .helix-result-section {
            max-width: 260px;
          }
        }
      `}</style>

      <div className="helix-wrapper">
        <div className="helix-header-section">
          <div className="helix-header-label">Symbiotic Intelligence</div>
          <div className="helix-header-title">Human + AI: Greater Than The Sum of Parts</div>
        </div>

        <div className="helix-main-section">
          {/* Left side - Human attributes */}
          <div className="helix-side-labels">
            <div className="helix-side-label-header helix-human-color">Human</div>
            {humanAttributes.map((attr, i) => (
              <div key={i} className="helix-side-label-item human">{attr}</div>
            ))}
          </div>

          {/* Helix visualization */}
          <div className="helix-container">
            <div className="helix-structure">
              {Array.from({ length: 7 }, (_, i) => {
                const angle = (i / 7) * 360;
                // Use percentage-based positioning relative to container height
                const yPercent = (i / 6) * 88 + 6; // 6% to 94% of container

                return (
                  <div
                    key={i}
                    className="helix-rung"
                    style={{
                      top: `${yPercent}%`,
                      transform: `translateX(-50%) rotateY(${angle}deg)`,
                    }}
                  >
                    {/* Human node - element style */}
                    <div
                      className="helix-node helix-human-node"
                      style={{
                        left: 'calc(-1 * var(--helix-node-offset))',
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      <span className="helix-element-number helix-human-text">{i + 1}</span>
                      <span className="helix-element-symbol helix-human-text">Hu</span>
                    </div>

                    {/* Connection */}
                    <div
                      className="helix-connection"
                      style={{
                        width: 'var(--helix-connection-width)',
                        left: 'calc(-0.5 * var(--helix-connection-width))',
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      <div
                        className="helix-flow-dot helix-flow-to-ai"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                      <div
                        className="helix-flow-dot helix-flow-to-human"
                        style={{ animationDelay: `${i * 0.4 + 1.5}s` }}
                      />
                    </div>

                    {/* AI node - element style */}
                    <div
                      className="helix-node helix-ai-node"
                      style={{
                        right: 'calc(-1 * var(--helix-node-offset))',
                        animationDelay: `${i * 0.3 + 0.15}s`,
                      }}
                    >
                      <span className="helix-element-number helix-ai-text">{i + 1}</span>
                      <span className="helix-element-symbol helix-ai-text">Ai</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central emergence zone - also element style */}
            <div className="helix-emergence-zone">
              <span className="helix-emergence-label">Synergy</span>
              <span className="helix-emergence-symbol">Sy</span>
            </div>
          </div>

          {/* Right side - AI attributes */}
          <div className="helix-side-labels right">
            <div className="helix-side-label-header helix-ai-color">AI</div>
            {aiAttributes.map((attr, i) => (
              <div key={i} className="helix-side-label-item ai">{attr}</div>
            ))}
          </div>
        </div>

        <div className="helix-result-section">
          <div className="helix-result-divider" />
          <div className="helix-result-label">The Result</div>
          <div className="helix-result-headline">Genuine Competitive Advantage</div>
          <div className="helix-result-subtext">
            <span className="helix-result-emphasis">Each extends the other.</span> Human insight guides AI capability. AI amplifies human potential.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementHelix;
