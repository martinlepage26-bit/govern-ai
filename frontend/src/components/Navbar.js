import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LighthouseGlyph from './LighthouseGlyph';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/research', label: t.nav.research },
    { path: '/about', label: t.nav.about }
  ];
  const reviewCta = language === 'fr' ? 'Reserver un echange' : 'Book a review';
  const sitemapLabel = language === 'fr' ? 'Plan du site' : 'Site map';
  const sitemapIntro = language === 'fr'
    ? 'Parcours publics, outil et pages de travail'
    : 'Public routes, tool, and working pages';

  const languageButtonLabel = language === 'fr' ? 'EN' : 'FR';
  const languageButtonTitle = language === 'fr'
    ? 'Switch to English'
    : 'Passer en français';

  const sitemapSections = [
    {
      title: language === 'fr' ? 'Principales' : 'Main',
      links: [
        { path: '/', label: t.nav.home, note: language === 'fr' ? 'Vue d’ensemble' : 'Overview' },
        { path: '/services', label: t.nav.services, note: language === 'fr' ? 'Offres et parcours' : 'Offers and routes' },
        { path: '/research', label: t.nav.research, note: language === 'fr' ? 'Notes et publications' : 'Briefings and publications' },
        { path: '/about', label: t.nav.about, note: language === 'fr' ? 'Pratique et approche' : 'Practice and approach' }
      ]
    },
    {
      title: language === 'fr' ? 'Entrées' : 'Entry points',
      links: [
        { path: '/tool', label: language === 'fr' ? 'Diagnostic de révisabilité' : 'Revisability diagnostic', note: language === 'fr' ? 'Le premier point d interruption' : 'The first interruption point', featured: true },
        { path: '/connect', label: t.nav.connect, note: language === 'fr' ? 'Réserver une revue' : 'Book a review' },
        { path: '/services/menu', label: language === 'fr' ? 'Menu des services' : 'Service menu', note: language === 'fr' ? 'Choisir le bon parcours' : 'Choose the right route' },
        { path: '/faq', label: t.nav.faq, note: language === 'fr' ? 'Réponses rapides' : 'Quick answers' }
      ]
    },
    {
      title: language === 'fr' ? 'Références' : 'Reference',
      links: [
        { path: '/library', label: t.nav.library, note: language === 'fr' ? 'Cadres et sources' : 'Frameworks and sources' },
        { path: '/cases', label: t.nav.cases, note: language === 'fr' ? 'Exemples de pression et de réponse' : 'Examples of pressure and response' },
        { path: '/about/conceptual-method', label: language === 'fr' ? 'Méthode conceptuelle' : 'Conceptual method', note: language === 'fr' ? 'Logique de la pratique' : 'Method logic' },
        { path: '/ai-governance-statement', label: language === 'fr' ? 'Énoncé de gouvernance IA' : 'AI governance statement', note: language === 'fr' ? 'Comment nous utilisons l IA' : 'How we use AI ourselves' }
      ]
    }
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    setSitemapOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    const lockBody = sitemapOpen && window.matchMedia('(max-width: 767px)').matches;
    document.body.style.overflow = lockBody ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sitemapOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSitemapOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const homeHeroVisible = location.pathname === '/' && !scrolled;
  const navClass = ['nav', scrolled ? 'scrolled' : '', homeHeroVisible ? 'hero-visible' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <nav className={navClass} data-testid="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <button
              className={`nav-sitemap-toggle${sitemapOpen ? ' open' : ''}`}
              aria-label={sitemapOpen ? (language === 'fr' ? 'Fermer le plan du site' : 'Close site map') : (language === 'fr' ? 'Ouvrir le plan du site' : 'Open site map')}
              aria-expanded={sitemapOpen}
              type="button"
              onClick={() => setSitemapOpen((open) => !open)}
            >
              <span className="nav-sitemap-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="nav-sitemap-label">{sitemapLabel}</span>
            </button>

            <Link to="/" className="nav-brand" aria-label={language === 'fr' ? 'Accueil PHAROS' : 'PHAROS home'}>
              <LighthouseGlyph className="nav-logo" />
              <span className="nav-wordmark">PHAROS</span>
            </Link>
          </div>

          <div className="nav-right">
            <div className="nav-links">
              {navItems.map((item) => {
                const isActive = item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                return (
                  <Link key={item.path} to={item.path} className={`nav-link${isActive ? ' active' : ''}`}>
                    {item.label}
                  </Link>
                );
              })}
              <Link to="/connect" className="nav-cta">
                {reviewCta}
              </Link>
              <button className="nav-lang" type="button" onClick={toggleLanguage} title={languageButtonTitle}>
                {languageButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <button
        type="button"
        className={`sitemap-backdrop${sitemapOpen ? ' open' : ''}`}
        aria-label={language === 'fr' ? 'Fermer le plan du site' : 'Close site map'}
        onClick={() => setSitemapOpen(false)}
      />

      <aside className={`sitemap-panel${sitemapOpen ? ' open' : ''}`} aria-hidden={!sitemapOpen}>
        <div className="sitemap-panel-inner">
          <div className="sitemap-header">
            <p className="eyebrow">{sitemapLabel}</p>
            <p className="sitemap-intro">{sitemapIntro}</p>
          </div>

          <div className="sitemap-grid">
            {sitemapSections.map((section) => (
              <div key={section.title} className="sitemap-section">
                <p className="sitemap-section-title">{section.title}</p>
                <div className="sitemap-links">
                  {section.links.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`sitemap-link${item.featured ? ' featured' : ''}`}
                      onClick={() => setSitemapOpen(false)}
                    >
                      <span className="sitemap-link-title">{item.label}</span>
                      <span className="sitemap-link-meta">{item.note}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sitemap-actions">
            <Link to="/connect" className="nav-cta-mobile" onClick={() => setSitemapOpen(false)}>
              {reviewCta}
            </Link>
            <button
              type="button"
              className="nav-lang mobile-lang-toggle"
              onClick={() => {
                toggleLanguage();
                setSitemapOpen(false);
              }}
              title={languageButtonTitle}
            >
              {languageButtonLabel}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
