import { useEffect, useRef, useState } from 'react';
import { ArrowRight, FileUp, Gauge, LoaderCircle, RefreshCw, Save, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignalStrip from '../components/SignalStrip';
import { formatDateTime, requestModuleJson } from '../lib/modulePortalApi';
import '../lotus.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const SECTION_CONFIG = [
  ['agency', 'Agency', 'Who can act, what choices exist, and where leverage sits.'],
  ['strategic', 'Strategy', 'Mission, roadmap, direction, priorities, and long-range logic.'],
  ['governance', 'Governance', 'Policy, oversight, procurement, standards, compliance, and risk.'],
  ['operational', 'Operations', 'Delivery, workflow, implementation, teams, and execution.'],
  ['creative', 'Creative', 'Aesthetic, narrative, design, music, film, image, and language.'],
  ['meaning', 'Meaning', 'Identity, ethics, memory, symbolic meaning, and development.']
];

const makeDraft = () => ({
  title: '',
  author: '',
  date: new Date().toISOString().slice(0, 10),
  tags: 'agency, lotus',
  context: '',
  source: '',
  summary: '',
  sections: Object.fromEntries(SECTION_CONFIG.map(([key]) => [key, '']))
});

const toPayload = (draft) => ({
  title: draft.title.trim(),
  author: draft.author.trim(),
  date: draft.date.trim(),
  tags: draft.tags.replaceAll(';', ',').split(',').map((tag) => tag.trim()).filter(Boolean),
  context: draft.context.trim(),
  source: draft.source.trim(),
  summary: draft.summary,
  sections: draft.sections
});

