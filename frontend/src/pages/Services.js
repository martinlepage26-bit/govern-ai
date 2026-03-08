import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, Clock3, Radar } from 'lucide-react';

const packages = [
  {
    id: 'deterministic-governance',
    eyebrow: 'Package 1',
    title: 'Deterministic Governance',
    description: 'For organizations that need explicit thresholds, decision rights, and a stable governance baseline before scrutiny compounds ambiguity.',
    deliverables: [
      'System and vendor inventory with scope boundaries',
      'Deterministic tiering logic and thresholds',
      'Decision rights, escalation rules, and approval flow',
      'Governance cadence with named upkeep owners'
    ],
    outcomes: [
      'A governance baseline teams can execute consistently',
      'Less ambiguity during procurement, audit, and internal review',
      'Claims that stay inside what the evidence can support'
    ]
  },
  {
    id: 'pre-mortem-review',
    eyebrow: 'Package 2',
    title: 'Pre-mortem Review',
    description: 'For organizations pressure-testing an AI system before launch, procurement, onboarding, or major expansion.',
    deliverables: [
      'Failure-mode review across system, process, and vendor dependencies',
      'Launch or approval conditions with evidence requirements',
      'Vendor and third-party review questions',
      'Go / no-go summary with open issues and escalation triggers'
    ],
    outcomes: [
      'Risks surfaced before they become incidents',
      'Deterministic approval conditions for launch or expansion',
      'Clear evidence gaps and ownership before scrutiny arrives'
    ]
  },
  {
    id: 'post-mortem-review',
    eyebrow: 'Package 3',
    title: 'Post-mortem Review',
    description: 'For organizations responding to incidents, failed reviews, audit findings, or governance drift.',
    deliverables: [
      'Reconstruction of the event, decision path, and evidence trail',
      'Gap review across controls, documentation, and accountability',
      'Remediation priorities with threshold and control updates',
      'Executive summary and follow-up governance actions'
    ],
    outcomes: [
      'A defensible record of what happened and why',
      'Clear remediation ownership and sequencing',
      'A stronger deterministic governance posture after failure'
    ]
  }
];

const scopingCards = [
  {
    title: 'System portfolio',
    description: 'How many systems, vendors, and data pathways are in scope, and how quickly they change.'
  },
  {
    title: 'Review burden',
    description: 'Questionnaires, audits, contractual obligations, and leadership requests determine how much proof the service must produce.'
  },
  {
    title: 'Failure consequence',
    description: 'The stakes of a wrong decision, broken evidence trail, or weak escalation path determine how deterministic the governance model must be.'
  }
];

const pricingCards = [
  {
    icon: BriefcaseBusiness,
    title: 'Targeted review',
    description: 'A defined deterministic governance, pre-mortem, or post-mortem scope with explicit outputs and a clear end date.'
  },
  {
    icon: Radar,
    title: 'Multi-system cycle',
    description: 'A phased review path when several systems, vendors, or business units need structured work in sequence.'
  },
  {
    icon: Clock3,
    title: 'Follow-through',
    description: 'A lighter continuation when remediation, threshold updates, or a second review cycle is needed after the first service.'
  }
];

const faqs = [
  {
    question: 'What is the first engagement like?',
    answer: 'A 30-minute review to understand the pressure, the system context, and whether the work belongs in deterministic governance, a pre-mortem, or a post-mortem. From there, the scope is set with explicit deliverables and a timeline.'
  },
  {
    question: 'Do you replace legal counsel or audit firms?',
    answer: 'No. PHAROS builds the governance structures, documentation, and evidence layers that legal and audit teams review. The work complements counsel; it does not replace it.'
  },
  {
    question: 'How long does a typical engagement take?',
    answer: 'Deterministic governance usually runs 3 to 6 weeks. Pre-mortem reviews often run 2 to 4 weeks. Post-mortem reviews vary with the incident or finding, but usually run 2 to 6 weeks.'
  },
  {
    question: 'Can you support teams outside Canada?',
    answer: 'Yes. The frameworks are jurisdiction-aware. The practice is rooted in Canadian requirements, but the logic of tiering, decision rights, and evidence architecture travels well.'
  }
];

const Services = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div data-testid="services-page">
      <div className="page-hero">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Services</p>
            <h1>Services for deterministic governance under pressure</h1>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Choose by pressure source, not vocabulary. The right service produces deterministic decision paths, explicit thresholds, and the materials a real review will actually ask for.
            </p>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow">Core offers</p>
            <h2>Three services for deterministic governance</h2>
          </div>

          <div className="grid-3 stagger">
            {packages.map((item) => (
              <div key={item.title} id={item.id} className="package reveal" style={{ scrollMarginTop: '120px' }}>
                <div className="package-header">
                  <p className="eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="package-body">
                  <p className="package-label">Deliverables</p>
                  <ul className="package-list">
                    {item.deliverables.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="package-label">What it produces</p>
                  <ul className="package-list" style={{ marginBottom: 0 }}>
                    {item.outcomes.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-header reveal">
          <p className="eyebrow">Scoping</p>
          <h2>What changes the scope</h2>
          <p className="body-sm">
              Scope shifts with the number of systems, the level of review expected, the sensitivity of the decisions, and the strength of the evidence already in hand.
          </p>
          </div>

          <div className="grid-3 stagger">
            {scopingCards.map((item) => (
              <div key={item.title} className="card reveal">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header reveal">
          <p className="eyebrow">Pricing</p>
          <h2>How engagements are priced</h2>
          <p className="body-sm">
              Every engagement is scoped and priced after an initial review. Pricing reflects system count, review depth, evidence condition, and remediation complexity.
          </p>
          </div>

          <div className="grid-3 stagger">
            {pricingCards.map((item) => (
              <div key={item.title} className="card reveal">
                <div className="card-icon">
                  <item.icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow">Common questions</p>
            <h2>What clients ask first</h2>
          </div>

          <div style={{ maxWidth: '720px' }} className="reveal">
            {faqs.map((item, index) => {
              const isOpen = index === openFaq;
              return (
                <div key={item.question} className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button className="faq-trigger" type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                    {item.question}
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="faq-content" style={{ maxHeight: isOpen ? '240px' : '0' }}>
                    <div className="faq-content-inner">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
        <div className="cta-banner reveal">
          <h2>Need help choosing the right entry point?</h2>
          <p className="body-sm">A short review is enough to choose whether the work belongs in deterministic governance, a pre-mortem, or a post-mortem.</p>
            <div className="btn-row">
              <Link to="/connect" className="btn-primary">
              Book a review
              <ArrowRight />
            </Link>
              <Link to="/tool" className="btn-secondary">Assess readiness</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
