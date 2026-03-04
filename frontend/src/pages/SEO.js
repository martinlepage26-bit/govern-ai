// Seo.jsx (JavaScript / JSX)
// npm i react-helmet-async

import React from "react";
import { Helmet } from "react-helmet-async";

const ORIGIN = "https://govern-ai.ca";
const OG_IMAGE = `${ORIGIN}/og-image.png`;

export function Seo({
  lang = "en-CA",
  title = "Legible Controls | AI Governance Consulting",
  description = "Inspection-ready AI governance: constraint design embedded into workflow gates so evidence stays legible and decisions hold under scrutiny. Powered by AurorAI + CompassAI.",
  canonical = ORIGIN,
}) {
  const keywords =
    "AI governance, inspection-ready governance, evidence mapping, evidence architecture, risk classification, workflow gates, AI system inventory, model cards, system cards, AI incident response, procurement packet, audit readiness, Canada, Quebec Law 25, Treasury Board directives, AIDA";

  const schemaProfessionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Legible Controls — AI Governance Consulting",
    slogan: "Legible Controls. Evidence Reviewed. Decisions That Stand.",
    description:
      "Inspection-ready AI governance implemented through workflow gates: document-to-evidence legibility (AurorAI) plus repeatable governance routing and deliverables (CompassAI). No compliance certification, legal advice, or automated approvals.",
    url: ORIGIN,
    email: "consult@govern-ai.ca",
    founder: {
      "@type": "Person",
      name: "Martin Lepage",
      honorificSuffix: "PhD",
      jobTitle: "AI Governance Consultant",
    },
    areaServed: { "@type": "Country", name: "Canada" },
    serviceType: [
      "AI System Inventory & Use-Case Registry",
      "Evidence Mapping & Traceability",
      "Risk Classification & Rationale Logging",
      "Workflow Gate & Control Design",
      "Monitoring & Incident Readiness",
      "Board / Procurement Legibility Packets",
    ],
    knowsAbout: [
      "AI governance",
      "evidence architecture",
      "risk classification",
      "workflow gates",
      "algorithmic accountability",
      "AI incident response",
      "Quebec Law 25",
      "Treasury Board directives",
      "AIDA",
    ],
  };

  const schemaServiceCatalog = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Governance Consulting",
    provider: {
      "@type": "ProfessionalService",
      name: "Legible Controls — AI Governance Consulting",
      url: ORIGIN,
    },
    areaServed: "Canada",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Governance Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Governance Foundation",
            description:
              "Document-to-evidence inventory + evidence map, risk classification scheme with rationale logging, operating model, and inspection-ready starter artifacts.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Delivery Gates",
            description:
              "Intake + triage rubric, deployment gate checklists, documentation standards (system/model cards), and procurement-ready vendor evaluation packets.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Monitoring + Response",
            description:
              "KPI/KRI definitions, drift/harm signal thresholds, incident response playbooks and tabletop drills, plus quarterly control refresh packets.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Board / Procurement Legibility Package",
            description:
              "Indexed artifact bundle + decision trail summary and tight briefing narrative built to withstand scrutiny.",
          },
        },
      ],
    },
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does “inspection-ready” AI governance mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It means your controls bind to real workflow gates (intake, build, deploy, monitor) and your evidence can be reconstructed: what was decided, why, by whom, and with which artifacts.",
        },
      },
      {
        "@type": "Question",
        name: "What are AurorAI and CompassAI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AurorAI is the legibility layer that turns messy documents into an evidence map and traceable outputs. CompassAI is the governance engine that routes classification → obligations → gates → artifacts → monitoring to produce repeatable deliverable bundles.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide legal advice or compliance certification?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The work focuses on governance infrastructure, controls, and evidence design to support accountable human decisions and withstand review by security, procurement, audit, and regulators.",
        },
      },
      {
        "@type": "Question",
        name: "What artifacts do you deliver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common deliverables include AI system and use-case inventories, risk classification decisions with rationale logs, gate checklists, system/model cards, vendor evaluation packets, and monitoring/incident response materials.",
        },
      },
      {
        "@type": "Question",
        name: "How do you integrate governance into existing delivery workflows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By identifying insertion points in your SDLC/procurement processes and designing lightweight gates with clear entry criteria, required evidence, and sign-off packets—so governance becomes routing, not overhead.",
        },
      },
    ],
  };

  return (
    <Helmet>
      {/* Document language */}
      <html lang={lang} />

      {/* Title + canonical */}
      <title>{title}</title>
      <link rel="canonical" href={canonical} />

      {/* Primary SEO */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content="Legible Controls | Evidence-First AI Governance" />
      <meta
        property="og:description"
        content="Legible Controls. Evidence Reviewed. Decisions That Stand. Inspection-ready AI governance delivered through workflow gates—powered by AurorAI + CompassAI."
      />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Legible Controls — AI Governance Consulting (AurorAI + CompassAI)"
      />
      <meta property="og:site_name" content="Legible Controls" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:locale:alternate" content="fr_CA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Legible Controls | Evidence-First AI Governance"
      />
      <meta
        name="twitter:description"
        content="Inspection-ready AI governance via workflow gates: legible evidence, reviewable controls, decisions that hold under scrutiny. Powered by AurorAI + CompassAI."
      />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="Legible Controls — AI Governance Consulting" />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaProfessionalService)}
      </script>
      <script type="application/ld+json">{JSON.stringify(schemaServiceCatalog)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
    </Helmet>
  );
}