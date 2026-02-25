import { Link } from 'react-router-dom';
import { Shield, FileText, RefreshCw, ArrowRight } from 'lucide-react';

const Services = () => {
  const coreOffers = [
    {
      icon: Shield,
      title: "Governance Foundation",
      description: "Establish the minimum viable governance system: AI use case inventory, risk tiers, decision rights, approval flows, and operating cadence.",
      outputs: "Use case map, tiering logic, RACI matrix, baseline templates, governance calendar.",
      ideal: "Organizations deploying AI without formal governance structures."
    },
    {
      icon: FileText,
      title: "Controls and Evidence Pack",
      description: "Build audit and procurement readiness with a control register mapped to risk tiers, evidence expectations, and documentation standards.",
      outputs: "Control register, evaluation criteria, vendor questionnaires, decision log templates, evidence packet structure.",
      ideal: "Organizations preparing for internal audit, regulatory review, or customer due diligence."
    },
    {
      icon: RefreshCw,
      title: "Oversight Retainer",
      description: "Ongoing advisory support to keep governance current as models, vendors, data flows, and use cases evolve.",
      outputs: "Monthly oversight, decision log stewardship, control roadmap updates, audit and procurement support.",
      ideal: "Organizations with active AI delivery who need stable oversight without slowing delivery."
    }
  ];

  const pricingFactors = [
    {
      title: "Scope and surface area",
      description: "Number of AI use cases, vendors, and data pathways in scope. Stakeholder groups involved in governance decisions."
    },
    {
      title: "Sector and evidence burden",
      description: "Industry norms, regulatory requirements, and audit expectations. How documentation needs to be structured for your reviewers."
    },
    {
      title: "Timeline and complexity",
      description: "Speed of delivery, complexity of integrations, and the level of decision authority assigned to AI systems."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="services-page">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-4">
          Services
        </h1>
        <p className="text-gray-600 mb-2 max-w-2xl">
          AI governance systems that remain usable day to day and remain defensible under audit and procurement review.
        </p>
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-12">
          STRATEGY · CONTROLS · EVIDENCE · OVERSIGHT
        </p>

        {/* What I deliver */}
        <div className="card mb-12">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-4">
            What I deliver
          </h2>
          <p className="text-gray-600 mb-4">
            I help organizations operationalize AI governance: <span className="text-[#1a2744] font-medium">risk classification</span> that people can apply, <span className="text-[#1a2744] font-medium">controls</span> that teams can execute, and <span className="text-[#1a2744] font-medium">documentation</span> that supports review by procurement, internal audit, compliance, and customers.
          </p>
          <p className="text-gray-600 mb-6">
            Engagements are designed to fit your constraints. You leave with a working model, clear decision rights, and an evidence trail that is practical to maintain.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/services/menu" 
              className="btn-primary inline-flex items-center gap-2"
              data-testid="view-service-menu-btn"
            >
              View the Service Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/connect" className="btn-ghost">
              Book a debrief
            </Link>
          </div>
        </div>

        {/* Core offers */}
        <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-6">
          Core offers
        </h2>
        <div className="space-y-6 mb-12">
          {coreOffers.map((offer, index) => (
            <div key={index} className="card card-hover" data-testid={`core-offer-${index}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <offer.icon className="w-6 h-6 text-[#6366f1]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {offer.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#f8f9fc] rounded-lg p-3">
                      <p className="text-xs text-[#6366f1] uppercase tracking-wide font-medium mb-1">Outputs</p>
                      <p className="text-gray-600 text-sm">{offer.outputs}</p>
                    </div>
                    <div className="bg-[#f8f9fc] rounded-lg p-3">
                      <p className="text-xs text-[#6366f1] uppercase tracking-wide font-medium mb-1">Ideal for</p>
                      <p className="text-gray-600 text-sm">{offer.ideal}</p>
                    </div>
                  </div>
                  <Link 
                    to="/services/menu" 
                    className="text-[#6366f1] text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    See package details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What pricing accounts for */}
        <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-4">
          What pricing accounts for
        </h2>
        <p className="text-gray-600 mb-6">
          Pricing reflects what it takes to deliver a governance system that fits your organization and stands up to review.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {pricingFactors.map((factor, index) => (
            <div key={index} className="card" data-testid={`pricing-factor-${index}`}>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-3">
                {factor.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link to="/tool" className="btn-primary inline-flex items-center gap-2" data-testid="assess-readiness-btn">
            Assess your readiness
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/connect" className="btn-ghost">
            Book a 30 minute debrief
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
