import { useState } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { Building2, Clock, ChevronRight, Quote, CheckCircle, FileText, X } from 'lucide-react';

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const sectors = [...new Set(caseStudies.map(c => c.sector))];

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="cases-page">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a2744] mb-4">
          Case Studies
        </h1>
        <p className="text-gray-600 mb-2 max-w-2xl">
          Selected engagements illustrating governance challenges and solutions across sectors. 
          Details anonymized to protect client confidentiality.
        </p>
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-12">
          FINANCIAL SERVICES · HEALTHCARE · ENTERPRISE · PUBLIC SECTOR
        </p>

        {/* Sector Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sectors.map((sector, i) => (
            <span 
              key={i}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600"
            >
              {sector}
            </span>
          ))}
        </div>

        {/* Case Cards */}
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setSelectedCase(study)}
              className="w-full text-left card card-hover group"
              data-testid={`case-${study.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-[#6366f1] uppercase tracking-wide">
                      {study.sector}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {study.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-2 group-hover:text-[#6366f1] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4" />
                    {study.client}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {study.challenge}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#1a2744] to-[#6366f1] rounded-2xl text-white">
          <h3 className="font-serif text-xl font-semibold mb-2">Facing a similar challenge?</h3>
          <p className="text-white/80 mb-4">
            Book a debrief to discuss how these approaches might apply to your organization.
          </p>
          <Link to="/connect" className="inline-block bg-white text-[#1a2744] px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Book a Debrief
          </Link>
        </div>
      </div>

      {/* Case Detail Drawer */}
      {selectedCase && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-[4000]" 
            onClick={() => setSelectedCase(null)}
          />
          <div className="fixed top-0 right-0 h-screen w-full md:w-[640px] bg-white border-l border-gray-200 shadow-2xl z-[4500] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100 bg-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-[#6366f1] uppercase tracking-wide">
                    {selectedCase.sector}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-500">{selectedCase.duration}</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#1a2744]">
                  {selectedCase.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{selectedCase.client}</p>
              </div>
              <button 
                onClick={() => setSelectedCase(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {/* Challenge */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1a2744] mb-2">Challenge</h3>
                <p className="text-gray-600">{selectedCase.challenge}</p>
              </div>

              {/* Approach */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1a2744] mb-3">Approach</h3>
                <ul className="space-y-2">
                  {selectedCase.approach.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#6366f1] text-xs font-bold">{i + 1}</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1a2744] mb-3">Outcomes</h3>
                <ul className="space-y-2">
                  {selectedCase.outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              {selectedCase.quote && (
                <div className="mb-6 p-4 bg-[#6366f1]/5 rounded-xl border-l-4 border-[#6366f1]">
                  <Quote className="w-5 h-5 text-[#6366f1] mb-2" />
                  <p className="text-gray-700 italic">"{selectedCase.quote}"</p>
                </div>
              )}

              {/* Deliverables */}
              <div>
                <h3 className="font-semibold text-[#1a2744] mb-3">Deliverables</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.deliverables.map((item, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-[#f8f9fc] border border-gray-200 rounded-full text-sm text-gray-600 flex items-center gap-2"
                    >
                      <FileText className="w-3 h-3 text-[#6366f1]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <Link 
                to="/connect" 
                className="btn-primary w-full text-center block"
                onClick={() => setSelectedCase(null)}
              >
                Discuss a Similar Challenge
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cases;
