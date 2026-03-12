import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SignalStrip from '../components/SignalStrip';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const initialForm = {
  name: '',
  email: '',
  organization: '',
  date: '',
  time: '',
  topic: '',
  context: ''
};

const BOOKING_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];

const CONNECT_COPY = {
  en: {
    eyebrow: 'Connect',
    heroTitle: 'Start with a 30-minute review',
    heroBody: 'Enough to understand the pressure, choose between deterministic governance, a pre-mortem, or a post-mortem, and scope the first deliverables.',
    summary: [
      {
        label: 'Best for',
        title: 'Early review calibration',
        description: 'Use this page when scrutiny is coming or when a questionnaire, audit, or internal review has already exposed a gap.'
      },
      {
        label: 'Bring',
        title: 'System, pressure source, and evidence state',
        description: 'A useful first conversation starts with what is in scope, what triggered the review, and what proof already exists.'
      },
      {
        label: 'Leave with',
        title: 'A scoped next step',
        description: 'The outcome is a clearer route into deterministic governance, a pre-mortem, or a post-mortem.'
      }
    ],
    formTitle: 'Book a review',
    formBody: 'Request a 30-minute review online. Martin will confirm the slot or suggest an adjacent option rather than sending a generic pitch.',
    prepLabel: 'Before you submit',
    prepTitle: 'The fastest way to make the first review useful',
    prepItems: [
      'Name the system, workflow, or use case in question.',
      'Name the pressure source: procurement, audit, vendor review, launch, or incident response.',
      'If evidence, documentation, or a failed review already exists, say that up front.'
    ],
    name: 'Name *',
    namePlaceholder: 'Your full name',
    email: 'Email *',
    emailPlaceholder: 'you@company.com',
    organization: 'Organization',
    organizationPlaceholder: 'Company or institution',
    date: 'Preferred date *',
    datePlaceholder: 'Choose a date',
    time: 'Preferred time *',
    timePlaceholder: 'Select a time',
    noSlotsAvailable: 'No open request slots remain for this date.',
    loadingSlots: 'Loading current availability...',
    topic: 'What brings you here?',
    topicPlaceholder: 'Select a topic',
    context: 'Current state (optional)',
    contextPlaceholder: "Briefly describe your current governance setup, the pressure you're facing, or what triggered this outreach.",
    submit: 'Request this time slot',
    submitting: 'Submitting...',
    submitted: 'Booking request submitted. Confirmation or rescheduling will follow within 24 hours.',
    directContact: 'Direct contact',
    directBody: 'If the online request flow is not the right fit, email directly instead.',
    sendEmail: 'Send an email',
    linkedin: 'Connect on LinkedIn',
    internalModules: 'Internal modules',
    internalBody: 'AurorAI and CompassAI stay behind the PHAROS engagement until their hosting, lineage, and review surfaces are ready to be presented directly.',
    resources: 'Resources',
    startPrompt: 'Not sure where to start?',
    startTitle: 'Run a revisability diagnostic',
    startBody: 'Answer eight questions and get a fast signal on where the workflow should pause before review pressure turns drift into a harder problem.',
    location: 'Montreal, Quebec, Canada',
    subject: 'PHAROS review request',
    generalInquiry: 'General inquiry',
    currentState: 'Current state',
    noContext: 'No additional context provided.',
    topics: [
      { value: 'procurement', label: 'Procurement or customer questionnaire' },
      { value: 'audit', label: 'Audit or evidence readiness' },
      { value: 'deterministic-governance', label: 'Deterministic governance' },
      { value: 'pre-mortem', label: 'Pre-mortem review' },
      { value: 'post-mortem', label: 'Post-mortem review' },
      { value: 'vendor', label: 'Vendor or third-party review' },
      { value: 'other', label: 'Something else' }
    ],
    resourcesList: [
      {
        title: 'Deterministic governance review',
        description: 'A first-pass review of governance strength, risk concentration, and the right next service.'
      },
      {
        title: 'Sample evidence packet',
        description: 'A redacted example of what a governance review packet looks like.'
      }
    ],
    modulesList: [
      {
        title: 'AurorAI',
        description: 'Document intake, extraction, quality gates, and evidence package assembly.'
      },
      {
        title: 'CompassAI',
        description: 'Use-case registry, evidence intake, risk tiering, and governance deliverables.'
      }
    ]
  },
  fr: {
    eyebrow: 'Contact',
    heroTitle: 'Commencez par un échange de 30 minutes',
    heroBody: 'Assez pour comprendre la pression en cause, choisir entre une gouvernance déterministe, une revue pré-mortem ou une revue post-mortem, puis cadrer les premiers livrables.',
    summary: [
      {
        label: 'Pour qui',
        title: 'Le cadrage initial de la revue',
        description: 'Utilisez cette page quand un examen approche ou quand un questionnaire, un audit ou une revue interne a deja revele un ecart.'
      },
      {
        label: 'Apportez',
        title: 'Systeme, source de pression et etat de la preuve',
        description: 'Un premier echange utile commence par ce qui est en portee, ce qui a declenche la revue et quelle preuve existe deja.'
      },
      {
        label: 'Vous repartez avec',
        title: 'Une prochaine etape cadree',
        description: 'Le resultat est un parcours plus net vers une gouvernance deterministe, une revue pre-mortem ou une revue post-mortem.'
      }
    ],
    formTitle: 'Réserver un échange',
    formBody: 'Demandez un échange de 30 minutes en ligne. Martin confirmera le créneau ou proposera une option voisine plutôt qu’un discours générique.',
    prepLabel: 'Avant l’envoi',
    prepTitle: 'La façon la plus rapide de rendre le premier échange utile',
    prepItems: [
      'Nommez le système, le workflow ou le cas d’usage en question.',
      'Nommez la source de pression : approvisionnement, audit, revue fournisseur, lancement ou réponse à incident.',
      'Si de la preuve, de la documentation ou un examen raté existent déjà, dites-le d’emblée.'
    ],
    name: 'Nom *',
    namePlaceholder: 'Votre nom complet',
    email: 'Courriel *',
    emailPlaceholder: 'vous@organisation.ca',
    organization: 'Organisation',
    organizationPlaceholder: 'Entreprise ou institution',
    date: 'Date souhaitée *',
    datePlaceholder: 'Choisir une date',
    time: 'Heure souhaitée *',
    timePlaceholder: 'Sélectionner une heure',
    noSlotsAvailable: 'Aucun créneau de demande ouvert ne reste pour cette date.',
    loadingSlots: 'Chargement de la disponibilité actuelle...',
    topic: 'Quel est votre besoin ?',
    topicPlaceholder: 'Choisir un sujet',
    context: 'Contexte actuel (facultatif)',
    contextPlaceholder: 'Décrivez brièvement votre dispositif actuel de gouvernance, la pression à laquelle vous faites face ou ce qui a déclenché la prise de contact.',
    submit: 'Demander ce créneau',
    submitting: 'Envoi en cours...',
    submitted: 'Demande de réservation envoyée. Une confirmation ou une proposition de replanification suivra dans les 24 heures.',
    directContact: 'Contact direct',
    directBody: 'Si le parcours de réservation en ligne ne convient pas, écrivez directement.',
    sendEmail: 'Envoyer un courriel',
    linkedin: 'Écrire sur LinkedIn',
    internalModules: 'Modules internes',
    internalBody: 'AurorAI et CompassAI demeurent derrière l’engagement PHAROS tant que leur hébergement, leur chaîne de preuve et leurs surfaces de révision ne sont pas prêts à être présentés directement.',
    resources: 'Ressources',
    startPrompt: 'Vous ne savez pas par où commencer ?',
    startTitle: 'Faire un diagnostic de révisabilité',
    startBody: 'Répondez à huit questions et obtenez un signal rapide sur l’endroit où le flux devrait s interrompre avant qu un examen ne transforme la dérive en problème plus lourd.',
    location: 'Montréal, Québec, Canada',
    subject: 'Demande de revue PHAROS',
    generalInquiry: 'Demande générale',
    currentState: 'Contexte actuel',
    noContext: 'Aucun contexte additionnel fourni.',
    topics: [
      { value: 'procurement', label: 'Approvisionnement ou questionnaire client' },
      { value: 'audit', label: 'Audit ou préparation probante' },
      { value: 'deterministic-governance', label: 'Gouvernance déterministe' },
      { value: 'pre-mortem', label: 'Revue pré-mortem' },
      { value: 'post-mortem', label: 'Revue post-mortem' },
      { value: 'vendor', label: 'Revue fournisseur ou tierce partie' },
      { value: 'other', label: 'Autre besoin' }
    ],
    resourcesList: [
      {
        title: 'Revue de gouvernance déterministe',
        description: 'Une première lecture de la solidité de la gouvernance, de la concentration du risque et du bon prochain service.'
      },
      {
        title: 'Exemple de dossier de preuve',
        description: 'Un exemple caviardé de ce à quoi ressemble un dossier de revue de gouvernance.'
      }
    ],
    modulesList: [
      {
        title: 'AurorAI',
        description: 'Accueil documentaire, extraction, portes qualité et assemblage de dossiers de preuve.'
      },
      {
        title: 'CompassAI',
        description: 'Registre des cas d’usage, réception de la preuve, hiérarchisation du risque et livrables de gouvernance.'
      }
    ]
  }
};

