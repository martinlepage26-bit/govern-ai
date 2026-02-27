import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  
  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/cases', label: t.nav.portfolio },
    { path: '/tool', label: t.nav.tool },
    { path: '/faq', label: t.nav.faq },
    { path: '/research', label: t.nav.research },
    { path: '/library', label: t.nav.library },
    { path: '/about', label: t.nav.about },
    { path: '/connect', label: t.nav.connect },
  ];

  return (
    <nav className="w-full px-6 md:px-10 py-3 bg-white sticky top-0 z-50 border-b border-[#1a1a1a]/5" data-testid="navbar">
      <div className="flex items-center justify-between">
        {/* Left: Name and Title - Single Line */}
        <Link to="/" className="flex items-baseline gap-1" data-testid="nav-brand">
          <span 
            className="text-base md:text-lg font-bold text-[#1a1a1a]" 
            style={{fontFamily: "'Lato', 'IBM Plex Sans', system-ui, sans-serif", letterSpacing: '-0.01em'}}
          >
            Martin Lepage, PhD
          </span>
          <span 
            className="text-xs md:text-sm text-[#1a1a1a]/50 ml-1" 
            style={{fontFamily: "'Lato', 'IBM Plex Sans', system-ui, sans-serif", fontWeight: 400}}
          >
            AI Governance Consultant (Practice & Research)
          </span>
        </Link>

        {/* Right: Navigation - Single Line */}
        <div className="flex gap-2 md:gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
              className={`text-xs font-medium tracking-wide transition-all px-1.5 py-0.5 ${
                location.pathname === item.path
                  ? 'text-[#1a1a1a] border-b border-[#1a1a1a]'
                  : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
              }`}
              style={{fontFamily: "'Lato', 'IBM Plex Sans', system-ui, sans-serif"}}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            data-testid="lang-toggle"
            className="ml-1 px-1.5 py-0.5 text-xs font-medium tracking-wide text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-all"
            style={{fontFamily: "'Lato', 'IBM Plex Sans', system-ui, sans-serif"}}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
