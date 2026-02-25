export const researchPapers = [
  {
    id: 'hiring-ai-bias',
    title: 'When Hiring AI Quietly Rewrites Your Talent Pipeline',
    date: '2024-11-15',
    context: 'enterprise-saas',
    type: 'briefing',
    abstract: 'Hiring automation rarely announces itself as policy, but it behaves like policy the moment it reshapes who gets seen. This briefing examines how screening models redistribute attention, compress deliberation, and change what counts as a viable candidate.',
    content: `Hiring automation rarely announces itself as policy, but it behaves like policy the moment it reshapes who gets seen. Screening models do not simply "rank resumes." They redistribute attention, compress deliberation, and change what counts as a viable candidate. Once that happens, your organization has moved from experimentation to governance territory, even if nobody updated a single HR document.

The hard part is that bias does not usually appear as an error message. Bias appears as a pattern that looks like "efficiency" until someone forces the pattern into view. Historical hiring data embeds historical hiring decisions, and optimization often treats those patterns as signals to preserve. That mechanism is predictable. The risk is also predictable. A system can appear accurate while systematically downgrading candidates whose resumes carry markers correlated with gender, race, disability, class, or caregiving status.

We treat hiring AI as high-impact infrastructure because the consequence domain is labor access and institutional liability. Our approach starts with risk classification and moves immediately into enforceable gates. We define fairness and performance thresholds before deployment, test for proxy features rather than pretending protected attributes never enter the system, and require documented approval for launch. We also design monitoring that looks for drift, feedback loops, and changes in applicant pool composition, because the pipeline adapts to the tool over time.

The governance failure in the Amazon recruiting tool incident was not "bias exists." The governance failure was that bias was not framed as a deployment-stopping condition with explicit thresholds, test design, and decision rights. In practice, the most damaging bias failures are not subtle philosophical problems. They are process failures: no pre-defined fairness metrics, no proxy-feature review, no structured validation against the actual decision context, and no monitoring plan that treats drift and feedback loops as expected operational realities.

In hiring, you rarely get one clean "protected attribute" column. Discrimination enters through proxies: school names, club membership, gaps in employment, zip codes, even stylistic markers that correlate with gender, class, or race. If governance does not force the team to name proxy risk early, the model will discover proxies on its own, because proxies often improve predictive performance on the target label. That is what optimization does.

A defensible control baseline for hiring AI is a sequence of enforceable gates. First, risk-tier the use case as high impact. Second, run bias and performance evaluation across relevant groups. Third, audit features and proxies with structured review. Fourth, document decision rights: who can approve launch, who can pause the system, who owns monitoring. Fifth, implement post-launch monitoring that looks for disparate impact and emergent proxy behavior.

If your organization ever needs to defend hiring automation under scrutiny, you do not win with intentions. You win with evidence. We build the evidence trail that proves what you tested, what you accepted, what you rejected, and who held the authority to make that decision.`
  },
  {
    id: 'data-provenance',
    title: 'When Data Collection Becomes Regulatory Exposure',
    date: '2024-10-28',
    context: 'regulated',
    type: 'briefing',
    abstract: 'Most AI risk stories begin with the model, because the model is visible. The real exposure often begins earlier, at data ingestion, where organizations accumulate training corpora that remain legally contested.',
    content: `Most AI risk stories begin with the model, because the model is visible. The real exposure often begins earlier, at data ingestion, where organizations accumulate training corpora that feel useful but remain legally and ethically contested. Once that happens, your system inherits the risk of its inputs, and you carry that risk across every product release, every deployment, and every new jurisdiction.

Data provenance is not a technical footnote. Provenance is what makes your system defensible. If your dataset contains personal information, scraped content, biometrics, or unclear permissions, your organization is no longer deciding only how to build. Your organization is deciding what it can justify. Privacy law, consumer protection, and sector-specific regulation do not ask whether your system is innovative. They ask whether your collection and use are lawful, proportionate, and accountable.

The Clearview AI case illustrates this precisely. Training data provenance is not a technical footnote. It is a legal act with institutional consequences. When a system is built on scraped personal data at massive scale, the risk is not only public backlash. The risk is cross-jurisdiction enforcement and durable reputational harm that attaches to every downstream deployment.

In privacy regulation, the core questions recur. What lawful basis exists for collection. What consent, if any, was obtained. What purpose limitation was declared. What retention and deletion policies exist. What safeguards exist for sensitive data. What transparency is provided to data subjects. If an organization cannot answer these questions with documents and controls, it has not performed governance. It has performed optimism.

We make data defensible by turning sourcing into a governed pipeline rather than an ad hoc asset grab. We map jurisdictions, define lawful basis and purpose limitation, run privacy impact assessments before ingestion, and implement retention and deletion rules that align with your operational reality. We also build evidence integrity, so you can prove what you did, when you did it, and what was reviewed at the time, rather than reconstructing under pressure.

The practical advantage is speed with confidence. When governance is built into the data layer, product teams stop negotiating the same risk repeatedly, and leadership stops discovering exposure only after public attention arrives. You keep momentum without building on contested ground. The strategic lesson is blunt: you cannot build legitimacy on contested data. If your training corpus is a liability, every deployment inherits that liability.`
  },
  {
    id: 'forecasting-financial-risk',
    title: 'When a Forecasting Model Moves Real Money',
    date: '2024-10-12',
    context: 'financial',
    type: 'briefing',
    abstract: 'Prediction looks calm in a dashboard, because dashboards hide tail risk. This briefing examines what happens when forecasting models couple to real capital allocation and how governance prevents predictable failure.',
    content: `Prediction looks calm in a dashboard, because dashboards hide tail risk. Once a forecasting model starts allocating capital, pricing inventory, or driving automated buying decisions, small errors stop being small. They compound across volume, across time, and across market shifts that your training data never experienced. A model can be directionally reasonable and still be financially destructive when operationalized at scale.

This is not a warning against analytics. It is a warning against ungoverned coupling between model output and real-world execution. Markets change regimes. Input distributions move. Feedback loops emerge when competitors respond. Operational constraints add friction that models do not represent. If your governance program treats evaluation as a one-time accuracy score, your program is incomplete.

The Zillow Offers shutdown demonstrates this precisely. Model failure is not the scandal. The scandal is letting model failure become balance-sheet failure. When predictive systems allocate capital, the organization needs model risk management, scenario stress testing, and exposure controls that treat uncertainty as a first-class operating condition. The governance lesson is not "AI is bad at housing." The lesson is that a model can be directionally useful and still be financially catastrophic when coupled to aggressive automation, weak stress testing, and insufficient human override authority.

Real markets do not behave like tidy training distributions. They shift with interest rates, local supply shocks, seasonality, and feedback loops. A pricing or forecasting model trained on historical conditions may look strong in backtests and still fail when it encounters a regime change. Governance exists to make that possibility operationally survivable.

We govern these systems as financial-impact infrastructure. That begins with risk classification tied to exposure, not to model novelty. It continues with scenario stress testing, independent validation, and explicit rules for when human adjudication is mandatory. We also design exposure caps and kill-switch authority so that uncertainty does not automatically become loss. Monitoring is built around business outcomes and tail behavior, not only around average performance metrics.

The selling point is not that governance makes models perfect. The selling point is that governance prevents predictable model limitations from becoming preventable financial events. If your organization wants to scale AI into revenue-bearing decisions, you need controls that scale with it.`
  },
  {
    id: 'risk-scores-due-process',
    title: 'When Risk Scores Replace Due Process',
    date: '2024-09-25',
    context: 'public-sector',
    type: 'briefing',
    abstract: 'Risk scoring systems often arrive as decision support. Over time, they become decision policy through habit. This briefing examines why algorithmic systems in high-stakes environments require contestability architecture.',
    content: `Risk scoring systems often arrive as decision support. Over time, they become decision policy through habit, workflow pressure, and institutional appetite for "objective" signals. That transition is one of the most common governance failures in high-stakes environments. A score that begins as advice gradually disciplines attention and narrows discretion, while the institution continues to speak as if a human remains fully in control.

When a score influences eligibility, access, enforcement, or resource allocation, the consequence domain becomes institutional legitimacy. People subject to adverse outcomes will demand explanation, contestability, and remedies, and they will do it through courts, regulators, journalists, and internal escalations. A system that cannot be explained in context, or appealed in practice, will not survive scrutiny, even if it can be defended statistically.

The Dutch child benefits scandal demonstrates the terminal case. Algorithmic risk scoring and enforcement practices falsely accused thousands of families of fraud, producing severe financial and social consequences. The Dutch government resigned in 2021. This is the archetype of what happens when the state operationalizes suspicion through opaque scoring. The governance failure is not simply "bias." It is lack of due process architecture.

High-impact decisions require contestability. People must be able to understand the basis of adverse decisions and have a viable pathway to challenge them. Without that, the system becomes a machine for administrative violence. Risk scoring often relies on proxies that correlate with class, ethnicity, immigration status, and neighborhood. Even if the model does not "use race," it can operationalize discrimination through features that function as race-adjacent signals.

We build governance that treats due process as a design requirement, not an afterthought. We define what the score is allowed to do, what it is prohibited from doing, and what thresholds force human adjudication. We implement explainability requirements that match the decision context, and we design appeals pathways that can actually overturn outcomes, rather than merely receiving complaints. We also require monitoring for disparate impact and error concentration, because harm often clusters in specific groups and scenarios.

You do not need a philosophical stance to take this seriously. You only need to recognize that opacity turns routine operations into fragile operations. We make systems robust by making them contestable.`
  },
  {
    id: 'vendor-ai-liability',
    title: 'When Vendors Hold the Model and You Hold the Liability',
    date: '2024-09-08',
    context: 'procurement',
    type: 'briefing',
    abstract: 'Vendor AI often arrives as a shortcut to capability. If governance is weak, it becomes a shortcut to accountability collapse. This briefing examines how to govern third-party AI systems.',
    content: `Vendor AI often arrives as a shortcut to capability. If governance is weak, it becomes a shortcut to accountability collapse. Outsourcing a model does not outsource responsibility, because customers, regulators, and auditors will look to the deploying organization, not to the supplier, when something fails.

The practical risk is simple. If your vendor cannot provide validation artifacts, change notifications, monitoring evidence, and clear limitations, you are operating a black box inside your workflow. When the model changes, you may not know. When behavior shifts, you may not be able to diagnose it. When an incident occurs, you may not be able to reconstruct why. That is not only a technical problem. It is a defensibility problem.

The COMPAS controversy illustrates why algorithmic systems in criminal justice become public battlegrounds: because they touch liberty, and because people will not accept opaque infrastructure governing life trajectories. The governance problem is not only technical disagreement about which fairness definition is "correct." It is institutional incapacity to justify the system's authority. Risk models can satisfy some fairness metrics while failing others. Governance is the process of choosing, documenting, and defending a fairness definition appropriate to the domain.

We treat third-party AI as part of your system boundary. We classify vendor systems by impact and data sensitivity, then define contractual requirements for auditability and support. We require evidence expectations that align with your risk tier, including evaluation documentation, incident response commitments, and change management procedures. We also implement integration-level monitoring on your side, because visibility should not depend on vendor goodwill. Finally, we build reassessment triggers so that vendor updates automatically prompt governance review rather than quietly landing in production.

The key governance lesson is that "accuracy" does not settle legitimacy. A system can be statistically impressive and still be unacceptable because it embeds historical injustice, hides causal assumptions, or makes outcomes difficult to contest. Governance must name that gap and build constraints around it.

The result is leverage. You gain the ability to say yes to vendors without surrendering your ability to govern what they do inside your institution.`
  },
  {
    id: 'shadow-ai-leakage',
    title: 'When Employees Turn GenAI Into a Leak Vector',
    date: '2024-08-22',
    context: 'enterprise-saas',
    type: 'briefing',
    abstract: 'The most common GenAI incident is not a model malfunction. It is a workflow leak. This briefing examines how to govern shadow AI usage without blocking legitimate productivity gains.',
    content: `The most common GenAI incident is not a model malfunction. It is a workflow leak. Employees paste sensitive information into external tools because the tool is fast, the task is urgent, and the boundaries are unclear. This is not a failure of curiosity. It is a failure of institutional design.

Organizations often respond by banning tools, which solves the visible problem while expanding the invisible one. Shadow AI thrives when sanctioned alternatives are slow, unusable, or nonexistent. If you want governance that holds, you need a policy that staff can follow and a secure path that makes compliance realistic.

Samsung reportedly restricted or banned ChatGPT use after employees pasted proprietary code and confidential content into the tool. The governance error was not that engineers were curious. The governance error was that there was no structured boundary between permissible experimentation and prohibited disclosure. This category of incident is operationally predictable. People treat AI tools as "smart text boxes." They forget that the input may be stored, learned, reviewed, or exposed through logs and vendor processes.

We implement GenAI governance as data handling governance. That begins with data classification tied to clear tool rules, so employees know what may be used where, and under what conditions. It continues with secure alternatives for legitimate needs, such as private environments, approved assistants, or controlled retrieval systems. We also build training that uses concrete examples, not vague warnings, because people learn boundaries through scenarios that resemble their actual work. Monitoring and incident reporting complete the loop, because governance improves only when mistakes are surfaced early rather than hidden.

The control set is straightforward, but it must be enforceable. First, classify data and define what can be used in external tools. Second, provide an approved secure alternative for legitimate use cases. Third, train people using realistic examples. Fourth, implement monitoring where feasible, and create a reporting channel that does not punish people for admitting a mistake early.

This is not about restricting innovation. It is about preventing preventable loss of intellectual property, client confidentiality, and regulated data. Good governance protects speed by protecting the organization from the kind of incident that forces speed to stop.`
  },
  {
    id: 'chatbot-institutional-speech',
    title: 'When a Customer Chatbot Turns Into Institutional Speech',
    date: '2024-08-05',
    context: 'enterprise-saas',
    type: 'briefing',
    abstract: 'Customer-facing AI systems are often shipped with disclaimers and optimism. In practice, customers treat them as official. This briefing examines how to govern AI as institutional communication.',
    content: `Customer-facing AI systems are often shipped with disclaimers and optimism. In practice, customers treat them as official. Screenshots turn outputs into durable evidence. When a chatbot communicates policy, it functions as institutional speech, regardless of how the organization labels it internally.

The governance failure here is rarely "hallucination" alone. The governance failure is deploying a system that can generate policy-relevant statements without controlling its sources, logging its outputs, or defining escalation for ambiguous cases. A disclaimer does not substitute for controls. A banner does not create accountability. A monitoring plan does.

In 2024, an Air Canada chatbot gave a customer incorrect refund information. The airline was ordered to honor the chatbot's statement. The key governance lesson is not "chatbots hallucinate." The lesson is that the organization deployed a communication channel without adequate controls for policy fidelity, escalation, and correction. Users treat chatbots as official. Screenshots create durable evidence. In disputes, institutions often claim the bot is a separate tool, but that defense is weak if the organization failed to implement basic source control and monitoring.

We govern customer-facing chatbots by scoping capability and enforcing boundaries technically. If the system is allowed to answer policy questions, it must retrieve from approved policy sources with ownership, version history, and review cadence. If the question enters interpretive territory, the system must route to a human agent rather than improvising. We instrument logging for traceability, implement monitoring for high-consequence error patterns, and define remediation timelines that create a documented correction record.

The second anchor is versioning and ownership. Policy pages need owners, review cadence, and change logs. The bot's knowledge layer must be tied to those pages so the organization can show what the system had access to at the time. The third anchor is monitoring and remediation. If the system produces incorrect policy statements, the organization must log it, correct it, and document the correction timeline.

The selling point is trust under scrutiny. When something goes wrong, the organization that can produce an evidence trail remains credible. We build customer-facing AI that ships with defensibility, not just with features.`
  }
];

export const contexts = [
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
