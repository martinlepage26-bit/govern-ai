import { Link } from 'react-router-dom';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_site-resurrection-1/artifacts/98548zap_logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fc]" data-testid="home-page">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={LOGO_URL} 
            alt="AI Governance Logo" 
            className="w-16 h-16 object-contain"
            data-testid="home-logo"
          />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-6 text-left">
          AI Governance<br />
          Strategy & Oversight
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-6 max-w-xl">
          Governance systems that make AI decisions documented, reviewable, 
          and defensible under audit and procurement scrutiny.
        </p>

        {/* Keywords */}
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-8">
          DEFENSIBLE DECISIONS · OPERATIONAL CONTROLS · EVIDENCE TRAIL
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link 
            to="/services" 
            className="btn-primary inline-block"
            data-testid="view-services-btn"
          >
            View Services
          </Link>
          <Link 
            to="/connect" 
            className="btn-ghost inline-block"
            data-testid="book-consultation-btn"
          >
            Book Consultation
          </Link>
        </div>

        {/* Large Hero Image */}
        <div className="flex justify-center">
          <img 
            src={LOGO_URL} 
            alt="AI Governance Symbol" 
            className="w-full max-w-lg object-contain"
            data-testid="home-hero-image"
          />
        </div>

        {/* Footer Attribution */}
        <div className="fixed left-6 bottom-6 text-xs text-gray-400 max-w-[150px]">
          <p>&copy; 2026</p>
          <p>Martin Lepage,</p>
          <p>PhD, AI</p>
          <p>Governance</p>
          <p>Practice &</p>
          <p>Research</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
