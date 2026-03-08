export const showcaseMission = {
  title: 'Legible AI governance under pressure',
  body:
    'Every showcase direction should preserve Govern AI\'s real posture: governance documentation derives from evidence, decision rights and thresholds stay explicit, and the public site helps teams answer procurement, audit, vendor review, and oversight pressure without overstating product maturity.'
};

export const showcaseImplementationPillars = [
  {
    title: 'Evidence before claims',
    text: 'Packets, controls, and summaries should narrow to what can be shown now. The gallery should not imply certification, guaranteed compliance, or stronger public readiness than the underlying evidence can support.'
  },
  {
    title: 'Structured implementation',
    text: 'The public structure still needs to route people into the real delivery model: Governance Foundation, Controls and Evidence Pack, and Oversight Retainer.'
  },
  {
    title: 'Private modules stay private',
    text: 'AurorAI and CompassAI support the practice behind the scenes, but the public site should treat them as internal delivery modules until their review surfaces are ready.'
  }
];

export const showcaseDeliveryStructure = [
  {
    title: 'Governance Foundation',
    fit: 'For teams establishing governance or aligning it across functions.',
    text: 'Build the baseline: use-case and vendor inventory, risk tiering, decision rights, approval flow, and governance cadence.'
  },
  {
    title: 'Controls and Evidence Pack',
    fit: 'For procurement scrutiny, customer questionnaires, audit, or formal review.',
    text: 'Translate the baseline into a control register, testing and monitoring expectations, vendor review questions, and a reusable evidence packet.'
  },
  {
    title: 'Oversight Retainer',
    fit: 'For organizations with active AI delivery that need stable upkeep.',
    text: 'Keep decisions, evidence, and controls current as systems, vendors, and regulatory expectations change.'
  }
];

export const showcaseCoreUseCases = [
  {
    title: 'Procurement and customer questionnaires',
    text: 'Help teams answer due diligence requests with reusable packets, clear controls, and calm language grounded in evidence.'
  },
  {
    title: 'Audit and evidence readiness',
    text: 'Make decision rights, thresholds, controls, and documentation easy to follow when internal or external review arrives.'
  },
  {
    title: 'Vendor and third-party AI review',
    text: 'Translate vendor diligence into structured evaluation, contract-backed proof, and reassessment logic.'
  },
  {
    title: 'Executive and committee oversight',
    text: 'Give leadership a review-ready operating model with escalation paths, cadence, and evidence upkeep.'
  }
];

export const showcaseVariants = [
  {
    slug: 'coursera-campus',
    label: 'Coursera pattern',
    title: 'Operational Pathways',
    referenceLabel: 'Coursera',
    referenceUrl: 'https://www.coursera.org/',
    summary: 'Pathway-based discovery for sectors, governance packages, and original Govern AI use cases.',
    palette: ['Indigo', 'Ochre', 'Ivory'],
    tone: 'Browsable, structured, operational',
    hero: {
      eyebrow: 'Pathway logic',
      title: 'Browse governance routes by sector, pressure, and deliverable.',
      body:
        'This direction adapts catalog logic into a clearer public structure for regulated systems, enterprise SaaS, procurement, public sector work, and the three engagement packages that support them.',
      primary: 'Explore pathways',
      secondary: 'Compare packages'
    },
    metrics: [
      { value: '5', label: 'sector contexts highlighted' },
      { value: '3', label: 'service packages compared' },
      { value: '4', label: 'core artifacts made visible' }
    ],
    modules: [
      {
        title: 'Sector-led discovery',
        text: 'Let visitors browse by operating context before they choose a package or debrief.'
      },
      {
        title: 'Package comparison without oversell',
        text: 'Make deliverables, outcomes, and fit visible without promising more than the evidence layer can support.'
      },
      {
        title: 'Starter-kit style progression',
        text: 'Good for visitors who want structured comparison before they want conversation.'
      }
    ],
    journey: [
      'Pick the operating context.',
      'Compare the matching package structure.',
      'Move into the right next step with clearer expectations.'
    ]
  },
  {
    slug: 'perplexity-signal',
    label: 'Perplexity pattern',
    title: 'Answer-Led Intake',
    referenceLabel: 'Perplexity',
    referenceUrl: 'https://www.perplexity.ai/',
    summary: 'A calm answer-engine front door for governance questions, routed toward packets, services, and evidence-backed next steps.',
    palette: ['Graphite', 'Sage', 'Ochre'],
    tone: 'Conversational, calm, source-aware',
    hero: {
      eyebrow: 'Answer-engine intake',
      title: 'Start from the governance question and route people toward the right packet or engagement.',
      body:
        'This direction keeps the interface conversational while staying grounded in Govern AI\'s real posture: concise answers, source cues, and clear movement toward procurement, audit, vendor review, or oversight support.',
      primary: 'Ask the question',
      secondary: 'See answer flow'
    },
    metrics: [
      { value: '1', label: 'unified question entry point' },
      { value: '4', label: 'pressure routes surfaced' },
      { value: '3', label: 'next-step outputs suggested' }
    ],
    modules: [
      {
        title: 'Question-led homepage',
        text: 'Start with the real pressure question instead of making visitors decode a brochure.'
      },
      {
        title: 'Source-backed answer blocks',
        text: 'Use structured answer cards to keep claims narrow and route visitors into packets, research, or services.'
      },
      {
        title: 'Modern intake without gimmicks',
        text: 'Feels contemporary while preserving review logic, evidence discipline, and advisory seriousness.'
      }
    ],
    journey: [
      'Start from the pressure question.',
      'Read a concise answer with evidence cues.',
      'Escalate into the right packet, pathway, or debrief.'
    ]
  }
];

