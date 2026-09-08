import React from 'react';

// 1. Ace of Spades Playing Card Sticker (Bos's Favorite!)
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
        <rect x="3" y="3" width="94" height="132" rx="10" fill="#ffffff" />
        <rect x="7" y="7" width="86" height="124" rx="7" fill="#08080e" stroke="#1c1c28" strokeWidth="2" />
        
        <line x1="7" y1="34" x2="93" y2="34" stroke="#161622" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="7" y1="104" x2="93" y2="104" stroke="#161622" strokeWidth="1" strokeDasharray="3 3" />

        <text x="14" y="25" fill="#ccff00" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="16">A</text>
        <path d="M19 30 C19 30 14 35 14 37.5 C14 39.5 15.5 40.5 17.5 40.5 C18.5 40.5 19 39.8 19 39.8 C19 39.8 19.5 40.5 20.5 40.5 C22.5 40.5 24 39.5 24 37.5 C24 35 19 30 19 30 Z M18 40.5 L17 43 L21 43 L20 40.5 Z" fill="#ccff00" />

        <g transform="rotate(180 50 69)">
          <text x="14" y="25" fill="#ccff00" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="16">A</text>
          <path d="M19 30 C19 30 14 35 14 37.5 C14 39.5 15.5 40.5 17.5 40.5 C18.5 40.5 19 39.8 19 39.8 C19 39.8 19.5 40.5 20.5 40.5 C22.5 40.5 24 39.5 24 37.5 C24 35 19 30 19 30 Z M18 40.5 L17 43 L21 43 L20 40.5 Z" fill="#ccff00" />
        </g>

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

// 2. Gritty Isometric Dice Pair Sticker (Bos's Favorite!)
export function DicePairSticker({ className = '', size = 64, rotation = '12deg' }) {
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

          <circle cx="26" cy="20" r="3.5" fill="#ccff00" />
          <circle cx="10" cy="30" r="2.5" fill="#ccff00" />
          <circle cx="20" cy="36" r="2.5" fill="#ccff00" />
          <circle cx="15" cy="44" r="2.5" fill="#ccff00" />
          <circle cx="10" cy="52" r="2.5" fill="#ccff00" />
          <circle cx="20" cy="58" r="2.5" fill="#ccff00" />

          <circle cx="34" cy="36" r="2.5" fill="#ccff00" />
          <circle cx="39" cy="44" r="2.5" fill="#ccff00" />
          <circle cx="44" cy="52" r="2.5" fill="#ccff00" />
        </g>

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

          <circle cx="18" cy="16" r="2.5" fill="#050507" />
          <circle cx="34" cy="24" r="2.5" fill="#050507" />

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

// 3. Spilled Coffee Cup Sticker (Generated with Imagen 3 & Clean Cutout)
export function SpilledCoffeeSticker({ className = '', size = 76, rotation = '-10deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Gelas Kopi Tumpah"
    >
      <img
        src="/stickers/spilled_coffee_clean.png"
        alt="Spilled Coffee Sticker"
        style={{ width: size, height: 'auto' }}
        className="filter drop-shadow-[0_0_2px_#ffffff] drop-shadow-[0_0_4px_#ffffff]"
        draggable="false"
      />
    </div>
  );
}

// 4. Distressed Plastic Chair Sticker (Generated with Imagen 3 & Clean Cutout)
export function PlasticChairSticker({ className = '', size = 72, rotation = '8deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[5px_5px_0px_#000000] ${className}`}
      title="Kursi Plastik Santai"
    >
      <img
        src="/stickers/plastic_chair_clean.png"
        alt="Plastic Chair Sticker"
        style={{ width: size, height: 'auto' }}
        className="filter drop-shadow-[0_0_2px_#ffffff] drop-shadow-[0_0_4px_#ffffff]"
        draggable="false"
      />
    </div>
  );
}

// 5. Standalone Cyber Spade Emblem Sticker (Minimalist Spade)
export function SpadeEmblemSticker({ className = '', size = 42, rotation = '-8deg' }) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`inline-block select-none transition-transform duration-200 hover:rotate-0 hover:scale-110 cursor-default drop-shadow-[4px_4px_0px_#000000] ${className}`}
      title="Spade Icon"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path
          d="M40 8 C40 8 10 38 10 52 C10 65 22 72 34 72 C39 72 40 68 40 68 C40 68 41 72 46 72 C58 72 70 65 70 52 C70 38 40 8 40 8 Z M36 71 L32 78 L48 78 L44 71 Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M40 14 C40 14 16 40 16 50 C16 60 25 66 35 66 C38 66 40 63 40 63 C40 63 42 66 45 66 C55 66 64 60 64 50 C64 40 40 14 40 14 Z M37 65 L35 74 L45 74 L43 65 Z"
          fill="#0a0a10"
          stroke="#ccff00"
          strokeWidth="3"
        />
        <circle cx="40" cy="46" r="4" fill="#ccff00" />
      </svg>
    </div>
  );
}

// 6. Poker Chip Sticker
export function PokerChipSticker({ className = '', size = 58, rotation = '-9deg' }) {
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
