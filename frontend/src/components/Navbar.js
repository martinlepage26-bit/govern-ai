import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// ML Monogram - L is the M's right leg, professional and stylish
const MLMonogram = ({ className = "h-8" }) => (
  <svg viewBox="0 0 80 50" className={className} fill="currentColor">
    {/* M with L integrated as right leg */}
    <path d="M5 45 L5 8 L20 30 L35 8 L35 45" 
          fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* L as the extended right leg */}
    <path d="M35 45 L55 45" 
          fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

// Compass NE - professional, classical, restrained
const CompassNE = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Compass circle */}
    <circle cx="12" cy="12" r="9" />
    {/* NE Arrow */}
    <path d="M12 12 L18 6" strokeWidth="2"/>
    <polygon points="18,6 14,7 17,10" fill="currentColor" stroke="none"/>
    {/* Center dot */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  
  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/cases', label: t.nav.cases },
    { path: '/tool', label: t.nav.tool },
    { path: '/research', label: t.nav.research },
    { path: '/library', label: t.nav.library },
    { path: '/about', label: t.nav.about },
    { path: '/connect', label: t.nav.connect },
  ];

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-[#0B0F1A]/5" data-testid="navbar">
      {/* Logo - ML Monogram with Compass */}
      <Link to="/" className="flex items-center gap-2.5 group" data-testid="logo-link">
        <MLMonogram className="h-7 text-[#0B0F1A] group-hover:text-[#4B2ABF] transition-colors" />
        <CompassNE className="w-4 h-4 text-[#4B2ABF]" />
      </Link>

      {/* Navigation */}
      <div className="flex gap-4 md:gap-6 items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
            className={`text-xs md:text-sm font-medium tracking-wide transition-colors hover:text-[#4B2ABF] ${
              location.pathname === item.path
                ? 'text-[#0B0F1A]'
                : 'text-[#0B0F1A]/50'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={toggleLanguage}
          data-testid="lang-toggle"
          className="ml-2 px-2.5 py-1 text-xs font-medium tracking-wide text-[#0B0F1A]/60 hover:text-[#4B2ABF] transition-colors"
        >
          {language === 'en' ? 'FR' : 'EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