export const currentSiteEntry = {
  slug: 'current-site',
  label: 'Current production',
  title: 'Current Govern AI',
  route: '/',
  summary: 'The live advisory front door: evidence-first positioning, the real three-package structure, and direct routes into services, cases, and research.',
  palette: ['Indigo', 'Terracotta', 'Ochre']
};

export const aoThemePresets = [
  {
    id: 'evidence-led',
    label: 'Evidence-led',
    emphasis: 'Review clarity',
    primaryColors: ['Indigo', 'Ivory', 'Ochre'],
    coreFeeling: 'Precise, inspectable',
    bestFor: 'Audit readiness and procurement response',
    summary: 'Lead with structured metadata, compact reading modes, and restrained accents so packets and controls feel easy to verify.',
    whyItWorks: 'It reinforces the core promise that governance claims should be traceable, reviewable, and narrow enough to defend.',
    vibe: 'Institutional, reference-led, disciplined',
    swatches: [
      { label: 'Indigo', value: '#1a2440' },
      { label: 'Ivory', value: '#f5efe2' },
      { label: 'Ochre', value: '#c98a2e' },
      { label: 'Slate', value: '#6f7482' }
    ],
    preview: {
      background: '#f4efe6',
      surface: '#fffaf2',
      surfaceStrong: '#1a2440',
      text: '#1c2536',
      muted: '#667086',
      accent: '#c98a2e',
      accentSoft: 'rgba(201, 138, 46, 0.14)',
      border: 'rgba(28, 37, 54, 0.12)',
      glow: 'rgba(108, 93, 159, 0.16)'
    }
  },
  {
    id: 'practice-led',
    label: 'Practice-led',
    emphasis: 'Advisory warmth',
    primaryColors: ['Terracotta', 'Plum', 'Sand'],
    coreFeeling: 'Warm, human, premium',
    bestFor: 'Debriefs, service navigation, executive conversations',
    summary: 'Use warmer materials and calmer section pacing to make the advisory relationship feel clear without softening the substance.',
    whyItWorks: 'It supports Govern AI as a serious practice led by a named advisor rather than an abstract platform pitch.',
    vibe: 'Guided, warm, confident',
    recommended: true,
    swatches: [
      { label: 'Terracotta', value: '#b76046' },
      { label: 'Plum', value: '#4b3359' },
      { label: 'Sand', value: '#efe4d4' },
      { label: 'Ochre', value: '#c98a2e' }
    ],
    preview: {
      background: '#f4ece2',
      surface: '#fff7ef',
      surfaceStrong: '#3a283e',
      text: '#302233',
      muted: '#73646d',
      accent: '#b76046',
      accentSoft: 'rgba(183, 96, 70, 0.14)',
      border: 'rgba(48, 34, 51, 0.12)',
      glow: 'rgba(201, 138, 46, 0.16)'
    }
  },
  {
    id: 'signal-led',
    label: 'Signal-led',
    emphasis: 'Question intake',
    primaryColors: ['Graphite', 'Sage', 'Ochre'],
    coreFeeling: 'Modern, direct, calm',
    bestFor: 'Fast triage and answer-led entry',
    summary: 'Keep the surface darker and more compact so visitors can start from a pressure question and move quickly to the right evidence path.',
    whyItWorks: 'It modernizes the front door without losing Govern AI\'s claim discipline or review-ready structure.',
    vibe: 'Focused, answer-led, contemporary',
    swatches: [
      { label: 'Graphite', value: '#11171d' },
      { label: 'Sage', value: '#82b08f' },
      { label: 'Ochre', value: '#d3a250' },
      { label: 'Fog', value: '#edf5f1' }
    ],
    preview: {
      background: '#0f1519',
      surface: '#151e24',
      surfaceStrong: '#0b1216',
      text: '#edf5f1',
      muted: '#a6b7b1',
      accent: '#82b08f',
      accentSoft: 'rgba(130, 176, 143, 0.16)',
      border: 'rgba(237, 245, 241, 0.12)',
      glow: 'rgba(201, 138, 46, 0.16)'
    }
  }
];

export function getShowcaseVariant(slug) {
  return showcaseVariants.find((variant) => variant.slug === slug);
}
