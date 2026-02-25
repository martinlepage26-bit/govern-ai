import { Link } from 'react-router-dom';

const ServiceMenu = () => {
  const packages = [
    {
      id: 1,
      title: "Package 1: Governance Foundation",
      bestFor: "organizations establishing governance for the first time or consolidating governance across teams.",
      deliverables: [
        "AI use case and vendor inventory starter",
        "Risk tiering criteria with examples",
        "Decision rights and approval flow",
        "Governance cadence: meeting model, owners, and upkeep tasks"
      ],
      produces: [
        "A working governance model teams can use immediately",
        "Role clarity for procurement and audit conversations",
        "A defensible baseline for review and escalation"
      ]
    },
    {
      id: 2,
      title: "Package 2: Controls and Evidence Pack",
      bestFor: "organizations preparing for procurement scrutiny, customer questionnaires, internal audit review, or regulator engagement.",
      deliverables: [
        "Control register mapped to your risk tiers",
        "Evaluation expectations: testing, monitoring, and thresholds",
        "Vendor review questions and evidence checklist",
        "Decision log template and documentation packet outline"
      ],
      produces: [
        "Procurement ready documentation structure",
        "Audit ready evidence expectations",
        "Clear control ownership and upkeep responsibilities"
      ]
    },
    {
      id: 3,
      title: "Package 3: Oversight Retainer",
      bestFor: "organizations with active AI delivery who want stable oversight, clear decisions, and current documentation.",
      deliverables: [
        "Recurring governance and risk review support",
        "Decision log stewardship and evidence upkeep cadence",
        "Control roadmap updates aligned to delivery realities",
        "Procurement and audit support for specific reviews"
      ],
      produces: [
        "Stable oversight without slowing delivery",
        "Clear documentation as systems change",
        "Executive ready summaries and next steps"
      ]
    }
  ];

  const engagementDrivers = [
    {
      title: "Use case portfolio",
      description: "How many systems, vendors, and data pathways are in scope, and how quickly they change."
    },
    {
      title: "Review expectations",
      description: "Procurement questionnaires, audit protocols, and customer requirements that shape evidence structure."
    },
    {
      title: "Decision authority",
      description: "The level of autonomy, sensitivity, and impact assigned to AI supported decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="service-menu-page">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-4">
          Service Menu
        </h1>
        <p className="text-gray-600 mb-2 max-w-2xl">
          Packages designed for review readiness: clear scope, concrete outputs, and documentation that remains maintainable.
        </p>
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-12">
          PACKAGES · DELIVERABLES · ADD ONS
        </p>

        {/* Packages */}
        {packages.map((pkg, index) => (
          <div key={pkg.id} className="card mb-8" data-testid={`package-${pkg.id}`}>
            <h2 className="font-serif text-xl font-semibold text-[#1a2744] mb-2">
              {pkg.title}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              <span className="font-medium">Best for</span> {pkg.bestFor}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-[#f8f9fc] rounded-lg p-4">
                <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-3">
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f8f9fc] rounded-lg p-4">
                <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-3">
                  What it produces
                </h3>
                <ul className="space-y-2">
                  {pkg.produces.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {pkg.id === 3 ? (
                <>
                  <Link to="/connect" className="btn-primary">
                    Book a 30 minute debrief
                  </Link>
                  <Link to="/tool" className="btn-ghost">
                    Assess readiness
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/connect" className="btn-primary">
                    Discuss this package
                  </Link>
                  <button 
                    onClick={() => document.getElementById(`package-${pkg.id + 1}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-ghost"
                  >
                    Next package
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Engagement drivers */}
        <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-4">
          Engagement drivers
        </h2>
        <p className="text-gray-600 mb-6">
          Engagement design adapts to your environment. These drivers shape scope and effort.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {engagementDrivers.map((driver, index) => (
            <div key={index} className="card" data-testid={`engagement-driver-${index}`}>
              <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-3">
                {driver.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {driver.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;
