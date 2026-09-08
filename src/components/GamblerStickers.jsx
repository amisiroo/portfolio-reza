import React from 'react';

// 1. Ace of Spades Playing Card Sticker (The signature one Bos loves!)
export function SpadeCardSticker({ className = '', size = 84, rotation = '-7deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Ace of Spades"
    >
      <svg
        width={size}
        height={size * 1.38}
        viewBox="0 0 100 138"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Thick White Die-Cut Base */}
        <rect x="3" y="3" width="94" height="132" rx="10" fill="#ffffff" />
        {/* Inner Card Body */}
        <rect x="7" y="7" width="86" height="124" rx="7" fill="#08080e" stroke="#1c1c28" strokeWidth="2" />
        
        {/* Grid Accent Lines */}
        <line x1="7" y1="34" x2="93" y2="34" stroke="#161622" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="7" y1="104" x2="93" y2="104" stroke="#161622" strokeWidth="1" strokeDasharray="3 3" />

        {/* Top-Left 'A' & Spade */}
        <text x="14" y="25" fill="#ccff00" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="16">A</text>
        <path d="M19 30 C19 30 14 35 14 37.5 C14 39.5 15.5 40.5 17.5 40.5 C18.5 40.5 19 39.8 19 39.8 C19 39.8 19.5 40.5 20.5 40.5 C22.5 40.5 24 39.5 24 37.5 C24 35 19 30 19 30 Z M18 40.5 L17 43 L21 43 L20 40.5 Z" fill="#ccff00" />

        {/* Bottom-Right 'A' & Spade (Inverted) */}
        <g transform="rotate(180 50 69)">
          <text x="14" y="25" fill="#ccff00" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="16">A</text>
          <path d="M19 30 C19 30 14 35 14 37.5 C14 39.5 15.5 40.5 17.5 40.5 C18.5 40.5 19 39.8 19 39.8 C19 39.8 19.5 40.5 20.5 40.5 C22.5 40.5 24 39.5 24 37.5 C24 35 19 30 19 30 Z M18 40.5 L17 43 L21 43 L20 40.5 Z" fill="#ccff00" />
        </g>

        {/* Center Massive Distressed Spade */}
        <g transform="translate(50, 69)">
          <path
            d="M0 -28 C0 -28 -24 -2 -24 10 C-24 20 -15 26 -4 26 C-0.5 26 0 24 0 24 C0 24 0.5 26 4 26 C15 26 24 20 24 10 C24 -2 0 -28 0 -28 Z M-3 25 L-6 34 L6 34 L3 25 Z"
            fill="#ccff00"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M0 -22 C0 -22 -18 -1 -18 8 C-18 15 -11 20 -3 20 C0 20 0 18 0 18 C0 18 0 20 3 20 C11 20 18 15 18 8 C18 -1 0 -22 0 -22 Z"
            fill="#050507"
          />
          <circle cx="0" cy="5" r="3" fill="#ccff00" />
        </g>
      </svg>
    </div>
  );
}

