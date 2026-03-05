from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import asyncio
import resend

# Load environment variables first
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

# Create the main app
app = FastAPI(title="Govern-AI API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ MODELS ============

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: str
    status: str
    message: str

class Publication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: f"pub-{str(uuid.uuid4())[:8]}")
    title: str
    abstract: str
    content: Optional[str] = None
    date: str
    link: Optional[str] = None
    tags: List[str] = []
    published: bool = True

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    client_type: str
    challenge: str
    approach: str
    outcome: str
    tags: List[str] = []

class AssessmentQuestion(BaseModel):
    id: int
    question: str
    options: List[str]
    category: str

class AssessmentSubmission(BaseModel):
    answers: dict  # {question_id: selected_option_index}
    company_name: Optional[str] = None
    email: Optional[str] = None

class AssessmentResult(BaseModel):
    id: str
    overall_score: int
    category_scores: dict
    recommendations: List[str]
    analysis: str
    timestamp: str

# ============ ASSESSMENT QUESTIONS ============

ASSESSMENT_QUESTIONS = [
    {
        "id": 1,
        "question": "How are AI system boundaries defined in your organization?",
        "options": [
            "No formal definition exists",
            "Informal documentation only",
            "Formal documentation with some gaps",
            "Comprehensive system boundary documentation"
        ],
        "category": "System Boundaries"
    },
    {
        "id": 2,
        "question": "How do you handle risk tiering for AI deployments?",
        "options": [
            "No risk tiering process",
            "Ad-hoc risk assessment",
            "Standardized but incomplete process",
            "Comprehensive risk tiering with clear escalation paths"
        ],
        "category": "Risk Management"
    },
    {
        "id": 3,
        "question": "What controls exist before shipping AI features?",
        "options": [
            "No pre-deployment controls",
            "Basic testing only",
            "Testing with some approval gates",
            "Full lifecycle gates with documented approvals"
        ],
        "category": "Control Gates"
    },
    {
        "id": 4,
        "question": "How is decision authority documented for AI systems?",
        "options": [
            "No documentation",
            "Informal understanding only",
            "Some roles documented",
            "Complete authority matrix with audit trails"
        ],
        "category": "Authority & Accountability"
    },
    {
        "id": 5,
        "question": "What incident response protocols exist for AI failures?",
        "options": [
            "No protocols",
            "General IT incident process only",
            "AI-specific protocols in development",
            "Comprehensive playbooks with tested containment"
        ],
        "category": "Incident Response"
    },
    {
        "id": 6,
        "question": "How do you manage permissions for agentic AI systems?",
        "options": [
            "No permission model",
            "Broad permissions with limited oversight",
            "Defined permissions with some gaps",
            "Explicit permission model with audit logging"
        ],
        "category": "Agentic Governance"
    },
    {
        "id": 7,
        "question": "Can you reconstruct how AI decisions were made?",
        "options": [
            "No reconstruction capability",
            "Limited logging only",
            "Partial replay capability",
            "Full decision reconstruction with evidence artifacts"
        ],
        "category": "Auditability"
    },
    {
        "id": 8,
        "question": "How are AI system changes controlled?",
        "options": [
            "No change control",
            "Informal notification process",
            "Approval required for major changes",
            "Full change control with re-approval triggers"
        ],
        "category": "Change Control"
    }
]

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Govern-AI API", "status": "operational"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Governance Stats - Combined CompassAI + AurorAI metrics for homepage
@api_router.get("/governance/stats")
async def get_governance_stats():
    """Combined governance stats for homepage indicator"""
    # CompassAI stats
    compass_usecases = await db.compass_usecases.count_documents({})
    compass_approved = await db.compass_usecases.count_documents({"status": {"$in": ["approved", "approved_with_conditions"]}})
    compass_evidence = await db.compass_evidence.count_documents({})
    compass_deliverables = await db.compass_deliverables.count_documents({})
    
    # AurorAI stats
    aurora_docs = await db.aurora_documents.count_documents({})
    aurora_validated = await db.aurora_documents.count_documents({"status": {"$in": ["validated", "exported"]}})
    aurora_reviews = await db.aurora_reviews.count_documents({"status": "pending"})
    
    return {
        "compass": {
            "usecases_governed": compass_usecases,
            "usecases_approved": compass_approved,
            "evidence_packs": compass_evidence,
            "deliverables_generated": compass_deliverables,
            "controls_cataloged": 12,
            "policies_active": 3,
            "risk_tiers": "T0-T3"
        },
        "aurora": {
            "documents_processed": aurora_docs,
            "documents_validated": aurora_validated,
            "pending_reviews": aurora_reviews,
            "schemas_available": 4,
            "pipeline_version": "IDP-v0.1"
        },
        "combined": {
            "total_governed_items": compass_usecases + aurora_docs,
            "audit_ready_percentage": round(((compass_approved + aurora_validated) / max(compass_usecases + aurora_docs, 1)) * 100, 1),
            "active_controls": 12,
            "active_policies": 3
        }
    }

