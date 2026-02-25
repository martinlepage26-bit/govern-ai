# Martin Lepage, PhD — AI Governance Website

## Original Problem Statement
Rebuild a professional AI Governance consulting website from provided images. Multi-page, feature-rich application for "Martin Lepage, PhD" AI Governance consulting practice.

## Architecture
- **Frontend**: React.js, React Router, plain CSS with Tailwind utility classes
- **Backend**: Minimal FastAPI (health endpoint only)
- **Database**: MongoDB configured but unused (static content site)
- **Content**: Static JSON files in `frontend/src/data/`
- **i18n**: Custom LanguageContext with `translations/en.js` and `translations/fr.js`

## Core Requirements
- 13-page professional consulting website
- Bilingual EN/FR with toggle in header
- Readiness Snapshot assessment tool
- Case studies, research papers, portfolio
- Lead magnet (Governance Starter Kit)
- Simple booking/contact forms (mailto-based)
- Hidden admin page for content drafts

## What's Implemented

### Pages
1. Home — Hero, capabilities, starter kit CTA, navigation cards
2. Services — Core offers, pricing factors
3. Service Menu — 3 packages with deliverables
4. Tool (Readiness Snapshot) — Sector selection, 8 questions, results drawer
5. FAQ — 8 Q&A pairs with CTAs
6. Research — 7 briefings with reader drawer, context filters
7. Cases — 5 case studies with detail drawer
8. About — Practice description, bio, headshot, featured research
9. Connect — Message form + booking form (both tabs)
10. Sealed Card Protocol — Research protocol page
11. Portfolio — Publications, working papers, engagement areas, expertise
12. Library — Curated governance resources with external links
13. Admin — Post manager + DocSorter tool (hidden, password-protected)

### Features
- **Bilingual (EN/FR)**: Full French translation for all pages except Portfolio (stays English per user request). Language toggle in navbar header. Preference saved to localStorage with browser language auto-detection.
- **Readiness Snapshot**: Interactive assessment with 6 sectors, 8 questions, scored results
- **Lead Magnet**: Governance Starter Kit email capture
- **Content**: 7 research papers, 5 case studies, curated library links
- **Deployment Ready**: Health endpoints, env-based config

### Completed Tasks (with dates)
- **Session 1**: Full 13-page site built from images
- **Session 2**: Content population, bug fixes, deployment readiness
- **Feb 2026**: French language support implemented and tested (100% pass rate)

## Prioritized Backlog

### P1
- Enhance Admin page for managing Portfolio publications without developer help

### P2
- Replace mailto booking form with calendar integration
- Update admin passphrase for production

## Credentials
- Admin passphrase: See `frontend/.env` → `REACT_APP_ADMIN_PASSPHRASE`

## Mocked Functionality
- Booking system: mailto links (no calendar integration)
- Admin page: Frontend-only, no backend persistence
- Contact form: mailto links
