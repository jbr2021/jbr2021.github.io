import React from 'react';

const JBRLogo = ({ width = 160, height = 45, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 220 60" 
      width={width} 
      height={height} 
      className={`jbr-logo ${className}`}
      fill="none"
      aria-label="JBR AI Engineer Logo"
    >
      <defs>
        <linearGradient id="jbrGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="jbrGlowHex" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
        </linearGradient>
        <filter id="jbrGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal Neural Node Icon */}
      <g transform="translate(6, 6)">
        <path 
          d="M 24,3 L 43,14 L 43,34 L 24,45 L 5,34 L 5,14 Z" 
          fill="url(#jbrGlowHex)" 
          stroke="url(#jbrGradPrimary)" 
          strokeWidth="2.2" 
          strokeLinejoin="round" 
        />
        {/* Core Node & Graph Vectors */}
        <circle cx="24" cy="24" r="4" fill="#38bdf8" filter="url(#jbrGlowFilter)" />
        <line x1="24" y1="24" x2="24" y2="10" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2,2" />
        <line x1="24" y1="24" x2="36" y2="31" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="2,2" />
        <line x1="24" y1="24" x2="12" y2="31" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="2,2" />
        <circle cx="24" cy="10" r="2.5" fill="#22d3ee" />
        <circle cx="36" cy="31" r="2.5" fill="#818cf8" />
        <circle cx="12" cy="31" r="2.5" fill="#38bdf8" />
      </g>

      {/* JBR Text Monogram */}
      <text 
        x="65" 
        y="38" 
        fontFamily="Inter, system-ui, -apple-system, sans-serif" 
        fontWeight="800" 
        fontSize="28" 
        letterSpacing="-1px"
      >
        <tspan fill="url(#jbrGradPrimary)">JBR</tspan>
      </text>

      {/* AI Subtitle Badge */}
      <text 
        x="132" 
        y="38" 
        fontFamily="Inter, system-ui, -apple-system, sans-serif" 
        fontWeight="600" 
        fontSize="13" 
        fill="var(--text-muted, #94a3b8)" 
        letterSpacing="0.5px"
      >
        .AI
      </text>
    </svg>
  );
};

export default JBRLogo;
