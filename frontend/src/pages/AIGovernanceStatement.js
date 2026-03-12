import { Link } from 'react-router-dom';
import { ArrowRight, FileText, PenSquare, ShieldCheck } from 'lucide-react';
import LighthouseGlyph from '../components/LighthouseGlyph';

const mediationLayers = [
  {
    icon: FileText,
    title: 'Clerical mediation',
    body: 'Formatting, restructuring, summaries, and surface clean-up that do not change the governing claim.'
  },
  {
    icon: PenSquare,
    title: 'Expressive mediation',
    body: 'Drafting help that affects phrasing, emphasis, and presentation while remaining bounded by a declared human argument.'
  },
  {
    icon: ShieldCheck,
    title: 'Epistemic mediation',
    body: 'Any AI use that can change what is being claimed, inferred, classified, or recommended. This is where stricter review and disclosure are required.'
  }
];

const AIGovernanceStatement = () => (
  <div className="page-shell" data-testid="ai-governance-statement-page">
    <section className="page-hero">
      <div className="container">
        <div className="section-header">
          <div className="brand-kicker brand-kicker-static">
            <LighthouseGlyph className="brand-kicker-mark" title="" />
            <span>PHAROS — AI Governance Statement</span>
          </div>
          <h1>We use AI under declared, bounded review conditions.</h1>
          <p className="body-lg">
            PHAROS does not hide behind ritual disclosure. We treat AI use as a governance question with named mediation layers, review conditions, and clear limits on what can become a public claim.
          </p>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Our own practice</p>
          <h2>Function-specific disclosure instead of generic reassurance</h2>
          <p className="body-sm">
            “Used only for language editing” is often too vague to be meaningful. PHAROS distinguishes between clerical, expressive, and epistemic mediation so clients can see what kind of AI involvement actually occurred.
          </p>
        </div>

        <div className="grid-3 stagger">
          {mediationLayers.map((item) => (
            <article key={item.title} className="card reveal">
              <div className="card-icon">
                <item.icon />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="editorial-panel gate-wrapper reveal" style={{ marginTop: '22px' }}>
          <p className="eyebrow" style={{ marginBottom: '10px' }}>Operational rule</p>
          <h3 style={{ marginBottom: '10px' }}>No consequential claim leaves the workflow without a human owner.</h3>
          <p className="body-sm">
            Public-facing claims, governance conclusions, and client recommendations are reviewed as authored judgments. AI may assist with clerical or expressive tasks, but the accountable human remains visible, and the evidence class of each statement remains explicit.
          </p>
          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Link to="/tool" className="btn-primary glow-purple">
              Run revisability diagnostic
              <ArrowRight />
            </Link>
            <Link to="/connect" className="btn-secondary">Book a review</Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AIGovernanceStatement;