# Contact Form
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    contact_id = str(uuid.uuid4())
    
    # Save to database
    contact_doc = {
        "id": contact_id,
        "name": request.name,
        "email": request.email,
        "company": request.company,
        "message": request.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "new"
    }
    await db.contacts.insert_one(contact_doc)
    
    # Send email notification
    try:
        html_content = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> {request.name} ({request.email})</p>
        <p><strong>Company:</strong> {request.company or 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>{request.message}</p>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": ["martinlepage.ai@gmail.com"],
            "subject": f"New Contact: {request.name} - Govern-AI",
            "html": html_content
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Contact email sent for {contact_id}")
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
    
    return ContactResponse(
        id=contact_id,
        status="success",
        message="Thank you for reaching out. I'll respond within 24-48 hours."
    )

# Publications - CRUD with Admin access
class PublicationCreate(BaseModel):
    title: str
    abstract: str
    content: Optional[str] = None
    date: str
    link: Optional[str] = None
    tags: List[str] = []
    published: bool = True

class PublicationUpdate(BaseModel):
    title: Optional[str] = None
    abstract: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    link: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None

# Seed publications data
SEED_PUBLICATIONS = [
    {
        "id": "pub-1",
        "title": "Governance as Decision Machinery: Beyond Observability Theater",
        "abstract": "This paper argues that effective AI governance must be embedded in workflow gates, not bolted on as monitoring. We present a framework for converting leadership intent into operational constraints.",
        "content": """# Governance as Decision Machinery

## The Problem with Observability Theater

Many organizations treat AI governance as an afterthought—a dashboard that shows what happened after the fact. This is observability theater: it looks like governance but provides no actual control.

## What Real Governance Looks Like

Real governance embeds constraints into the workflow itself:
- **Intake gates** that require system boundary documentation before any model work begins
- **Risk tiering** that determines which controls apply based on actual risk factors
- **Pre-deployment approvals** that can't be bypassed without explicit exception protocols
- **Evidence collection** that happens automatically as decisions are made

## The Framework

1. **Intent Capture**: What does leadership actually want to prevent?
2. **Constraint Design**: How do we encode those intentions into enforceable rules?
3. **Gate Implementation**: Where in the workflow do these rules execute?
4. **Evidence Architecture**: What gets recorded to prove compliance?

## Conclusion

Governance isn't monitoring. It's the decision machinery that makes shipping decisions defensible before they're made, not just reviewable after.""",
        "date": "2025-12",
        "link": "https://linkedin.com/in/martin-lepage-ai",
        "tags": ["AI Governance", "Decision Systems", "Controls"],
        "published": True
    },
    {
        "id": "pub-2",
        "title": "Agentic AI Governance: Permissions, Boundaries, and Accountability",
        "abstract": "When AI systems act autonomously, governance shifts from output quality to delegated authority. This paper presents a permissions model for agentic systems.",
        "content": """# Agentic AI Governance

## The Shift from Prediction to Action

Traditional AI governance focused on model quality: Is the output accurate? Is it biased? These questions remain important, but agentic systems introduce a new risk surface: **delegated authority**.

## What Makes Agentic Different

An agentic system:
- Plans multi-step actions
- Calls external tools and APIs
- Modifies data and systems
- Acts under delegated authority

The risk isn't just "bad prediction"—it's "unauthorized action."

## The Permissions Model

Every agentic system needs explicit answers to:
1. **What can it do?** (Allowed actions)
2. **What can't it do?** (Prohibited actions)
3. **What requires escalation?** (Human-in-the-loop thresholds)
4. **What triggers a stop?** (Kill switches)

## Implementation

- Define agency boundaries before deployment
- Implement tool-level permissions
- Log every action with reconstruction capability
- Design containment for when things go wrong

## Conclusion

Agentic governance is about making delegated authority legible, bounded, and accountable.""",
        "date": "2025-10",
        "link": "https://linkedin.com/in/martin-lepage-ai",
        "tags": ["Agentic AI", "Permissions", "Accountability"],
        "published": True
    },
    {
        "id": "pub-3",
        "title": "Evidence Artifacts for Audit-Grade AI Narratives",
        "abstract": "How to design evidence collection that survives procurement scrutiny, incident reviews, and regulatory examination.",
        "content": """# Evidence Artifacts for Audit-Grade AI

## Why Evidence Architecture Matters

When regulators, auditors, or incident reviewers examine your AI systems, they ask: "Show me how you made this decision." If you can't reconstruct the answer, you have a governance gap.

## The Evidence Pyramid

1. **Decision Records**: Who decided what, when, and why
2. **Test Evidence**: What testing was done, with what results
3. **Change History**: What changed, who approved it
4. **Monitoring Data**: What happened after deployment

## Design Principles

- **Immutable**: Evidence can't be modified after creation
- **Complete**: All material decisions are captured
- **Retrievable**: You can reconstruct any past state
- **Interpretable**: Non-technical reviewers can understand it

## Practical Implementation

- Embed logging into workflow gates
- Version all artifacts (models, prompts, configs)
- Create evidence packs that bundle related artifacts
- Design for the audit scenario before you need it

## Conclusion

Evidence architecture isn't documentation—it's the proof that your governance actually happened.""",
        "date": "2025-08",
        "link": "https://linkedin.com/in/martin-lepage-ai",
        "tags": ["Audit", "Evidence", "Compliance"],
        "published": True
    }
]

@api_router.get("/publications", response_model=List[Publication])
async def get_publications(tag: Optional[str] = None, published_only: bool = True):
    query = {}
    if published_only:
        query["published"] = {"$ne": False}  # Include docs without published field or with True
    if tag:
        query["tags"] = tag
    
    publications = await db.publications.find(query, {"_id": 0}).sort("date", -1).to_list(100)
    if not publications:
        # Return seed data if empty, optionally filtered
        seed = SEED_PUBLICATIONS
        if tag:
            seed = [p for p in seed if tag in p.get("tags", [])]
        return [Publication(**p) for p in seed]
    return publications

@api_router.get("/publications/{pub_id}")
async def get_publication(pub_id: str):
    publication = await db.publications.find_one({"id": pub_id}, {"_id": 0})
    if not publication:
        # Check seed data
        seed_pub = next((p for p in SEED_PUBLICATIONS if p["id"] == pub_id), None)
        if seed_pub:
            return seed_pub
        raise HTTPException(status_code=404, detail="Publication not found")
    return publication

@api_router.post("/publications", response_model=Publication)
async def create_publication(data: PublicationCreate, request: Request):
    from auth import require_admin
    await require_admin(request)
    
    publication = Publication(
        title=data.title,
        abstract=data.abstract,
        date=data.date,
        link=data.link,
        tags=data.tags
    )
    doc = publication.model_dump()
    doc["content"] = data.content
    doc["published"] = data.published
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.publications.insert_one(doc)
    return publication

@api_router.put("/publications/{pub_id}")
async def update_publication(pub_id: str, data: PublicationUpdate, request: Request):
    from auth import require_admin
    await require_admin(request)
    
    updates = {k: v for k, v in data.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No updates provided")
    
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.publications.update_one(
        {"id": pub_id},
        {"$set": updates}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    return {"status": "updated", "id": pub_id}

@api_router.delete("/publications/{pub_id}")
async def delete_publication(pub_id: str, request: Request):
    from auth import require_admin
    await require_admin(request)
    
    result = await db.publications.delete_one({"id": pub_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    return {"status": "deleted", "id": pub_id}

@api_router.get("/publications/tags/all")
async def get_all_tags():
    """Get all unique tags from publications"""
    publications = await db.publications.find({}, {"tags": 1, "_id": 0}).to_list(1000)
    if not publications:
        # Get from seed data
        all_tags = set()
        for p in SEED_PUBLICATIONS:
            all_tags.update(p.get("tags", []))
        return sorted(list(all_tags))
    
    all_tags = set()
    for pub in publications:
        all_tags.update(pub.get("tags", []))
    return sorted(list(all_tags))

# Case Studies
@api_router.get("/portfolio", response_model=List[CaseStudy])
async def get_portfolio():
    cases = await db.case_studies.find({}, {"_id": 0}).to_list(100)
    if not cases:
        # Return real case studies
        return [
            CaseStudy(
                id="case-1",
                title="LLM Customer Service Agent Governance",
                client_type="Fortune 500 Financial Services",
                challenge="Deploying a customer-facing LLM agent for account inquiries required strict controls. The system would access account balances, transaction history, and could initiate certain actions. Regulatory requirements demanded full auditability of every customer interaction and proof that the agent operated within defined boundaries.",
                approach="Implemented CompassAI framework for agentic governance: defined explicit tool permissions (read-only for account data, no transfer initiation), material-decision gates for any action affecting customer accounts, comprehensive logging with decision reconstruction capability. Used AurorAI to process and validate customer documents submitted during interactions.",
                outcome="Achieved regulatory approval in 60% less time than previous AI initiatives. Zero unauthorized actions in first 8 months. Full audit reconstruction capability demonstrated during compliance review. HITL intervention rate dropped to 3% after initial tuning.",
                tags=["Agentic AI", "Financial Services", "LLM Governance", "CompassAI"]
            ),
            CaseStudy(
                id="case-2",
                title="Clinical Trial Document Processing",
                client_type="Pharmaceutical Research Organization",
                challenge="Processing thousands of clinical trial documents monthly with strict regulatory requirements. Documents included informed consent forms, adverse event reports, and protocol amendments. Each extraction needed evidence trails for FDA inspection readiness.",
                approach="Deployed AurorAI for document ingestion with custom extraction schemas for each document type. Implemented confidence thresholds triggering HITL review for any extraction below 90%. Evidence packs automatically generated for each document, feeding into CompassAI for use case governance and audit bundle preparation.",
                outcome="Processing time reduced from 45 minutes to 8 minutes per document. Field accuracy reached 94% before HITL review. Successfully passed FDA inspection with complete audit trail reconstruction. Evidence packs cited as exemplary documentation practice.",
                tags=["Document Processing", "Healthcare", "FDA Compliance", "AurorAI"]
            ),
            CaseStudy(
                id="case-3",
                title="AI Procurement Governance Framework",
                client_type="Federal Government Agency",
                challenge="Needed governance framework for evaluating and onboarding AI vendors. Existing procurement process lacked AI-specific due diligence, risk assessment criteria, and ongoing monitoring requirements. Multiple vendors were being considered for citizen-facing applications.",
                approach="Created comprehensive procurement governance pack: AI-specific due diligence questionnaire, contract clauses for model transparency and audit rights, risk tiering methodology for vendor AI systems, acceptance criteria matrix, and ongoing monitoring requirements. Integrated with existing CompassAI instance for tracking vendor AI systems as governed use cases.",
                outcome="Reduced vendor evaluation time by 40% with standardized questionnaire. Three vendors rejected early based on inability to meet transparency requirements. Two approved vendors now subject to ongoing governance monitoring. Framework adopted as template for other agencies.",
                tags=["Procurement", "Public Sector", "Vendor Governance", "Risk Tiering"]
            ),
            CaseStudy(
                id="case-4",
                title="Automated Underwriting Decision Governance",
                client_type="Insurance Technology Company",
                challenge="Automated underwriting system making coverage decisions needed governance to satisfy state insurance regulators. System used ML models for risk scoring, and regulators required explainability for any adverse decision and proof that human oversight existed for edge cases.",
                approach="Implemented full governance stack: risk tiering placed system at T3 (critical) due to automated decisions affecting coverage. Deployed material-decision gates requiring human approval for any denial or high-premium recommendation. Evidence architecture captured model inputs, scores, and decision rationale for every application. Incident playbooks created for model drift or unexpected denial rate changes.",
                outcome="Received regulatory approval in 3 states within 6 months. Decision reconstruction demonstrated for 100% of sampled cases during audit. Model drift detection caught scoring shift early, triggering controlled re-evaluation. Consumer complaint rate 40% below industry average.",
                tags=["Insurance", "Automated Decisions", "Regulatory Compliance", "T3 Governance"]
            ),
            CaseStudy(
                id="case-5",
                title="AI Incident Response Protocol Design",
                client_type="E-commerce Platform (Series C)",
                challenge="After an AI recommendation system incident caused reputational damage, the company needed comprehensive incident response protocols. Existing IT incident process didn't account for AI-specific failure modes like model drift, data poisoning, or unexpected emergent behaviors.",
                approach="Designed AI-specific incident response framework: detection triggers for anomalous model behavior, escalation paths with clear authority chains, containment procedures including kill switches and rollback mechanisms, communication templates for stakeholders, and structured post-incident learning process feeding back into governance controls.",
                outcome="Response time to AI incidents reduced by 70%. Successfully contained a recommendation bias issue within 2 hours using new protocols. Post-incident learnings led to three new controls being added to governance framework. Board now receives quarterly AI incident metrics.",
                tags=["Incident Response", "E-commerce", "Risk Management", "Containment"]
            )
        ]
    return cases

# Assessment Tool
@api_router.get("/assessment/questions", response_model=List[AssessmentQuestion])
async def get_assessment_questions():
    return [AssessmentQuestion(**q) for q in ASSESSMENT_QUESTIONS]

@api_router.post("/assessment/submit", response_model=AssessmentResult)
async def submit_assessment(submission: AssessmentSubmission):
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    
    result_id = str(uuid.uuid4())
    
    # Calculate scores
    category_scores = {}
    total_score = 0
    max_score = 0
    
    for q in ASSESSMENT_QUESTIONS:
        qid = str(q["id"])
        if qid in submission.answers:
            answer_idx = submission.answers[qid]
            score = answer_idx * 25  # 0, 25, 50, 75, 100
            category = q["category"]
            if category not in category_scores:
                category_scores[category] = []
            category_scores[category].append(score)
            total_score += score
            max_score += 100
    
    # Average by category
    for cat in category_scores:
        scores = category_scores[cat]
        category_scores[cat] = int(sum(scores) / len(scores)) if scores else 0
    
    overall_score = int((total_score / max_score) * 100) if max_score > 0 else 0
    
    # Generate AI analysis
    try:
        chat = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=f"assessment-{result_id}",
            system_message="""You are an AI governance expert. Analyze assessment results and provide actionable recommendations.
            Be concise but specific. Focus on practical next steps. Use professional consulting language."""
        ).with_model("openai", "gpt-5.2")
        
        analysis_prompt = f"""
        AI Governance Assessment Results:
        Overall Score: {overall_score}/100
        Category Scores: {category_scores}
        
        Questions answered:
        {[{'question': q['question'], 'answer': q['options'][submission.answers.get(str(q['id']), 0)]} for q in ASSESSMENT_QUESTIONS if str(q['id']) in submission.answers]}
        
        Provide:
        1. A 2-3 sentence overall assessment
        2. Top 3 specific, actionable recommendations
        
        Format as JSON: {{"analysis": "...", "recommendations": ["...", "...", "..."]}}
        """
        
        user_message = UserMessage(text=analysis_prompt)
        response = await chat.send_message(user_message)
        
        # Parse response
        import json
        try:
            # Try to extract JSON from response
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            if json_start >= 0 and json_end > json_start:
                parsed = json.loads(response[json_start:json_end])
                analysis = parsed.get("analysis", "Assessment complete.")
                recommendations = parsed.get("recommendations", [])
            else:
                analysis = response
                recommendations = []
        except:
            analysis = response
            recommendations = []
            
    except Exception as e:
        logger.error(f"AI analysis failed: {str(e)}")
        analysis = f"Your governance maturity score is {overall_score}/100. "
        if overall_score < 40:
            analysis += "Significant gaps exist in your AI governance framework. Consider foundational work on system boundaries and risk tiering."
        elif overall_score < 70:
            analysis += "Your governance framework has solid foundations but gaps remain. Focus on formalizing controls and documentation."
        else:
            analysis += "Strong governance foundations in place. Focus on optimization and maintaining audit-grade evidence."
        
        recommendations = [
            "Document system boundaries for all AI deployments",
            "Implement formal risk tiering process",
            "Establish pre-deployment approval gates"
        ]
    
    # Ensure we have recommendations
    if not recommendations:
        recommendations = [
            "Establish clear AI system boundaries and ownership",
            "Implement risk-based controls proportional to impact",
            "Build audit-grade evidence collection into workflows"
        ]
    
    result = AssessmentResult(
        id=result_id,
        overall_score=overall_score,
        category_scores=category_scores,
        recommendations=recommendations[:5],
        analysis=analysis,
        timestamp=datetime.now(timezone.utc).isoformat()
    )
    
    # Save to database
    result_doc = result.model_dump()
    result_doc["submission"] = submission.model_dump()
    await db.assessments.insert_one(result_doc)
    
    return result

# Include the router in the main app
app.include_router(api_router)

# Include Auth router
from auth import router as auth_router
app.include_router(auth_router)

# Include CompassAI router
from compass_ai import router as compass_router
app.include_router(compass_router)

# Include AurorAI router
from aurora_ai import router as aurora_router
app.include_router(aurora_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