// 2. Gritty Isometric Dice Pair Sticker
export function DicePairSticker({ className = '', size = 66, rotation = '12deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Snake Eyes • Lucky Roll"
    >
      <svg
        width={size * 1.3}
        height={size}
        viewBox="0 0 130 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Die 1 (Left - Showing 5 & 3) */}
        <g transform="translate(5, 10)">
          <path
            d="M26 4 L56 18 L56 58 L26 74 L4 58 L4 18 Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M26 7 L52 20 L26 33 L4 20 Z" fill="#141420" stroke="#050507" strokeWidth="2" />
          <path d="M4 20 L26 33 L26 68 L4 55 Z" fill="#08080d" stroke="#050507" strokeWidth="2" />
          <path d="M26 33 L52 20 L52 55 L26 68 Z" fill="#0c0c14" stroke="#050507" strokeWidth="2" />

          {/* Top Face Pip */}
          <circle cx="26" cy="20" r="3.5" fill="#ccff00" />

          {/* Left Face Pips (5 pips) */}
          <circle cx="10" cy="30" r="2.5" fill="#ccff00" />
          <circle cx="20" cy="36" r="2.5" fill="#ccff00" />
          <circle cx="15" cy="44" r="2.5" fill="#ccff00" />
          <circle cx="10" cy="52" r="2.5" fill="#ccff00" />
          <circle cx="20" cy="58" r="2.5" fill="#ccff00" />

          {/* Right Face Pips (3 pips) */}
          <circle cx="34" cy="36" r="2.5" fill="#ccff00" />
          <circle cx="39" cy="44" r="2.5" fill="#ccff00" />
          <circle cx="44" cy="52" r="2.5" fill="#ccff00" />
        </g>

        {/* Die 2 (Right - Showing 6 & 2) */}
        <g transform="translate(65, 20)">
          <path
            d="M26 4 L56 18 L56 58 L26 74 L4 58 L4 18 Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M26 7 L52 20 L26 33 L4 20 Z" fill="#ccff00" stroke="#050507" strokeWidth="2" />
          <path d="M4 20 L26 33 L26 68 L4 55 Z" fill="#08080d" stroke="#050507" strokeWidth="2" />
          <path d="M26 33 L52 20 L52 55 L26 68 Z" fill="#12121c" stroke="#050507" strokeWidth="2" />

          {/* Top Face Pips */}
          <circle cx="18" cy="16" r="2.5" fill="#050507" />
          <circle cx="34" cy="24" r="2.5" fill="#050507" />

          {/* Left Face Pips */}
          <circle cx="10" cy="30" r="2" fill="#ffffff" />
          <circle cx="20" cy="36" r="2" fill="#ffffff" />
          <circle cx="10" cy="42" r="2" fill="#ffffff" />
          <circle cx="20" cy="48" r="2" fill="#ffffff" />
          <circle cx="10" cy="54" r="2" fill="#ffffff" />
          <circle cx="20" cy="60" r="2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// 3. Cyber Poker Casino Chip Sticker
export function PokerChipSticker({ className = '', size = 62, rotation = '-9deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="High Stakes Token"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <circle cx="50" cy="50" r="47" fill="#ffffff" stroke="#ffffff" strokeWidth="4" />
        <circle cx="50" cy="50" r="44" fill="#090910" stroke="#ccff00" strokeWidth="4" />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <line
            key={idx}
            x1="50"
            y1="6"
            x2="50"
            y2="16"
            stroke="#ffffff"
            strokeWidth="6"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        <circle cx="50" cy="50" r="28" fill="#12121c" stroke="#ccff00" strokeWidth="2" strokeDasharray="4 2" />

        <path
          d="M50 34 C50 34 38 48 38 54 C38 60 42 63 47 63 C49 63 50 62 50 62 C50 62 51 63 53 63 C58 63 62 60 62 54 C62 48 50 34 50 34 Z M48 62 L46 68 L54 68 L52 62 Z"
          fill="#ccff00"
        />
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#050507"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="900"
          fontSize="10"
        >
          ♠
        </text>
      </svg>
    </div>
  );
}

// 4. Lucky 7s Slot Machine Sticker
export function LuckySevenSticker({ className = '', size = 68, rotation = '7deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Jackpot 777"
    >
      <svg
        width={size * 1.1}
        height={size}
        viewBox="0 0 110 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path
          d="M10 15 L95 10 L102 75 L15 82 Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M14 18 L91 14 L98 71 L20 77 Z"
          fill="#0c0c14"
          stroke="#ccff00"
          strokeWidth="2"
        />

        <text
          x="32"
          y="58"
          fill="#ffffff"
          fontFamily="Cabinet Grotesk, JetBrains Mono, sans-serif"
          fontWeight="900"
          fontSize="42"
          stroke="#000000"
          strokeWidth="3"
          paintOrder="stroke fill"
        >
          7
        </text>
        <text
          x="54"
          y="58"
          fill="#ccff00"
          fontFamily="Cabinet Grotesk, JetBrains Mono, sans-serif"
          fontWeight="900"
          fontSize="46"
          stroke="#000000"
          strokeWidth="3"
          paintOrder="stroke fill"
        >
          7
        </text>
        <text
          x="78"
          y="58"
          fill="#ffffff"
          fontFamily="Cabinet Grotesk, JetBrains Mono, sans-serif"
          fontWeight="900"
          fontSize="42"
          stroke="#000000"
          strokeWidth="3"
          paintOrder="stroke fill"
        >
          7
        </text>

        <rect x="25" y="62" width="60" height="12" fill="#ccff00" />
        <text
          x="55"
          y="71"
          textAnchor="middle"
          fill="#000000"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="900"
          fontSize="8"
          letterSpacing="1"
        >
          JACKPOT // 777
        </text>
      </svg>
    </div>
  );
}

// 5. Grungy 8-Ball Token Sticker
export function EightBallSticker({ className = '', size = 58, rotation = '-12deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Magic 8-Ball"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <circle cx="50" cy="50" r="47" fill="#ffffff" stroke="#ffffff" strokeWidth="4" />
        <circle cx="50" cy="50" r="43" fill="#08080e" stroke="#1c1c28" strokeWidth="2" />

        <path
          d="M24 24 C34 16 48 16 60 20"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
        />

        <circle cx="50" cy="50" r="18" fill="#ffffff" />
        <text
          x="50"
          y="57"
          textAnchor="middle"
          fill="#000000"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="900"
          fontSize="22"
        >
          8
        </text>
      </svg>
    </div>
  );
}

// 6. Ace of Clubs / Joker Wild Card Sticker
export function WildCardSticker({ className = '', size = 78, rotation = '14deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Wild Card Joker"
    >
      <svg
        width={size}
        height={size * 1.38}
        viewBox="0 0 100 138"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <rect x="3" y="3" width="94" height="132" rx="10" fill="#ffffff" />
        <rect x="7" y="7" width="86" height="124" rx="7" fill="#0c0c14" stroke="#222232" strokeWidth="2" />

        {/* Diagonal Cyber Stripes */}
        <line x1="15" y1="15" x2="85" y2="123" stroke="#181826" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="85" y1="15" x2="15" y2="123" stroke="#181826" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Top-Left 'J' */}
        <text x="14" y="26" fill="#ffffff" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="15">J</text>

        {/* Bottom-Right 'J' (Inverted) */}
        <g transform="rotate(180 50 69)">
          <text x="14" y="26" fill="#ffffff" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="15">J</text>
        </g>

        {/* Center Neon Diamond / Emblem */}
        <g transform="translate(50, 69)">
          <path
            d="M0 -24 L20 0 L0 24 L-20 0 Z"
            fill="#ccff00"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          <circle cx="0" cy="0" r="5" fill="#050507" />
        </g>
        <text
          x="50"
          y="108"
          textAnchor="middle"
          fill="#ccff00"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="800"
          fontSize="9"
          letterSpacing="1"
        >
          WILD CARD
        </text>
      </svg>
    </div>
  );
}
