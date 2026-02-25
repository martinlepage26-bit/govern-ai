import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Scale } from 'lucide-react';
import StarterKitCTA from '../components/StarterKitCTA';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_site-resurrection-1/artifacts/98548zap_logo.png";

const Home = () => {
  const capabilities = [
    {
      icon: Shield,
      title: 'Risk Classification',
      description: 'Tier AI use cases by impact, sensitivity, and exposure'
    },
    {
      icon: FileText,
      title: 'Evidence Architecture',
      description: 'Documentation that survives audit scrutiny'
    },
    {
      icon: Scale,
      title: 'Control Design',
      description: 'Operational controls teams can actually execute'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc]" data-testid="home-page">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Main Heading */}
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-6 leading-tight">
              AI Governance<br />
              Strategy & Oversight
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg mb-6">
              Governance systems that make AI decisions documented, reviewable, 
              and defensible under audit and procurement scrutiny.
            </p>

            {/* Keywords */}
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-8">
              DEFENSIBLE DECISIONS · OPERATIONAL CONTROLS · EVIDENCE TRAIL
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/services" 
                className="btn-primary inline-flex items-center gap-2"
                data-testid="view-services-btn"
              >
                View Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/connect" 
                className="btn-ghost inline-flex items-center gap-2"
                data-testid="book-consultation-btn"
              >
                Book a Debrief
              </Link>
            </div>

            {/* Capabilities */}
            <div className="space-y-4">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                    <cap.icon className="w-4 h-4 text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a2744]">{cap.title}</p>
                    <p className="text-sm text-gray-500">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Logo */}
          <div className="flex justify-center md:justify-end">
            <img 
              src={LOGO_URL} 
              alt="AI Governance Symbol" 
              className="w-64 md:w-80 object-contain"
              data-testid="home-hero-image"
            />
          </div>
        </div>

        {/* Starter Kit CTA */}
        <div className="mt-16">
          <StarterKitCTA />
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8">
            <Link to="/tool" className="group">
              <p className="text-xs tracking-widest text-[#6366f1] uppercase mb-2">Assessment</p>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] group-hover:text-[#6366f1] transition-colors mb-1">
                Readiness Snapshot
              </h3>
              <p className="text-gray-600 text-sm">
                Assess governance maturity →
              </p>
            </Link>
            <Link to="/cases" className="group">
              <p className="text-xs tracking-widest text-[#6366f1] uppercase mb-2">Portfolio</p>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] group-hover:text-[#6366f1] transition-colors mb-1">
                Case Studies
              </h3>
              <p className="text-gray-600 text-sm">
                See engagement examples →
              </p>
            </Link>
            <Link to="/research" className="group">
              <p className="text-xs tracking-widest text-[#6366f1] uppercase mb-2">Research</p>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] group-hover:text-[#6366f1] transition-colors mb-1">
                Governance Briefings
              </h3>
              <p className="text-gray-600 text-sm">
                Incidents into controls →
              </p>
            </Link>
            <Link to="/library" className="group">
              <p className="text-xs tracking-widest text-[#6366f1] uppercase mb-2">Resources</p>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] group-hover:text-[#6366f1] transition-colors mb-1">
                Governance Library
              </h3>
              <p className="text-gray-600 text-sm">
                Frameworks & standards →
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
