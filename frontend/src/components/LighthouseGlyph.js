const LighthouseGlyph = ({ className = '', title = 'PHAROS review mark' }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : 'presentation'}
  >
    {title ? <title>{title}</title> : null}

    <path
      d="M8.4 35.6C15.05 26.37 22.96 21.75 32 21.75C41.04 21.75 48.95 26.37 55.6 35.6C48.95 44.83 41.04 49.45 32 49.45C22.96 49.45 15.05 44.83 8.4 35.6Z"
      stroke="currentColor"
      strokeWidth="2.5"
      opacity="0.94"
    />
    <path
      d="M16.2 35.6C20.9 29.86 26.17 26.98 32 26.98C37.83 26.98 43.1 29.86 47.8 35.6C43.1 41.34 37.83 44.22 32 44.22C26.17 44.22 20.9 41.34 16.2 35.6Z"
      stroke="currentColor"
      strokeWidth="1.7"
      opacity="0.28"
    />

    <path
      d="M28.05 14.7L32 11L35.95 14.7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.1 14.7H36.9L35.95 19.55H28.05L27.1 14.7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.04"
    />
    <path
      d="M26.8 19.55H37.2V24.55H26.8V19.55Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.04"
    />
    <path d="M30.15 19.55V24.55" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.3" />
    <path d="M33.85 19.55V24.55" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.3" />
    <path
      d="M27.85 24.55H36.15L37.1 28.3H26.9L27.85 24.55Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.04"
    />

    <path
      d="M32 28.45C26.91 28.45 22.78 32.58 22.78 37.67C22.78 40.02 23.67 42.17 25.14 43.81L23.58 52.96H40.42L38.86 43.81C40.33 42.17 41.22 40.02 41.22 37.67C41.22 32.58 37.09 28.45 32 28.45Z"
      stroke="currentColor"
      strokeWidth="2.55"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.045"
    />
    <path
      d="M32 32.25C35 32.25 37.43 34.68 37.43 37.67C37.43 39.35 36.67 40.85 35.48 41.85L34.82 42.4L35.84 48.37H28.16L29.18 42.4L28.52 41.85C27.33 40.85 26.57 39.35 26.57 37.67C26.57 34.68 29 32.25 32 32.25Z"
      fill="currentColor"
      fillOpacity="0.12"
    />
  </svg>
);

export default LighthouseGlyph;