export default function PortalLotus() {
  const uploadInputRef = useRef(null);
  const [view, setView] = useState('library');
  const [notes, setNotes] = useState([]);
  const [selectedPath, setSelectedPath] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [draft, setDraft] = useState(makeDraft);
  const [preview, setPreview] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [busyAction, setBusyAction] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const manualCount = notes.filter((note) => note.path.includes('manual_entries')).length;
  const feedCount = notes.filter((note) => note.path.includes('dr_sort_feed')).length;
  const matchedGroups = preview
    ? SECTION_CONFIG.map(([key, label]) => ({ key, label, terms: preview.scores?.matched_terms?.[key] || [] })).filter((group) => group.terms.length)
    : [];

  const heroSignals = [
    {
      label: 'Workspace',
      title: `${notes.length} note${notes.length === 1 ? '' : 's'} in the ledger`,
      description: 'The browser reads the same LOTUS library the desktop suite writes to.'
    },
    {
      label: 'Studio',
      title: 'Preview and save now run online',
      description: 'The web page calls the existing Python scoring core instead of reimplementing it.'
    },
    {
      label: 'Scope',
      title: 'Markdown and text upload first',
      description: 'This MVP keeps the contract honest while making the scoring studio accessible online.'
    }
  ];

  const clearStatus = () => {
    setError('');
    setMessage('');
  };

  const loadNotes = async (preferredPath = '') => {
    setLoading(true);
    setError('');
    try {
      const payload = await requestModuleJson({ baseUrl: API_URL, path: '/api/lotus/notes' });
      const nextNotes = Array.isArray(payload) ? payload : [];
      setNotes(nextNotes);
      setSelectedPath((current) => {
        const candidate = preferredPath || current;
        if (candidate && nextNotes.some((note) => note.path === candidate)) return candidate;
        return nextNotes[0]?.path || '';
      });
    } catch (loadError) {
      setNotes([]);
      setSelectedPath('');
      setError(loadError.message || 'Could not load LOTUS notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (!selectedPath) {
      setSelectedNote(null);
      return;
    }
    let cancelled = false;
    const loadDetail = async () => {
      setDetailLoading(true);
      try {
        const payload = await requestModuleJson({
          baseUrl: API_URL,
          path: `/api/lotus/notes/detail?path=${encodeURIComponent(selectedPath)}`
        });
        if (!cancelled) setSelectedNote(payload);
      } catch (detailError) {
        if (!cancelled) {
          setSelectedNote(null);
          setError(detailError.message || 'Could not load the selected LOTUS note.');
        }
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    };
    loadDetail();
    return () => {
      cancelled = true;
    };
  }, [selectedPath]);

  const refreshWorkspace = async () => {
    clearStatus();
    await loadNotes();
    setMessage('LOTUS workspace refreshed.');
  };

  const updateField = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const updateSection = (key, value) => setDraft((current) => ({ ...current, sections: { ...current.sections, [key]: value } }));

  const previewDraft = async () => {
    clearStatus();
    setBusyAction('preview');
    try {
      const payload = await requestModuleJson({
        baseUrl: API_URL,
        path: '/api/lotus/score',
        method: 'POST',
        body: toPayload(draft)
      });
      setPreview(payload);
      setMessage('Projected LOTUS scores updated.');
    } catch (previewError) {
      setError(previewError.message || 'LOTUS preview failed.');
    } finally {
      setBusyAction('');
    }
  };

  const saveDraft = async () => {
    clearStatus();
    setBusyAction('save');
    try {
      const payload = await requestModuleJson({
        baseUrl: API_URL,
        path: '/api/lotus/drafts',
        method: 'POST',
        body: toPayload(draft)
      });
      setPreview(payload);
      await loadNotes(payload.path);
      setView('library');
      setMessage(`Saved structured LOTUS note to ${payload.path}.`);
    } catch (saveError) {
      setError(saveError.message || 'Saving the LOTUS draft failed.');
    } finally {
      setBusyAction('');
    }
  };

  const uploadNotes = async (event) => {
    event.preventDefault();
    clearStatus();
    if (!uploadFiles.length) {
      setError('Choose at least one markdown or text note before upload.');
      return;
    }
    setBusyAction('upload');
    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => formData.append('files', file));
      const payload = await requestModuleJson({
        baseUrl: API_URL,
        path: '/api/lotus/upload',
        method: 'POST',
        formData
      });
      if (uploadInputRef.current) uploadInputRef.current.value = '';
      setUploadFiles([]);
      await loadNotes(payload.imported?.[0] || '');
      setMessage(`Imported ${payload.imported?.length || 0} LOTUS note(s).`);
    } catch (uploadError) {
      setError(uploadError.message || 'LOTUS upload failed.');
    } finally {
      setBusyAction('');
    }
  };

  const clearDraft = () => {
    setDraft(makeDraft());
    setPreview(null);
    clearStatus();
    setMessage('LOTUS scoring form cleared.');
  };

  return (
    <div data-testid="portal-lotus-page">
      <div className="page-hero">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Govern-ai module</p>
            <h1>LOTUS</h1>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Editorial scoring workspace for agency, strategy, governance, operations, creative language, and meaning, now available in the browser.
            </p>
          </div>
          <SignalStrip items={heroSignals} className="signal-grid-page signal-grid-light" />
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container lotus-stack">
          {(message || error) ? <div className={`lotus-status lotus-status-${error ? 'error' : 'success'}`}>{error || message}</div> : null}

          <div className="lotus-metric-grid">
            <div className="lotus-metric-card"><Gauge /><span>Ledger</span><strong>{notes.length}</strong><small>Total notes</small></div>
            <div className="lotus-metric-card"><Sparkles /><span>Manual entries</span><strong>{manualCount}</strong><small>Saved from the studio</small></div>
            <div className="lotus-metric-card"><ArrowRight /><span>Dr. Sort feed</span><strong>{feedCount}</strong><small>Sorter summaries in LOTUS</small></div>
            <div className="lotus-metric-card"><RefreshCw /><span>Live mode</span><strong>{loading || detailLoading || busyAction ? 'Busy' : 'Ready'}</strong><small>Browser shell over Python core</small></div>
          </div>

          <div className="editorial-panel lotus-toolbar">
            <div className="lotus-tabs">
              <button type="button" className={`lotus-tab${view === 'library' ? ' is-active' : ''}`} onClick={() => setView('library')}>Library Ledger</button>
              <button type="button" className={`lotus-tab${view === 'studio' ? ' is-active' : ''}`} onClick={() => setView('studio')}>Scoring Studio</button>
            </div>
            <div className="lotus-actions">
              <button type="button" className="btn-secondary" onClick={refreshWorkspace} disabled={loading}><RefreshCw size={16} />Refresh</button>
              <button type="button" className="btn-dark" onClick={() => setView(view === 'library' ? 'studio' : 'library')}>{view === 'library' ? 'Open studio' : 'Back to ledger'}</button>
            </div>
          </div>

          {loading ? (
            <div className="editorial-panel lotus-empty"><LoaderCircle className="portal-spin" /><p>Loading LOTUS workspace...</p></div>
          ) : view === 'library' ? (
            <div className="lotus-grid">
              <div className="editorial-panel lotus-card">
                <div className="lotus-head"><div><p className="eyebrow">Library ledger</p><h2>Browse the live LOTUS library</h2></div><p className="body-sm">Upload `.md` or `.txt` notes into the same LOTUS folder the desktop suite uses, then open any note to inspect its preview and scores.</p></div>
                <form className="lotus-upload" onSubmit={uploadNotes}>
                  <input ref={uploadInputRef} type="file" multiple accept=".md,.txt,text/markdown,text/plain" className="lotus-input lotus-file" onChange={(event) => setUploadFiles(Array.from(event.target.files || []))} />
                  <div className="lotus-actions"><button type="submit" className="btn-dark" disabled={busyAction === 'upload'}>{busyAction === 'upload' ? <LoaderCircle className="portal-spin" size={16} /> : <FileUp size={16} />}Upload notes</button><span className="lotus-helper">{uploadFiles.length ? `${uploadFiles.length} file(s) selected` : 'Choose one or more markdown or text notes.'}</span></div>
                </form>
                <div className="lotus-note-list">
                  {!notes.length ? <div className="lotus-empty lotus-empty-inline"><p>No LOTUS notes are indexed yet.</p></div> : notes.map((note) => (
                    <button key={note.path} type="button" className={`scope-note lotus-note-card${selectedPath === note.path ? ' is-active' : ''}`} onClick={() => setSelectedPath(note.path)}>
                      <div className="lotus-note-top"><strong>{note.title}</strong><span className="lotus-pill">Agency {note.agency_score}</span></div>
                      <p className="lotus-note-path">{note.path}</p>
                      <div className="lotus-score-strip"><span>Creative {note.creative_score}</span><span>Strategic {note.strategic_score}</span><span>Governance {note.governance_score}</span></div>
                      <div className="lotus-note-meta"><span>{formatDateTime(note.modified_iso)}</span><span>{note.signals?.length ? note.signals.join(', ') : 'No signals yet'}</span></div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="editorial-panel lotus-card">
                <div className="lotus-head"><div><p className="eyebrow">Reading preview</p><h2>Inspect the selected note</h2></div><p className="body-sm">The browser detail view reads the same note text LOTUS scores today.</p></div>
                {detailLoading ? <div className="lotus-empty lotus-empty-inline"><LoaderCircle className="portal-spin" /><p>Loading selected note...</p></div> : selectedNote ? (
                  <div className="lotus-preview-stack">
                    <div className="lotus-score-strip"><span>Agency {selectedNote.agency_score}</span><span>Creative {selectedNote.creative_score}</span><span>Strategic {selectedNote.strategic_score}</span><span>Governance {selectedNote.governance_score}</span><span>Meaning {selectedNote.meaning_score}</span></div>
                    <p className="lotus-note-path">{selectedNote.path}</p>
                    <pre className="lotus-preview">{selectedNote.text}</pre>
                  </div>
                ) : <div className="lotus-empty lotus-empty-inline"><p>Select a LOTUS note to read it here.</p></div>}
              </div>
            </div>
          ) : (
            <div className="lotus-grid lotus-grid-studio">
              <div className="editorial-panel lotus-card">
                <div className="lotus-head"><div><p className="eyebrow">Scoring studio</p><h2>Draft and save a structured LOTUS note</h2></div><p className="body-sm">This browser form mirrors the desktop studio: metadata first, then the six scoring lenses.</p></div>
                <div className="lotus-form-grid">
                  {['title', 'author', 'date', 'tags', 'context', 'source'].map((field) => (
                    <label key={field} className="lotus-field">
                      <span>{field === 'author' ? 'Author / owner' : field === 'context' ? 'Context / theme' : field === 'source' ? 'Source / origin' : field}</span>
                      <input type={field === 'date' ? 'date' : 'text'} className="lotus-input" value={draft[field]} onChange={(event) => updateField(field, event.target.value)} />
                    </label>
                  ))}
                </div>
                <label className="lotus-field"><span>Summary</span><textarea className="lotus-input lotus-textarea lotus-summary" value={draft.summary} onChange={(event) => updateField('summary', event.target.value)} /></label>
                <div className="lotus-section-grid">
                  {SECTION_CONFIG.map(([key, label, help]) => (
                    <label key={key} className="lotus-section-card"><span>{label}</span><small>{help}</small><textarea className="lotus-input lotus-textarea" value={draft.sections[key]} onChange={(event) => updateSection(key, event.target.value)} /></label>
                  ))}
                </div>
                <div className="lotus-actions lotus-actions-wrap">
                  <button type="button" className="btn-secondary" onClick={clearDraft}>Clear form</button>
                  <button type="button" className="btn-dark" onClick={previewDraft} disabled={busyAction === 'preview' || busyAction === 'save'}>{busyAction === 'preview' ? <LoaderCircle className="portal-spin" size={16} /> : <Sparkles size={16} />}Preview</button>
                  <button type="button" className="btn-primary" onClick={saveDraft} disabled={busyAction === 'save' || busyAction === 'preview'}>{busyAction === 'save' ? <LoaderCircle className="portal-spin" size={16} /> : <Save size={16} />}Save to LOTUS</button>
                </div>
              </div>

              <div className="editorial-panel lotus-card">
                <div className="lotus-head"><div><p className="eyebrow">Projected scoring</p><h2>Read the draft before saving it</h2></div><p className="body-sm">Preview uses the same Python scoring function as the desktop LOTUS app.</p></div>
                {!preview ? <div className="lotus-empty lotus-empty-inline"><p>Draft preview will appear here after you run a LOTUS preview.</p></div> : (
                  <div className="lotus-preview-stack">
                    <div className="lotus-score-strip"><span>Agency {preview.scores.agency_score}</span><span>Creative {preview.scores.creative_score}</span><span>Strategic {preview.scores.strategic_score}</span><span>Governance {preview.scores.governance_score}</span><span>Operations {preview.scores.operational_score}</span><span>Meaning {preview.scores.meaning_score}</span></div>
                    <div className="lotus-score-strip">{preview.scores.signals?.length ? preview.scores.signals.map((signal) => <span key={signal}>{signal}</span>) : <span>No signals detected yet.</span>}</div>
                    {matchedGroups.length ? <div className="lotus-match-grid">{matchedGroups.map((group) => <div key={group.key} className="scope-note"><strong>{group.label}</strong><div className="lotus-score-strip">{group.terms.map((term) => <span key={term}>{term}</span>)}</div></div>)}</div> : null}
                    <pre className="lotus-preview">{preview.markdown}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="editorial-panel-dark lotus-footer-card">
            <p className="body-sm">LOTUS now lives beside the other govern-ai portals, with local file storage preserved for the first web version.</p>
            <div className="lotus-actions lotus-actions-wrap">
              <Link to="/portal/compassai" className="btn-primary">Open CompassAI<ArrowRight size={16} /></Link>
              <Link to="/portal/aurorai" className="btn-secondary">Open AurorAI</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
