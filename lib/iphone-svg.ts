export function createiPhoneSVG(color: string, isPro: boolean) {
  const proModules = isPro ? `
    <!-- Camera Module -->
    <rect x="38" y="28" width="32" height="32" rx="6" fill="#2A2A2C" />
    <circle cx="45" cy="37" r="3.5" fill="#3A3A3C" />
    <circle cx="55" cy="37" r="3.5" fill="#3A3A3C" />
    <rect x="38" y="46" width="32" height="32" rx="6" fill="#2A2A2C" />
    <circle cx="45" cy="55" r="3.5" fill="#3A3A3C" />
  ` : '';

  return `
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- iPhone Frame with gradient -->
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: ${color}; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: ${color}; stop-opacity: 0.7" />
        </linearGradient>
        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: ${color}; stop-opacity: 0.15" />
          <stop offset="50%" style="stop-color: ${color}; stop-opacity: 0.05" />
          <stop offset="100%" style="stop-color: ${color}; stop-opacity: 0.15" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${color}" flood-opacity="0.2" />
        </filter>
      </defs>

      <!-- Main Device Shadow -->
      <ellipse cx="100" cy="275" rx="70" ry="8" fill="rgba(0, 0, 0, 0.1)" />

      <!-- iPhone Frame -->
      <rect x="25" y="15" width="150" height="250" rx="32"
            fill="url(#frameGradient)"
            filter="url(#shadow)" />

      <!-- Screen Area -->
      <rect x="35" y="25" width="130" height="220" rx="24" fill="#0A0A0A" />

      <!-- Dynamic Island / Notch -->
      <rect x="75" y="32" width="50" height="22" rx="11" fill="#0A0A0A" />

      <!-- Side Button -->
      <rect x="175" y="90" width="6" height="30" rx="3" fill="#2A2A2C" opacity="0.3" />

      <!-- Volume Buttons -->
      <rect x="176" y="130" width="5" height="25" rx="2.5" fill="#2A2A2C" opacity="0.3" />
      <rect x="176" y="160" width="5" height="25" rx="2.5" fill="#2A2A2C" opacity="0.3" />

      ${proModules}

      <!-- Screen Content Gradient -->
      <rect x="35" y="25" width="130" height="220" rx="24" fill="url(#screenGradient)" opacity="0.3" />

      <!-- Camera Dot -->
      <circle cx="90" cy="45" r="4" fill="#1A1A1A" />
    </svg>
  `;
}

export function createSmalliPhoneSVG(color: string) {
  return `
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="smallFrameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: ${color}; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: ${color}; stop-opacity: 0.7" />
        </linearGradient>
      </defs>
      <rect x="10" y="6" width="60" height="100" rx="16" fill="url(#smallFrameGradient)" />
      <rect x="15" y="11" width="50" height="80" rx="12" fill="#0A0A0A" />
      <rect x="32" y="16" width="16" height="14" rx="7" fill="#0A0A0A" />
    </svg>
  `;
}
