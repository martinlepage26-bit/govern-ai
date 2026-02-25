import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Presentation, BookOpen, Award } from 'lucide-react';

const Portfolio = () => {
  const publications = [
    {
      type: 'Protocol',
      title: 'The Sealed Card Protocol: Mediated Legitimacy, Charging, and Governance at the Seam',
      venue: 'Research Protocol',
      year: '2024',
      description: 'A framework for analyzing how legitimacy is established in the context of generative AI and mediation.',
      link: '/sealed-card'
    }
  ];

  const engagements = [
    {
      type: 'Advisory',
      client: 'Enterprise clients',
      scope: 'AI Governance Framework Design',
      description: 'Establishing minimum viable governance systems for organizations deploying AI at scale.'
    },
    {
      type: 'Audit Support',
      client: 'Financial institutions',
      scope: 'Model Risk Management',
      description: 'Supporting internal audit and compliance teams with AI system review and evidence requirements.'
    },
    {
      type: 'Procurement',
      client: 'Public sector organizations',
      scope: 'Vendor AI Assessment',
      description: 'Developing questionnaires, evaluation criteria, and diligence protocols for AI procurement.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="portfolio-page">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/about" className="text-[#6366f1] text-sm font-medium hover:underline mb-4 inline-block">
            ← Back to About
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-4">
            Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Selected publications, research protocols, and engagement areas. This portfolio reflects ongoing work in AI governance, risk classification, and institutional accountability.
          </p>
          <p className="text-xs tracking-widest text-gray-400 uppercase mt-4">
            PUBLICATIONS · RESEARCH · ENGAGEMENTS
          </p>
        </div>

        {/* Publications & Research */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#6366f1]" />
            Publications & Research
          </h2>
          
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <Link 
                key={i}
                to={pub.link}
                className="block card paper-card hover:shadow-md transition-all group"
                data-testid={`publication-${i}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-[#6366f1] uppercase tracking-wide">
                        {pub.type}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{pub.year}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-2 group-hover:text-[#6366f1] transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{pub.venue}</p>
                    <p className="text-gray-600 text-sm">{pub.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#6366f1] flex-shrink-0" />
                </div>
              </Link>
            ))}

            {/* Placeholder for future additions */}
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl text-center">
              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Additional publications will be added here</p>
            </div>
          </div>
        </section>

        {/* Engagement Areas */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-6 flex items-center gap-3">
            <Presentation className="w-6 h-6 text-[#6366f1]" />
            Engagement Areas
          </h2>
          
          <div className="grid md:grid-cols-1 gap-4">
            {engagements.map((eng, i) => (
              <div key={i} className="card" data-testid={`engagement-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#6366f1] uppercase tracking-wide">
                        {eng.type}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{eng.client}</span>
                    </div>
                    <h3 className="font-semibold text-[#1a2744] mb-1">{eng.scope}</h3>
                    <p className="text-gray-600 text-sm">{eng.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-6">
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'AI Governance',
              'Risk Classification',
              'Model Risk Management',
              'Evidence Architecture',
              'Procurement Readiness',
              'Audit Documentation',
              'Vendor Assessment',
              'Decision Rights',
              'Lifecycle Gates',
              'Control Design',
              'Legitimacy Studies',
              'Mediation Theory'
            ].map((skill, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#6366f1] hover:text-[#6366f1] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card bg-gradient-to-r from-[#1a2744] to-[#6366f1] text-white">
          <h3 className="font-serif text-xl font-semibold mb-2">Interested in collaboration?</h3>
          <p className="text-white/80 mb-4">
            For research collaborations, speaking engagements, or consulting inquiries.
          </p>
          <Link to="/connect" className="inline-block bg-white text-[#1a2744] px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
