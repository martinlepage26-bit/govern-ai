import { Link } from 'react-router-dom';

const Services = () => {
  const coreOffers = [
    {
      title: "Governance Foundation",
      description: "Establish the minimum viable governance system: inventory, risk tiers, decision rights, and operating cadence.",
      outputs: "Outputs: use case map, tiering logic, roles and approvals, baseline templates."
    },
    {
      title: "Controls and Evidence Pack",
      description: "Build audit and procurement readiness with a control register, review workflow, and evidence expectations.",
      outputs: "Outputs: controls map, evaluation criteria, vendor review questions, evidence packet."
    },
    {
      title: "Oversight Retainer",
      description: "Ongoing advisory support to keep governance current as models, vendors, data flows, and use cases evolve.",
      outputs: "Outputs: monthly oversight, decision log, roadmap updates, review participation."
    }
  ];

  const pricingFactors = [
    {
      title: "Scope and surface area",
      description: "Number of AI use cases, vendors, and data pathways in scope, plus the number of stakeholder groups involved."
    },
    {
      title: "Sector and evidence expectations",
      description: "Industry norms, procurement requirements, and audit expectations, including how documentation needs to be structured."
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
        <div className="card mb-8">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-4">
            What I deliver
          </h2>
          <p className="text-gray-600 mb-4">
            I help organizations operationalize AI governance: risk classification that people can apply, controls that teams can execute, and documentation that supports review by procurement, internal audit, compliance, and customers.
          </p>
          <p className="text-gray-600 mb-6">
            Engagements are designed to fit your constraints. You leave with a working model, clear decision rights, and an evidence trail that is practical to maintain.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/services/menu" 
              className="btn-primary"
              data-testid="view-service-menu-btn"
            >
              View the Service Menu
            </Link>
            <Link to="/connect" className="btn-ghost">
              Book a consultation
            </Link>
          </div>
        </div>

        {/* Core offers */}
        <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-6">
          Core offers
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {coreOffers.map((offer, index) => (
            <div key={index} className="card card-hover" data-testid={`core-offer-${index}`}>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-3">
                {offer.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {offer.description}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {offer.outputs}
              </p>
              <Link 
                to="/services/menu" 
                className="text-[#1a2744] text-sm font-medium hover:underline"
              >
                See details
              </Link>
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
          <Link to="/tool" className="btn-secondary" data-testid="assess-readiness-btn">
            Assess readiness
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
