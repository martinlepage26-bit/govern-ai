import './App.css';
import './claude-v01.css';
import './game.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import StaticViewportShell from './components/StaticViewportShell';
import TypographyPolish from './components/TypographyPolish';

import About from './pages/About';
import AIGovernanceStatement from './pages/AIGovernanceStatement';
import Admin from './pages/Admin';
import Cases from './pages/Cases';
import Connect from './pages/Connect';
import ConceptualMethod from './pages/ConceptualMethod';
import FAQ from './pages/FAQ';
import Game from './pages/Game';
import Home from './pages/Home';
import Library from './pages/Library';
import Portfolio from './pages/Portfolio';
import PortalAurorAI from './pages/PortalAurorAI';
import PortalCompassAI from './pages/PortalCompassAI';
import Research from './pages/Research';
import SealedCard from './pages/SealedCard';
import ServiceMenu from './pages/ServiceMenu';
import Services from './pages/Services';
import Tool from './pages/Tool';
import TrustAdvantageAnalysis from './pages/TrustAdvantageAnalysis';

const STATIC_PUBLIC_ROUTES = new Set([
  '/',
  '/services',
  '/services/menu',
  '/tool',
  '/faq',
  '/research',
  '/cases',
  '/about',
  '/about/conceptual-method',
  '/ai-governance-statement',
  '/connect',
  '/portfolio',
  '/library',
  '/publications/trust-advantage-analysis'
]);

function AppRoutes() {
  const location = useLocation();
  const isStaticRoute = STATIC_PUBLIC_ROUTES.has(location.pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('static-route', isStaticRoute);
    document.body.classList.toggle('static-route', isStaticRoute);

    return () => {
      document.documentElement.classList.remove('static-route');
      document.body.classList.remove('static-route');
    };
  }, [isStaticRoute]);

  return (
    <>
      <ScrollToTop />
      <TypographyPolish />
      <Navbar />
      <main className={`relative${isStaticRoute ? ' static-main' : ''}`}>
        <StaticViewportShell active={isStaticRoute}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/menu" element={<ServiceMenu />} />
            <Route path="/tool" element={<Tool />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/research" element={<Research />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/conceptual-method" element={<ConceptualMethod />} />
            <Route path="/ai-governance-statement" element={<AIGovernanceStatement />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/portal/aurorai" element={<PortalAurorAI />} />
            <Route path="/portal/compassai" element={<PortalCompassAI />} />
            <Route path="/sealed-card" element={<SealedCard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/library" element={<Library />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/publications/trust-advantage-analysis" element={<TrustAdvantageAnalysis />} />
          </Routes>
        </StaticViewportShell>
      </main>
      {!isStaticRoute ? <Footer /> : null}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
