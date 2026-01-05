
import React from 'react';

const SigilPortrait: React.FC = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--holo-cyan)]/10 to-[var(--holo-gold)]/10 blur-[100px] rounded-full" />
      
      {/* The Frame - Matching the geometric style of the screenshot */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 overflow-visible">
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer subtle ivory circle */}
        <circle cx="100" cy="100" r="98" fill="rgba(255, 255, 255, 0.4)" stroke="var(--stroke)" strokeWidth="0.5" />

        {/* Square Frame */}
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="var(--holo-gold)" strokeWidth="0.5" opacity="0.6" />
        
        {/* Central Vertical Axis */}
        <line x1="100" y1="50" x2="100" y2="150" stroke="var(--navy)" strokeWidth="0.5" opacity="0.4" />
        
        {/* Top Alignment Sun */}
        <circle cx="100" cy="58" r="3.5" fill="var(--holo-gold)" filter="url(#softGlow)" />

        {/* Symmetric Arcs / Crescents */}
        <g stroke="var(--navy)" fill="none" strokeWidth="0.6" opacity="0.5">
          {/* Left Crescent */}
          <path d="M60,60 Q40,100 60,140" />
          {/* Right Crescent */}
          <path d="M140,60 Q160,100 140,140" />
          {/* Large connecting arcs */}
          <path d="M30,100 Q100,20 170,100" stroke="var(--holo-gold)" strokeWidth="0.3" />
          <path d="M45,100 Q100,160 155,100" stroke="var(--holo-cyan)" strokeWidth="0.3" />
        </g>

        {/* Stylized Symbol Placeholder (Rooster Sigil) */}
        <g transform="translate(65, 65) scale(0.35)" stroke="var(--navy)" fill="none" strokeWidth="1.5">
          {/* Simplified Line Art Rooster inspired by the screenshot */}
          <path d="M100,50 L120,80 L100,110 L80,80 Z" stroke="var(--holo-gold)" />
          <path d="M100,110 C120,130 150,110 160,80" />
          <path d="M100,110 C80,130 50,110 40,80" />
          <path d="M100,50 C110,30 130,30 140,50" />
          <path d="M100,50 C90,30 70,30 60,50" />
          {/* Beak/Head Area */}
          <path d="M100,70 L110,75 L100,80" />
          <circle cx="95" cy="73" r="2" fill="var(--navy)" />
        </g>

        {/* Diagonal crossing lines for extra geometry */}
        <line x1="60" y1="140" x2="140" y2="60" stroke="var(--stroke)" strokeWidth="0.5" />
        <line x1="60" y1="60" x2="140" y2="140" stroke="var(--stroke)" strokeWidth="0.5" />
      </svg>
      
      {/* Identity Label Overlay */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="mono text-[8px] font-bold text-[var(--holo-gold)] uppercase tracking-[0.6em] text-center mb-1">MASTER_IDENTITY_PROTOCOL</div>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--stroke)] to-transparent mx-auto"></div>
      </div>
    </div>
  );
};

export default SigilPortrait;
