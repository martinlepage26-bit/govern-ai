import { useState } from 'react';

const CONTEXTS = [
  {
    id: 'regulated',
    title: 'Regulated Systems',
    description: 'Higher evidence burden, tighter approvals, audit-grade remediation.'
  },
  {
    id: 'enterprise-saas',
    title: 'Enterprise SaaS',
    description: 'Governance that ships: release cadence, drift, and vendorized AI features.'
  },
  {
    id: 'procurement',
    title: 'Procurement & Vendor Risk',
    description: 'Questionnaires become controls: diligence artifacts, contract-backed proof.'
  },
  {
    id: 'public-sector',
    title: 'Public Sector & Due Process',
    description: 'Contestability, appeal pathways, reconstruction under scrutiny.'
  },
  {
    id: 'financial',
    title: 'Financial & Capital Systems',
    description: 'Models move money: exposure controls, stress testing, adverse action logic.'
  },
  {
    id: 'governance-architecture',
    title: 'Governance Architecture & Operating Models',
    description: 'Decision rights, lifecycle gates, evidence trails that scale.'
  }
];

const Research = () => {
  const [selectedContext, setSelectedContext] = useState('regulated');

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="research-page">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-4">
          Research
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          This research translates AI governance pressure into operational clarity: controls, lifecycle gates, procurement artifacts, and audit-ready evidence. Each briefing focuses on the practical decisions institutions must make when deploying, buying, or overseeing AI systems.
        </p>

        {/* How this research works */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-[#1a2744] mb-4">
            How this research works
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <span>Signal</span>
            <span>→</span>
            <span>Pressure</span>
            <span>→</span>
            <span>Control</span>
            <span>→</span>
            <span>Artifact</span>
            <span>→</span>
            <span>Evidence</span>
          </div>
          <p className="text-gray-600 mb-4">
            Governance pressure rarely appears as theory. It appears as audit requests, procurement questionnaires, regulatory expectations, and board oversight.
          </p>
          <p className="text-gray-600 mb-8">
            Each briefing identifies the operational pressure, clarifies the control required, and specifies the documentation necessary to make that control inspectable. The result is governance you can show, not just describe.
          </p>
        </div>

        {/* Featured framework */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1a2744]">
              Featured framework
            </h2>
            <p className="text-gray-500 text-sm">
              From policy to deployable controls: the AI Governance Engine
            </p>
          </div>
          <p className="text-gray-600 mb-4">
            A structured operating model that translates governance commitments into measurable controls, lifecycle gates, decision rights, and verification evidence. This framework informs the analytical approach used throughout this research.
          </p>
          <p className="text-gray-500 text-sm italic">
            <span className="font-medium">Professional note:</span> The Engine itself is a proprietary consulting instrument and is not publicly deployed. Research publications reference its conceptual structure without exposing internal scoring models, implementation logic, or client-specific configurations.
          </p>
        </div>

        {/* Operational contexts */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold text-[#1a2744]">
              Operational contexts
            </h2>
            <p className="text-gray-500 text-sm">
              Pick a context to load a curated stack. Click a title to open a right-side preview panel.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {CONTEXTS.map((context) => (
              <button
                key={context.id}
                onClick={() => setSelectedContext(context.id)}
                data-testid={`context-${context.id}`}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedContext === context.id
                    ? 'border-[#1a2744] bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <h3 className="font-serif font-semibold text-[#1a2744] mb-2">
                  {context.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {context.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="card">
          <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-2">
            Stack
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            This list includes posts and papers, sorted by publish date.
          </p>
          
          <div className="bg-[#f8f9fc] rounded-lg p-6">
            <p className="text-sm text-gray-500 mb-2">
              {CONTEXTS.find(c => c.id === selectedContext)?.title}
            </p>
            <p className="font-medium text-[#1a2744] mb-2">No items yet</p>
            <p className="text-gray-500 text-sm">
              Add posts or papers with locus "{selectedContext}" in data/posts.json or data/papers.json
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
