export const en = {
  // Navigation
  nav: {
    home: 'HOME',
    services: 'SERVICES',
    cases: 'CASES',
    tool: 'TOOL',
    research: 'RESEARCH',
    library: 'LIBRARY',
    about: 'ABOUT',
    connect: 'CONNECT'
  },

  // Home page
  home: {
    title: 'AI Governance',
    subtitle: 'Strategy & Oversight',
    description: 'Governance systems that make AI decisions documented, reviewable, and defensible under audit and procurement scrutiny.',
    keywords: 'DEFENSIBLE DECISIONS · OPERATIONAL CONTROLS · EVIDENCE TRAIL',
    viewServices: 'View Services',
    bookDebrief: 'Book a Debrief',
    capabilities: {
      riskClassification: 'Risk Classification',
      riskClassificationDesc: 'Tier AI use cases by impact, sensitivity, and exposure',
      evidenceArchitecture: 'Evidence Architecture',
      evidenceArchitectureDesc: 'Documentation that survives audit scrutiny',
      controlDesign: 'Control Design',
      controlDesignDesc: 'Operational controls teams can actually execute'
    },
    starterKit: {
      title: 'AI Governance Starter Kit',
      description: 'Free templates to begin classifying risk and building controls today.',
      included: "What's included:",
      riskTemplate: 'Risk Tiering Template (Excel)',
      checklist: 'AI Governance Checklist (PDF)',
      controlGuide: 'Control Mapping Guide',
      emailPlaceholder: 'Enter your email',
      getKit: 'Get the Kit',
      sent: 'Sent!',
      noSpam: 'Opens your email client. No spam, just governance resources.'
    },
    sections: {
      assessment: 'Assessment',
      readinessSnapshot: 'Readiness Snapshot',
      assessMaturity: 'Assess governance maturity →',
      portfolio: 'Portfolio',
      caseStudies: 'Case Studies',
      seeExamples: 'See engagement examples →',
      research: 'Research',
      briefings: 'Governance Briefings',
      incidentsToControls: 'Incidents into controls →',
      resources: 'Resources',
      library: 'Governance Library',
      frameworksStandards: 'Frameworks & standards →'
    }
  },

  // Services page
  services: {
    title: 'Services',
    description: 'AI governance systems that remain usable day to day and remain defensible under audit and procurement review.',
    keywords: 'STRATEGY · CONTROLS · EVIDENCE · OVERSIGHT',
    whatIDeliver: 'What I deliver',
    deliverDescription: 'I help organizations operationalize AI governance: risk classification that people can apply, controls that teams can execute, and documentation that supports review by procurement, internal audit, compliance, and customers.',
    deliverDescription2: 'Engagements are designed to fit your constraints. You leave with a working model, clear decision rights, and an evidence trail that is practical to maintain.',
    viewServiceMenu: 'View the Service Menu',
    bookConsultation: 'Book a debrief',
    coreOffers: 'Core offers',
    outputs: 'Outputs',
    idealFor: 'Ideal for',
    seeDetails: 'See package details',
    pricingTitle: 'What pricing accounts for',
    pricingDescription: 'Pricing reflects what it takes to deliver a governance system that fits your organization and stands up to review.',
    assessReadiness: 'Assess your readiness',
    book30Min: 'Book a 30 minute debrief',
    offers: {
      foundation: {
        title: 'Governance Foundation',
        description: 'Establish the minimum viable governance system: AI use case inventory, risk tiers, decision rights, approval flows, and operating cadence.',
        outputs: 'Use case map, tiering logic, RACI matrix, baseline templates, governance calendar.',
        ideal: 'Organizations deploying AI without formal governance structures.'
      },
      controls: {
        title: 'Controls and Evidence Pack',
        description: 'Build audit and procurement readiness with a control register mapped to risk tiers, evidence expectations, and documentation standards.',
        outputs: 'Control register, evaluation criteria, vendor questionnaires, decision log templates, evidence packet structure.',
        ideal: 'Organizations preparing for internal audit, regulatory review, or customer due diligence.'
      },
      oversight: {
        title: 'Oversight Retainer',
        description: 'Ongoing advisory support to keep governance current as models, vendors, data flows, and use cases evolve.',
        outputs: 'Monthly oversight, decision log stewardship, control roadmap updates, audit and procurement support.',
        ideal: 'Organizations with active AI delivery who need stable oversight without slowing delivery.'
      }
    },
    pricing: {
      scope: {
        title: 'Scope and surface area',
        description: 'Number of AI use cases, vendors, and data pathways in scope. Stakeholder groups involved in governance decisions.'
      },
      sector: {
        title: 'Sector and evidence burden',
        description: 'Industry norms, regulatory requirements, and audit expectations. How documentation needs to be structured for your reviewers.'
      },
      timeline: {
        title: 'Timeline and complexity',
        description: 'Speed of delivery, complexity of integrations, and the level of decision authority assigned to AI systems.'
      }
    }
  },

  // Tool page
  tool: {
    title: 'AI Governance Readiness Snapshot',
    description: 'Choose your sector of operation to assess your readiness to audits, regulators, and risk assessment.',
    steps: {
      sector: 'SECTOR',
      readiness: 'READINESS',
      results: 'RESULTS'
    },
    step1: {
      title: 'Choose your sector',
      description: 'This tailors language and the expected evidence burden.'
    },
    step2: {
      title: 'Question',
      of: 'of'
    },
    sectors: {
      regulated: { title: 'Regulated systems', description: 'Higher evidence burden, tighter approvals, audit-grade remediation.' },
      enterpriseSaas: { title: 'Enterprise SaaS', description: 'Governance that ships: release cadence, drift, and vendorized AI features.' },
      procurement: { title: 'Procurement & vendor risk', description: 'Questionnaires become controls: diligence artifacts, contract-backed proof.' },
      publicSector: { title: 'Public sector & due process', description: 'Contestability, appeal pathways, reconstruction under scrutiny.' },
      financial: { title: 'Financial & capital systems', description: 'Models move money: exposure controls, stress testing, adverse action logic.' },
      governance: { title: 'Governance operating model', description: 'Decision rights, lifecycle gates, evidence trails that scale.' }
    },
    questions: {
      inventory: 'Do you have a documented inventory of AI use cases and vendors?',
      riskTiering: 'Is there a risk classification system for AI use cases?',
      decisionRights: 'Are decision rights and approvals clearly defined?',
      controls: 'Do you have controls mapped to risk tiers?',
      evidence: 'Is evidence being collected for audit readiness?',
      vendorReview: 'Do you have a vendor AI review process?',
      cadence: 'Is there a recurring governance review cadence?',
      documentation: 'Is governance documentation current and accessible?'
    },
    answers: {
      no: 'No',
      partial: 'Partial',
      yes: 'Yes',
      informal: 'Informal',
      formal: 'Formal',
      some: 'Some',
      adhoc: 'Ad-hoc',
      systematic: 'Systematic',
      basic: 'Basic',
      structured: 'Structured',
      occasional: 'Occasional',
      established: 'Established',
      outdated: 'Outdated',
      current: 'Current'
    },
    buttons: {
      back: 'Back',
      reset: 'Reset',
      next: 'Next',
      seeResults: 'See Results',
      selectSector: 'Select a sector to continue'
    },
    results: {
      title: 'Readiness Snapshot',
      scoreBreakdown: 'Score Breakdown',
      total: 'Total',
      recommendedSteps: 'Recommended Next Steps',
      bookDebrief: 'Book a 30 min debrief',
      viewServices: 'View services',
      retake: 'Retake',
      risks: {
        low: 'Low Risk',
        moderate: 'Moderate Risk',
        elevated: 'Elevated Risk',
        high: 'High Risk'
      }
    }
  },

  // About page
  about: {
    title: 'About Me',
    description: 'Governance that is usable under real constraints: decision rights, controls, and documentation that holds under review.',
    keywords: 'PRACTICE · APPROACH · BACKGROUND',
    practiceTitle: 'What AI Governance Practice means',
    practiceP1: "AI governance isn't a policy PDF.",
    practiceP1b: 'It is a system people can actually use: a way to classify risk, apply the right controls, define who owns decisions, and keep a record of what was decided, why, and by whom.',
    practiceP2: 'My work',
    practiceP2b: 'is to help you build that system in your organization: map AI use cases, define practical risk tiers, set approvals and decision rights, and deliver templates and documentation buyers and auditors expect.',
    steps: {
      classify: { title: 'Classify risk', description: 'Build a use-case and vendor inventory, then tier by impact, sensitivity, autonomy, and exposure.' },
      design: { title: 'Design controls', description: 'Define decision rights, approvals, testing expectations, monitoring, and ownership (RACI).' },
      maintain: { title: 'Maintain evidence', description: 'Keep documentation current as models, prompts, data, and vendors change.' }
    },
    aboutMe: 'About me',
    bio: 'Martin Lepage (PhD) is a Montreal-based AI systems and risk mapping consultant who helps organizations make AI use legible, governable, and defensible. He builds minimum-viable governance that survives real constraints: use-case inventories, risk maps, decision traceability, evaluation criteria, and executive-ready documentation.',
    viewPortfolio: 'View Portfolio & Publications',
    featuredResearch: 'Featured Research',
    sealedCard: 'The Sealed Card Protocol',
    sealedCardDesc: 'A framework for analyzing how legitimacy is established in the context of generative AI—examining mediation, authenticity, and accountability at the seam where evaluation shifts from artifact to pathway.',
    readProtocol: 'Read the Protocol'
  },

  // Connect page
  connect: {
    title: 'Connect',
    description: 'AI governance advisory, audit and procurement readiness assessment, or a focused debrief on your governance posture.',
    keywords: 'ADVISORY · ASSESSMENT · DEBRIEF',
    tabs: {
      message: 'Send Message',
      booking: 'Book Debrief'
    },
    form: {
      name: 'Name',
      email: 'Email',
      organization: 'Organization',
      lookingFor: 'What are you looking for?',
      context: 'Context',
      contextPlaceholder: 'AI use cases in scope, governance maturity, audit timelines, specific concerns...',
      submit: 'Open email draft',
      opening: 'Opening email...'
    },
    booking: {
      title: 'Book a 30-Minute Debrief',
      subtitle: 'Focused discussion on your AI governance posture',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      selectTime: 'Select time...',
      topic: 'Discussion Topic',
      selectTopic: 'Select topic...',
      currentState: 'Current Governance State',
      currentStatePlaceholder: 'Brief description: Do you have an AI inventory? Risk tiers? Existing controls? Upcoming audits?',
      requestSlot: 'Request this time slot',
      confirmation: "I'll confirm availability within 24 hours. Times shown in Eastern timezone."
    },
    topics: {
      foundation: 'Governance Foundation Setup',
      riskClassification: 'Risk Classification & Tiering',
      auditReadiness: 'Audit/Procurement Readiness',
      vendorAssessment: 'Vendor AI Assessment',
      controlsDesign: 'Controls & Evidence Design',
      readinessReview: 'Readiness Score Review',
      other: 'Other'
    },
    resources: {
      title: 'Governance Resources',
      auditChecklist: 'AI Governance Audit Checklist',
      auditChecklistDesc: 'Evidence requirements and stakeholder questions for audit readiness.',
      riskFramework: 'Risk Tiering Framework Template',
      riskFrameworkDesc: 'Classification criteria for AI use cases by impact and sensitivity.',
      vendorQuestions: 'Vendor AI Review Questions',
      vendorQuestionsDesc: 'Due diligence questionnaire for third-party AI procurement.',
      request: 'Request →',
      directContact: 'Direct contact',
      notSure: 'Not sure where to start?',
      takeSnapshot: 'Take the Readiness Snapshot →'
    }
  },

  // Cases page
  cases: {
    title: 'Case Studies',
    description: 'Selected engagements illustrating governance challenges and solutions across sectors. Details anonymized to protect client confidentiality.',
    keywords: 'FINANCIAL SERVICES · HEALTHCARE · ENTERPRISE · PUBLIC SECTOR',
    challenge: 'Challenge',
    approach: 'Approach',
    outcomes: 'Outcomes',
    deliverables: 'Deliverables',
    discussChallenge: 'Discuss a Similar Challenge',
    facingChallenge: 'Facing a similar challenge?',
    facingChallengeDesc: 'Book a debrief to discuss how these approaches might apply to your organization.',
    bookDebrief: 'Book a Debrief'
  },

  // Footer
  footer: {
    copyright: '© 2026 Martin Lepage, PhD. AI Governance Practice & Research'
  },

  // Common
  common: {
    learnMore: 'Learn more',
    viewAll: 'View all',
    download: 'Download',
    contact: 'Contact'
  }
};
