import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  Radar,
  Scale,
  ShieldCheck,
  Waypoints
} from 'lucide-react';
import LighthouseGlyph from '../components/LighthouseGlyph';

const governanceSignals = [
  {
    label: 'Built for',
    title: 'Procurement, audit, vendor review',
    description: 'PHAROS is designed for the moment scrutiny arrives and someone asks who decides, what packet exists, and what threshold actually holds.'
  },
  {
    label: 'Method',
    title: 'Interruption points, not observability theater',
    description: 'The work makes the pause, the boundary, and the escalation gate visible before a workflow hardens into an unreviewable decision.'
  },
  {
    label: 'Lead',
    title: 'Martin Lepage, PhD',
    description: 'Founder-led governance design grounded in evidence discipline, regulated review conditions, and reconstructable decision logic.'
  }
];

const routes = [
  {
    icon: BriefcaseBusiness,
    label: 'Route 01',
    title: 'Deterministic governance',
    description: 'Set decision rights, thresholds, and evidence pathways before review pressure compounds ambiguity.',
    to: '/services#deterministic-governance'
  },
  {
    icon: Radar,
    label: 'Route 02',
    title: 'Pre-mortem review',
    description: 'Pressure-test a system before launch, procurement, onboarding, or a major integration step.',
    to: '/services#pre-mortem-review'
  },
  {
    icon: Scale,
    label: 'Route 03',
    title: 'Post-mortem review',
    description: 'Reconstruct what happened, what failed, and which control changes have to hold next time.',
    to: '/services#post-mortem-review'
  }
];

const interruptionPoints = [
  {
    icon: FileCheck2,
    title: 'Provenance boundaries',
    description: 'Keep source material distinct from generated artifacts and runtime residue.'
  },
  {
    icon: ShieldCheck,
    title: 'Artifact hierarchy',
    description: 'Mark summaries and packets below the primary material they derive from.'
  },
  {
    icon: Building2,
    title: 'Contestability gates',
    description: 'Pause the workflow before a classification hardens into action.'
  },
  {
    icon: Waypoints,
    title: 'Bounded recursion',
    description: 'Lock the stable branch so packet-on-packet loops do not silently re-enter.'
  }
];

const Home = () => (
  <div data-testid="home-page">
    <section className="hero home-command-hero">
      <div className="container home-command-layout">
        <div className="home-command-grid">
          <div className="hero-content home-command-copy">
            <div className="brand-kicker home-command-kicker">
              <LighthouseGlyph className="brand-kicker-mark" title="" />
              <span>PHAROS — Legible AI Governance</span>
            </div>

            <h1>Legible AI governance under real review conditions</h1>
            <p className="body-lg">
              PHAROS turns procurement, audit, vendor review, and executive oversight into explicit thresholds, named decision rights, and review-ready evidence paths.
            </p>
            <p className="hero-founder-line">A governance practice by Martin Lepage, PhD</p>

            <div className="hero-cta-row">
              <Link to="/connect" className="btn-primary">
                Book a review
                <ArrowRight />
              </Link>
              <Link to="/tool" className="btn-secondary">
                Run revisability diagnostic
              </Link>
            </div>

            <div className="home-command-signals">
              {governanceSignals.map((item) => (
                <article key={item.title} className="home-command-signal">
                  <p className="home-command-signal-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="home-command-stage-shell">
            <div className="home-command-stage">
              <div className="home-command-ceiling-arc" />
              <div className="home-command-floor-arc" />
              <div className="home-command-window-grid" />
              <div className="home-command-panel home-command-panel-left">
                <p className="home-command-panel-title">Workflow gates</p>
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="home-command-panel home-command-panel-mid">
                <p className="home-command-panel-title">Review architecture</p>
                <span />
                <span />
                <span />
              </div>
              <div className="home-command-hologram">
                <div className="home-command-beam home-command-beam-vertical" />
                <div className="home-command-beam home-command-beam-horizontal" />
                <div className="home-command-glass">
                  <LighthouseGlyph className="home-command-mark" title="" />
                  <span className="home-command-wordmark">PHAROS</span>
                </div>
              </div>
              <div className="home-command-lighthouse" aria-hidden="true" />
              <div className="home-command-executive" aria-hidden="true" />
              <div className="home-command-tablet" aria-hidden="true">
                <p>Revisability diagnostic</p>
                <div className="home-command-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-command-bottom">
          <div className="home-command-routes">
            {routes.map((item) => (
              <Link key={item.title} to={item.to} className="home-command-route">
                <div className="home-command-route-top">
                  <div className="card-icon">
                    <item.icon />
                  </div>
                  <p className="home-command-route-label">{item.label}</p>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="home-command-route-link">
                  View service
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <article className="home-command-architecture">
            <div className="home-command-architecture-header">
              <p className="eyebrow">Inside the machinery</p>
              <h2>Four interruption points that keep governance legible</h2>
              <p className="body-sm">
                PHAROS is not selling visibility as theater. It shows where the workflow must pause, what evidence class holds, and where later recursion is no longer allowed to drift.
              </p>
            </div>

            <div className="home-command-points">
              {interruptionPoints.map((item) => (
                <div key={item.title} className="home-command-point">
                  <div className="card-icon">
                    <item.icon />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
