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
    <nav className="w-full px-6 md:px-12 py-4 bg-white sticky top-0 z-50 border-b border-[#1a1a1a]/5" data-testid="navbar">
      <div className="flex items-start justify-between">
        {/* Left: Logo/Business Name */}
        <Link to="/" className="flex flex-col" data-testid="nav-brand">
          <span 
            className="text-lg md:text-xl font-bold text-[#1a1a1a]" 
            style={{fontFamily: "'IBM Plex Sans', system-ui, sans-serif", letterSpacing: '-0.01em'}}
          >
            Martin Lepage, PhD
          </span>
          <span 
            className="text-xs md:text-sm text-[#1a1a1a]/60 mt-0.5" 
            style={{fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontWeight: 400}}
          >
            AI Governance Consultant (Practice & Research)
          </span>
        </Link>

        {/* Right: Navigation */}
        <div className="flex gap-3 md:gap-5 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
              className={`text-xs font-medium tracking-wide transition-all px-2 py-1 rounded ${
                location.pathname === item.path
                  ? 'text-[#1a1a1a] bg-[#7b2cbf]/10'
                  : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-[#7b2cbf]/5'
              }`}
              style={{fontFamily: "'IBM Plex Sans', system-ui, sans-serif"}}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            data-testid="lang-toggle"
            className="ml-1 px-2 py-1 text-xs font-medium tracking-wide text-[#1a1a1a]/50 hover:text-[#7b2cbf] hover:bg-[#7b2cbf]/5 rounded transition-all"
            style={{fontFamily: "'IBM Plex Sans', system-ui, sans-serif"}}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