const Connect = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(true);

  const copy = useMemo(() => CONNECT_COPY[language], [language]);

  useEffect(() => {
    let cancelled = false;

    const loadBookedSlots = async () => {
      try {
        setSlotsLoading(true);
        const response = await fetch(`${API_URL}/api/bookings/booked-slots`);
        if (!response.ok) {
          throw new Error(`Availability request failed with ${response.status}`);
        }
        const payload = await response.json();
        if (!cancelled) {
          setBookedSlots(Array.isArray(payload) ? payload : []);
        }
      } catch (_error) {
        if (!cancelled) {
          setBookedSlots([]);
        }
      } finally {
        if (!cancelled) {
          setSlotsLoading(false);
        }
      }
    };

    loadBookedSlots();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const selectedDateBookedSlots = bookedSlots
    .filter((slot) => slot.date === form.date)
    .map((slot) => slot.time);

  const availableSlots = BOOKING_SLOTS.filter((slot) => !selectedDateBookedSlots.includes(slot));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    try {
      setSubmitting(true);
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.organization,
          date: form.date,
          time: form.time,
          topic: form.topic || copy.generalInquiry,
          current_state: form.context || copy.noContext
        })
      });

      if (!response.ok) {
        throw new Error(`Booking request failed with ${response.status}`);
      }

      setSubmitted(true);
      setForm((current) => ({
        ...initialForm,
        name: current.name,
        email: current.email,
        organization: current.organization
      }));

      const refreshed = await fetch(`${API_URL}/api/bookings/booked-slots`);
      if (refreshed.ok) {
        const payload = await refreshed.json();
        setBookedSlots(Array.isArray(payload) ? payload : []);
      }
    } catch (_error) {
      setSubmitError(language === 'fr'
        ? "La demande de réservation n’a pas pu être envoyée. Veuillez réessayer ou écrire à pharos@govern-ai.ca."
        : 'Booking request could not be sent. Please try again or email pharos@govern-ai.ca.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="connect-page">
      <div className="page-hero">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.heroTitle}</h1>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              {copy.heroBody}
            </p>
            <SignalStrip items={copy.summary} className="signal-grid-page" />
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="connect-grid">
            <div className="reveal">
              <div className="editorial-panel">
                <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{copy.formTitle}</h2>
                <p className="body-sm" style={{ marginBottom: '32px' }}>{copy.formBody}</p>
                <div className="scope-note" style={{ marginBottom: '28px' }}>
                  <p className="eyebrow" style={{ marginBottom: '12px' }}>{copy.prepLabel}</p>
                  <strong>{copy.prepTitle}</strong>
                  <ul className="panel-list">
                    {copy.prepItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="name">{copy.name}</label>
                    <input id="name" name="name" type="text" placeholder={copy.namePlaceholder} value={form.name} onChange={handleChange} required />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">{copy.email}</label>
                    <input id="email" name="email" type="email" placeholder={copy.emailPlaceholder} value={form.email} onChange={handleChange} required />
                  </div>

                  <div className="form-field">
                    <label htmlFor="organization">{copy.organization}</label>
                    <input id="organization" name="organization" type="text" placeholder={copy.organizationPlaceholder} value={form.organization} onChange={handleChange} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="date">{copy.date}</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="time">{copy.time}</label>
                    <select id="time" name="time" value={form.time} onChange={handleChange} required disabled={!form.date}>
                      <option value="">{copy.timePlaceholder}</option>
                      {availableSlots.map((item) => (
                        <option key={item} value={item}>{item} ET</option>
                      ))}
                    </select>
                    {slotsLoading ? (
                      <p className="body-sm" style={{ marginTop: '8px' }}>{copy.loadingSlots}</p>
                    ) : form.date && availableSlots.length === 0 ? (
                      <p className="body-sm" style={{ marginTop: '8px' }}>{copy.noSlotsAvailable}</p>
                    ) : null}
                  </div>

                  <div className="form-field">
                    <label htmlFor="topic">{copy.topic}</label>
                    <select id="topic" name="topic" value={form.topic} onChange={handleChange}>
                      <option value="">{copy.topicPlaceholder}</option>
                      {copy.topics.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="context">{copy.context}</label>
                    <textarea
                      id="context"
                      name="context"
                      placeholder={copy.contextPlaceholder}
                      value={form.context}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-dark"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={submitting || !form.date || !form.time}
                  >
                    {submitting ? copy.submitting : copy.submit}
                    <ArrowRight />
                  </button>
                </form>

                {submitError ? (
                  <p className="body-sm" style={{ marginTop: '20px', color: '#b42318' }}>
                    {submitError}
                  </p>
                ) : null}

                {submitted ? (
                  <p className="body-sm" style={{ marginTop: '20px' }}>{copy.submitted}</p>
                ) : null}
              </div>
            </div>

            <div>
              <div className="reveal editorial-panel-dark" style={{ color: '#F5F5F0', marginBottom: '24px' }}>
                <p className="eyebrow" style={{ marginBottom: '12px', color: 'var(--glow-primary)' }}>{copy.directContact}</p>
                <p className="body-sm" style={{ color: 'rgba(245,245,240,0.78)', marginBottom: '16px' }}>
                  {copy.directBody}
                </p>
                <p style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '4px' }}>
                  <a href="mailto:pharos@govern-ai.ca">pharos@govern-ai.ca</a>
                </p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(245,245,240,0.78)', marginBottom: '20px' }}>{copy.location}</p>
                <a href="mailto:pharos@govern-ai.ca" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {copy.sendEmail}
                </a>
                <a href="https://www.linkedin.com/in/martin-lepage-ai/" target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: '12px', fontSize: '0.875rem', color: 'rgba(245,245,240,0.82)' }}>
                  {copy.linkedin} →
                </a>
              </div>

              <div className="reveal editorial-panel">
                <p className="eyebrow" style={{ marginBottom: '16px' }}>{copy.internalModules}</p>
                <p className="body-sm" style={{ marginBottom: '18px' }}>
                  {copy.internalBody}
                </p>
                <div className="plain-stack" style={{ marginBottom: '24px' }}>
                  {copy.modulesList.map((item) => (
                    <div
                      key={item.title}
                      className="plain-stack-item"
                    >
                      <p style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-text)', marginBottom: '6px' }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="eyebrow" style={{ marginBottom: '16px' }}>{copy.resources}</p>
                <div className="plain-stack">
                  {copy.resourcesList.map((item) => (
                    <div key={item.title} className="plain-stack-item">
                      <p style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--color-text)', marginBottom: '4px' }}>{item.title}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/tool" className="reveal link-slab">
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-light)', marginBottom: '8px' }}>
                  {copy.startPrompt}
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-text)' }}>{copy.startTitle}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginTop: '8px' }}>
                  {copy.startBody}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;
