import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// ML Monogram - small version for footer
const MLMonogramSmall = ({ className = "h-5" }) => (
  <svg viewBox="0 0 80 50" className={className} fill="currentColor">
    <path d="M5 45 L5 8 L20 30 L35 8 L35 45" 
          fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35 45 L55 45" 
          fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

// Compass NE - tiny version
const CompassNETiny = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 12 L17 7" strokeWidth="2"/>
    <polygon points="17,7 14,8 16,10" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-6 px-6 md:px-12 bg-white border-t border-[#0B0F1A]/5" data-testid="footer">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-[#0B0F1A]/40">
            {t.footer.copyright}
          </p>
          <Link 
            to="/admin" 
            className="w-1.5 h-1.5 rounded-full bg-[#0B0F1A]/10 hover:bg-[#4B2ABF] transition-colors"
            title=""
            data-testid="admin-link"
          />
        </div>
        <div className="flex items-center gap-2">
          <MLMonogramSmall className="h-4 text-[#0B0F1A]/25" />
          <CompassNETiny className="w-3.5 h-3.5 text-[#4B2ABF]/40" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
