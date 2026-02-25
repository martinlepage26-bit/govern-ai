import { useState } from 'react';
import { Lock, FileText, Plus, Download, Upload, Trash2, Save, Package, CheckCircle, FolderOpen, Mail } from 'lucide-react';

const ADMIN_PASSPHRASE = process.env.REACT_APP_ADMIN_PASSPHRASE || 'AIG-ctrl-2026!';
const DOCSORTER_ZIP_URL = "https://customer-assets.emergentagent.com/job_site-resurrection-1/artifacts/j7r3jse5_DocSorter_Local_PreProcessor_Windows.zip";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [currentDraft, setCurrentDraft] = useState({
    title: '',
    date: '',
    type: 'briefing',
    context: 'regulated',
    abstract: '',
    content: ''
  });

  const contexts = [
    { id: 'regulated', label: 'Regulated Systems' },
    { id: 'enterprise-saas', label: 'Enterprise SaaS' },
    { id: 'procurement', label: 'Procurement & Vendor Risk' },
    { id: 'public-sector', label: 'Public Sector & Due Process' },
    { id: 'financial', label: 'Financial & Capital Systems' },
    { id: 'governance-architecture', label: 'Governance Architecture' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (passphrase === ADMIN_PASSPHRASE) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passphrase');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassphrase('');
  };

  const handleSaveDraft = () => {
    if (!currentDraft.title || !currentDraft.date) {
      setError('Title and date are required');
      return;
    }
    const newDraft = {
      ...currentDraft,
      id: `draft-${Date.now()}`
    };
    setDrafts([...drafts, newDraft]);
    setCurrentDraft({
      title: '',
      date: '',
      type: 'briefing',
      context: 'regulated',
      abstract: '',
      content: ''
    });
    setError('');
  };

  const handleDeleteDraft = (id) => {
    setDrafts(drafts.filter(d => d.id !== id));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(drafts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'posts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setDrafts(imported);
        } catch (err) {
          setError('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:martin@martinlepage.com?subject=DocSorter%20Prep%20Tool%20Question';
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 flex items-center justify-center" data-testid="admin-login">
        <div className="card max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#6366f1]" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-[#1a2744]">Private Posting</h1>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Draft and export your papers list as posts.json. Replace assets/data/posts.json with the exported file to publish.
          </p>
          <p className="text-xs text-gray-500 mb-6 p-3 bg-[#f8f9fc] rounded-lg">
            Note: this page is a convenience workflow for a static site. It is not a secure authentication system.
          </p>
          
          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passphrase</label>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none mb-4"
              placeholder="Enter passphrase"
              data-testid="admin-passphrase"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="btn-primary w-full" data-testid="admin-login-btn">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="admin-page">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl font-semibold text-[#1a2744]">Admin Panel</h1>
          <button onClick={handleLogout} className="text-gray-500 hover:text-[#6366f1] text-sm">
            Log out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'posts'
                ? 'bg-[#6366f1] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#6366f1]'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Posts Manager
          </button>
          <button
            onClick={() => setActiveTab('docsorter')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'docsorter'
                ? 'bg-[#6366f1] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#6366f1]'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            DocSorter Tool
          </button>
        </div>

        {activeTab === 'posts' ? (
          <>
            {/* Add/Edit Form */}
            <div className="card mb-8">
              <h2 className="font-serif text-xl font-semibold text-[#1a2744] mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#6366f1]" />
                Add / Edit Paper
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={currentDraft.title}
                    onChange={(e) => setCurrentDraft({...currentDraft, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none"
                    data-testid="admin-title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={currentDraft.date}
                    onChange={(e) => setCurrentDraft({...currentDraft, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none"
                    data-testid="admin-date"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={currentDraft.type}
                    onChange={(e) => setCurrentDraft({...currentDraft, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none"
                  >
                    <option value="briefing">Briefing</option>
                    <option value="paper">Paper</option>
                    <option value="protocol">Protocol</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
                  <select
                    value={currentDraft.context}
                    onChange={(e) => setCurrentDraft({...currentDraft, context: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none"
                  >
                    {contexts.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
                <textarea
                  value={currentDraft.abstract}
                  onChange={(e) => setCurrentDraft({...currentDraft, abstract: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none resize-none"
                  data-testid="admin-abstract"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={currentDraft.content}
                  onChange={(e) => setCurrentDraft({...currentDraft, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#6366f1] focus:outline-none resize-none"
                  data-testid="admin-content"
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button onClick={handleSaveDraft} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save to drafts
              </button>
            </div>

            {/* Drafts List */}
            <div className="card mb-8">
              <h2 className="font-serif text-xl font-semibold text-[#1a2744] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#6366f1]" />
                Current Drafts ({drafts.length})
              </h2>
              
              {drafts.length === 0 ? (
                <p className="text-gray-500 text-sm">No drafts yet. Add a paper above.</p>
              ) : (
                <div className="space-y-2">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="flex items-center justify-between p-3 bg-[#f8f9fc] rounded-lg">
                      <div>
                        <p className="font-medium text-[#1a2744]">{draft.title}</p>
                        <p className="text-xs text-gray-500">{draft.date} · {draft.type} · {draft.context}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export/Import */}
            <div className="card">
              <h2 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">Publish Step</h2>
              <ol className="text-gray-600 text-sm space-y-2 mb-6">
                <li>1. Click <strong>Export posts.json</strong>.</li>
                <li>2. Replace assets/data/posts.json with the exported file.</li>
                <li>3. Upload your updated site to your host (or commit if using Git).</li>
              </ol>
              
              <div className="flex flex-wrap gap-4">
                <button onClick={handleExport} className="btn-primary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export posts.json
                </button>
                <label className="btn-ghost flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Import posts.json
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
              </div>
            </div>
          </>
        ) : (
          /* DocSorter Tab */
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="card bg-gradient-to-br from-[#1a2744] to-[#6366f1] text-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-2">
                    DocSorter Prep Tool
                  </h2>
                  <p className="text-white/90 text-lg mb-4">
                    Automatically remove duplicates and rename your documents before you upload to DocSorter.
                  </p>
                  <p className="text-white/70 text-sm mb-6">
                    Free download · Windows only · Your files stay on your machine
                  </p>
                  <a 
                    href={DOCSORTER_ZIP_URL}
                    download
                    className="inline-flex items-center gap-2 bg-white text-[#1a2744] px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    data-testid="docsorter-download"
                  >
                    <Download className="w-5 h-5" />
                    Download ZIP
                  </a>
                </div>
              </div>
            </div>

            {/* What it does */}
            <div className="card">
              <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">What it does</h3>
              <p className="text-gray-600 mb-4">
                Drop files into a folder on your PC and this tool will:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Detect <strong>exact duplicates</strong> and move them aside safely</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Rename PDFs/DOCX/TIFF</strong> using the document's title (best-effort)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Output a clean, upload-ready folder you can upload manually to DocSorter</span>
                </div>
              </div>
            </div>

            {/* Why use this */}
            <div className="card bg-[#6366f1]/5 border border-[#6366f1]/20">
              <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">Why use this?</h3>
              <p className="text-gray-600">
                DocSorter is great for sorting and organizing, but if your intake process includes re-saves, email attachments, scans, or repeat exports, you can end up with duplicate files and messy filenames. This tool cleans everything <em>before</em> upload so your DocSorter library stays tidy.
              </p>
            </div>

            {/* How it works */}
            <div className="card">
              <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">How it works</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-[#1a2744] mb-3">Setup (one time)</h4>
                  <ol className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs flex-shrink-0">1</span>
                      Download and unzip
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs flex-shrink-0">2</span>
                      Install Python requirements (one command)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs flex-shrink-0">3</span>
                      Double-click <code className="bg-gray-100 px-1 rounded">run_watcher.bat</code>
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-[#1a2744] mb-3">Usage</h4>
                  <ol className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs flex-shrink-0">4</span>
                      Drop files into <strong>INBOX</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs flex-shrink-0">5</span>
                      Upload from <strong>CLEAN</strong> to DocSorter
                    </li>
                  </ol>
                </div>
              </div>

              {/* Folder structure */}
              <div className="mt-6 p-4 bg-[#f8f9fc] rounded-xl">
                <h4 className="font-medium text-[#1a2744] mb-3 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#6366f1]" />
                  Folder Structure
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1a2744]">INBOX</p>
                    <p className="text-gray-500 text-xs">Drop files here</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1a2744]">CLEAN</p>
                    <p className="text-gray-500 text-xs">Renamed, upload-ready</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="font-medium text-[#1a2744]">DUPLICATES</p>
                    <p className="text-gray-500 text-xs">Moved aside safely</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supported files */}
            <div className="card">
              <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">Supported files</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">PDF</span>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">DOCX</span>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">TIFF / TIF</span>
                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">DOC (basic fallback)</span>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                DOC is supported as a basic fallback; renaming may be filename-based unless converted.
              </p>
            </div>

            {/* Important notes */}
            <div className="card border-l-4 border-yellow-500">
              <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">Important notes</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Duplicate detection is <strong>exact</strong> (same file bytes). If the same document is scanned twice or saved differently, it may not match.</li>
                <li>• Title extraction is "best effort" and depends on what's inside the file (scanned documents may need OCR).</li>
                <li>• This tool is <strong>Windows only</strong> (for now).</li>
                <li>• Nothing is deleted by default—duplicates are moved to a separate folder.</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="card">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-1">Ready to clean up your documents?</h3>
                  <p className="text-gray-600 text-sm">Free download, no signup required.</p>
                </div>
                <a 
                  href={DOCSORTER_ZIP_URL}
                  download
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Download ZIP
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="p-4 bg-[#f8f9fc] rounded-xl text-center">
              <p className="text-gray-600 text-sm mb-2">
                Questions or want enhancements (content-based duplicate detection, DOC conversion, OCR for scanned PDFs)?
              </p>
              <button 
                onClick={handleContactClick}
                className="text-[#6366f1] font-medium hover:underline inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact us
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
