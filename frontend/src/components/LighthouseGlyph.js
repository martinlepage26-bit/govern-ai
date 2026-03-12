import { useId } from 'react';

const LighthouseGlyph = ({ className = '', title = 'PHAROS observability mark' }) => {
  const uid = useId().replace(/:/g, '');
  const ids = {
    frameFill: `${uid}-frame-fill`,
    frameStroke: `${uid}-frame-stroke`,
    edgeLight: `${uid}-edge-light`,
    eyeFill: `${uid}-eye-fill`,
    eyeStroke: `${uid}-eye-stroke`,
    beamFill: `${uid}-beam-fill`,
    beamCore: `${uid}-beam-core`,
    towerFill: `${uid}-tower-fill`,
    towerEdge: `${uid}-tower-edge`,
    lensFill: `${uid}-lens-fill`,
    lensStroke: `${uid}-lens-stroke`,
    horizonStroke: `${uid}-horizon-stroke`,
    gemFill: `${uid}-gem-fill`
  };

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={ids.frameFill} x1="11" y1="8.8" x2="37.6" y2="39.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF4D8" stopOpacity="0.22" />
          <stop offset="0.28" stopColor="#D4AC53" stopOpacity="0.14" />
          <stop offset="0.68" stopColor="#6B8FD8" stopOpacity="0.08" />
          <stop offset="1" stopColor="#4C327D" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={ids.frameStroke} x1="10.2" y1="7.7" x2="38.4" y2="40.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8E4" />
          <stop offset="0.2" stopColor="#F4D17C" />
          <stop offset="0.48" stopColor="#D39C29" />
          <stop offset="0.76" stopColor="#6A87D6" />
          <stop offset="1" stopColor="#4E397F" />
        </linearGradient>
        <linearGradient id={ids.edgeLight} x1="13.7" y1="11.6" x2="32.4" y2="33.7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF4" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#F7DC9A" stopOpacity="0.44" />
          <stop offset="0.72" stopColor="#88B5FF" stopOpacity="0.12" />
          <stop offset="1" stopColor="#88B5FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.eyeFill} x1="11.6" y1="15.3" x2="35.7" y2="33.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EEF6FF" stopOpacity="0.18" />
          <stop offset="0.36" stopColor="#99B8FF" stopOpacity="0.14" />
          <stop offset="0.72" stopColor="#7C63C8" stopOpacity="0.11" />
          <stop offset="1" stopColor="#33234D" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={ids.eyeStroke} x1="11.6" y1="14.1" x2="35.9" y2="33.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8E8" />
          <stop offset="0.26" stopColor="#F0CE79" />
          <stop offset="0.52" stopColor="#C7922D" />
          <stop offset="0.78" stopColor="#6F8CDA" />
          <stop offset="1" stopColor="#5D4593" />
        </linearGradient>
        <linearGradient id={ids.beamFill} x1="24" y1="15.2" x2="24" y2="1.85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAF1D3" stopOpacity="0.2" />
          <stop offset="0.2" stopColor="#A5EDF7" stopOpacity="0.56" />
          <stop offset="0.55" stopColor="#7FA9FF" stopOpacity="0.34" />
          <stop offset="0.82" stopColor="#8A69D6" stopOpacity="0.17" />
          <stop offset="1" stopColor="#8A69D6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.beamCore} x1="24" y1="15.05" x2="24" y2="2.45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF7E2" />
          <stop offset="0.18" stopColor="#F4D88A" />
          <stop offset="0.48" stopColor="#98EDFF" stopOpacity="0.95" />
          <stop offset="0.76" stopColor="#7F92F2" stopOpacity="0.68" />
          <stop offset="1" stopColor="#8D6DD7" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={ids.towerFill} x1="20.2" y1="16.1" x2="28.9" y2="39.7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF3D8" stopOpacity="0.22" />
          <stop offset="0.34" stopColor="#D6AE59" stopOpacity="0.17" />
          <stop offset="0.74" stopColor="#7E87C6" stopOpacity="0.08" />
          <stop offset="1" stopColor="#4C356C" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={ids.towerEdge} x1="20.1" y1="16.6" x2="29.3" y2="38.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFCEF" />
          <stop offset="0.18" stopColor="#F5DE97" />
          <stop offset="0.36" stopColor="#D79B26" />
          <stop offset="0.6" stopColor="#F3D17A" />
          <stop offset="0.83" stopColor="#8B70B7" />
          <stop offset="1" stopColor="#5B421C" />
        </linearGradient>
        <radialGradient id={ids.lensFill} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.75 21.8) rotate(42.5) scale(8.7 9.8)">
          <stop stopColor="#F3FAFF" stopOpacity="0.34" />
          <stop offset="0.35" stopColor="#8DE6F5" stopOpacity="0.24" />
          <stop offset="0.68" stopColor="#7999F0" stopOpacity="0.18" />
          <stop offset="1" stopColor="#6F54B2" stopOpacity="0.16" />
        </radialGradient>
        <linearGradient id={ids.lensStroke} x1="19.2" y1="19.15" x2="28.7" y2="29.55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8E7" />
          <stop offset="0.25" stopColor="#F1CD78" />
          <stop offset="0.48" stopColor="#84D9F1" />
          <stop offset="0.78" stopColor="#7688E8" />
          <stop offset="1" stopColor="#5B458E" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={ids.horizonStroke} x1="18.95" y1="23.45" x2="29.1" y2="28.35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF6E0" stopOpacity="0.8" />
          <stop offset="0.34" stopColor="#F2CC74" stopOpacity="0.72" />
          <stop offset="0.68" stopColor="#82D8F1" stopOpacity="0.54" />
          <stop offset="1" stopColor="#8467CF" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id={ids.gemFill} x1="24" y1="15.2" x2="24" y2="20.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEA" />
          <stop offset="0.3" stopColor="#F6E1A0" />
          <stop offset="0.62" stopColor="#D79A24" />
          <stop offset="0.86" stopColor="#F0C962" />
          <stop offset="1" stopColor="#8D652A" />
        </linearGradient>
      </defs>

      <path
        d="M24 2.8L45.2 24L24 45.2L2.8 24L24 2.8Z"
        fill={`url(#${ids.frameFill})`}
        stroke={`url(#${ids.frameStroke})`}
        strokeWidth="1.55"
      />
      <path
        d="M24 5.7L42.3 24L24 42.3L5.7 24L24 5.7Z"
        stroke={`url(#${ids.edgeLight})`}
        strokeWidth="0.95"
        opacity="0.72"
      />

      <path
        d="M24 15.05C25.58 11.92 26.83 7.54 27.55 1.95H20.45C21.17 7.54 22.42 11.92 24 15.05Z"
        fill={`url(#${ids.beamFill})`}
      />
      <path
        d="M24 15.05V2.5"
        stroke={`url(#${ids.beamCore})`}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M7.25 24C12.18 17.08 17.72 13.62 24 13.62C30.28 13.62 35.82 17.08 40.75 24C35.82 30.92 30.28 34.38 24 34.38C17.72 34.38 12.18 30.92 7.25 24Z"
        fill={`url(#${ids.eyeFill})`}
        stroke={`url(#${ids.eyeStroke})`}
        strokeWidth="1.5"
      />
      <path
        d="M9.25 24C13.4 18.15 18.25 15.2 24 15.2C29.75 15.2 34.6 18.15 38.75 24"
        stroke={`url(#${ids.edgeLight})`}
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.82"
      />
      <path
        d="M12.25 24C15.62 19.45 19.53 17.18 24 17.18C28.47 17.18 32.38 19.45 35.75 24C32.38 28.55 28.47 30.82 24 30.82C19.53 30.82 15.62 28.55 12.25 24Z"
        stroke={`url(#${ids.lensStroke})`}
        strokeWidth="0.95"
        opacity="0.36"
      />

      <path
        d="M17.2 18.05L10.7 15.45"
        stroke={`url(#${ids.eyeStroke})`}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.46"
      />
      <path
        d="M30.8 18.05L37.3 15.45"
        stroke={`url(#${ids.eyeStroke})`}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.46"
      />

      <circle
        cx="24"
        cy="24"
        r="5.05"
        fill={`url(#${ids.lensFill})`}
        stroke={`url(#${ids.lensStroke})`}
        strokeWidth="1.1"
      />
      <path
        d="M19.15 25.85C20.58 24.42 22.2 23.7 24 23.7C25.8 23.7 27.42 24.42 28.85 25.85"
        stroke={`url(#${ids.horizonStroke})`}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />

      <path
        d="M21.3 20.1L24 15.85L26.7 20.1"
        fill={`url(#${ids.towerFill})`}
        stroke={`url(#${ids.towerEdge})`}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M20.85 20.1H27.15L28.48 37.2H19.52L20.85 20.1Z"
        fill={`url(#${ids.towerFill})`}
        stroke={`url(#${ids.towerEdge})`}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M21.75 20.78H24.82L25.88 36.45H20.62L21.75 20.78Z"
        stroke={`url(#${ids.edgeLight})`}
        strokeWidth="0.72"
        opacity="0.68"
      />
      <path
        d="M24 20.2V37.05"
        stroke={`url(#${ids.frameStroke})`}
        strokeWidth="0.95"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M20.1 37.2H27.9"
        stroke={`url(#${ids.towerEdge})`}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M18.95 40.1H29.05"
        stroke={`url(#${ids.towerEdge})`}
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M24 15.2L26.2 17.55L24 20L21.8 17.55L24 15.2Z"
        fill={`url(#${ids.gemFill})`}
        stroke="#F8EFD6"
        strokeWidth="0.45"
      />
      <path
        d="M24 16.2V19.1"
        stroke="#FFF7E1"
        strokeWidth="0.4"
        strokeLinecap="round"
        opacity="0.82"
      />
    </svg>
  );
};

export default LighthouseGlyph;
