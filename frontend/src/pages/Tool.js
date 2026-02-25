import { useState } from 'react';
import { Link } from 'react-router-dom';

const SECTORS = [
  {
    id: 'regulated',
    title: 'Regulated systems',
    description: 'Higher evidence burden, tighter approvals, audit-grade remediation.'
  },
  {
    id: 'enterprise-saas',
    title: 'Enterprise SaaS',
    description: 'Governance that ships: release cadence, drift, and vendorized AI features.'
  },
  {
    id: 'procurement',
    title: 'Procurement & vendor risk',
    description: 'Questionnaires become controls: diligence artifacts, contract-backed proof.'
  },
  {
    id: 'public-sector',
    title: 'Public sector & due process',
    description: 'Contestability, appeal pathways, reconstruction under scrutiny.'
  },
  {
    id: 'financial',
    title: 'Financial & capital systems',
    description: 'Models move money: exposure controls, stress testing, adverse action logic.'
  },
  {
    id: 'governance-model',
    title: 'Governance operating model',
    description: 'Decision rights, lifecycle gates, evidence trails that scale.'
  }
];

const READINESS_QUESTIONS = [
  {
    id: 'inventory',
    question: 'Do you have a documented inventory of AI use cases and vendors?',
    options: [
      { value: 'none', label: 'No inventory exists', score: 0 },
      { value: 'partial', label: 'Partial or informal list', score: 1 },
      { value: 'complete', label: 'Complete and maintained', score: 2 }
    ]
  },
  {
    id: 'risk-tiering',
    question: 'Is there a risk classification system for AI use cases?',
    options: [
      { value: 'none', label: 'No classification', score: 0 },
      { value: 'informal', label: 'Informal or ad-hoc', score: 1 },
      { value: 'formal', label: 'Formal tiering criteria', score: 2 }
    ]
  },
  {
    id: 'decision-rights',
    question: 'Are decision rights and approvals clearly defined?',
    options: [
      { value: 'none', label: 'Not defined', score: 0 },
      { value: 'partial', label: 'Partially documented', score: 1 },
      { value: 'complete', label: 'Fully documented and followed', score: 2 }
    ]
  },
  {
    id: 'controls',
    question: 'Do you have controls mapped to risk tiers?',
    options: [
      { value: 'none', label: 'No controls documented', score: 0 },
      { value: 'partial', label: 'Some controls exist', score: 1 },
      { value: 'complete', label: 'Controls mapped and tested', score: 2 }
    ]
  },
  {
    id: 'evidence',
    question: 'Is evidence being collected for audit readiness?',
    options: [
      { value: 'none', label: 'No evidence collection', score: 0 },
      { value: 'partial', label: 'Ad-hoc evidence', score: 1 },
      { value: 'complete', label: 'Systematic evidence trail', score: 2 }
    ]
  },
  {
    id: 'vendor-review',
    question: 'Do you have a vendor AI review process?',
    options: [
      { value: 'none', label: 'No vendor review', score: 0 },
      { value: 'partial', label: 'Basic questionnaire', score: 1 },
      { value: 'complete', label: 'Structured review with evidence', score: 2 }
    ]
  },
  {
    id: 'governance-cadence',
    question: 'Is there a recurring governance review cadence?',
    options: [
      { value: 'none', label: 'No regular reviews', score: 0 },
      { value: 'partial', label: 'Occasional reviews', score: 1 },
      { value: 'complete', label: 'Established cadence with owners', score: 2 }
    ]
  },
  {
    id: 'documentation',
    question: 'Is governance documentation current and accessible?',
    options: [
      { value: 'none', label: 'No documentation', score: 0 },
      { value: 'partial', label: 'Outdated or scattered', score: 1 },
      { value: 'complete', label: 'Current and centralized', score: 2 }
    ]
  }
];

const Tool = () => {
  const [step, setStep] = useState(1);
  const [selectedSector, setSelectedSector] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSectorSelect = (sectorId) => {
    setSelectedSector(sectorId);
  };

  const handleAnswer = (questionId, value, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { value, score }
    }));
  };

  const handleNext = () => {
    if (step === 1 && selectedSector) {
      setStep(2);
    } else if (step === 2) {
      setShowResults(true);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
      setShowResults(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSector(null);
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    const totalPossible = READINESS_QUESTIONS.length * 2;
    const actualScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    return {
      score: actualScore,
      total: totalPossible,
      percentage: Math.round((actualScore / totalPossible) * 100)
    };
  };

  const getReadinessLevel = (percentage) => {
    if (percentage >= 75) return { level: 'Strong', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 50) return { level: 'Developing', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 25) return { level: 'Early', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Beginning', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getRecommendations = (percentage) => {
    if (percentage >= 75) {
      return [
        "Your governance foundation is solid. Consider the Oversight Retainer to maintain momentum.",
        "Focus on evidence optimization and audit preparation.",
        "Explore advanced controls for edge cases and emerging risks."
      ];
    }
    if (percentage >= 50) {
      return [
        "Good progress. The Controls and Evidence Pack can fill critical gaps.",
        "Prioritize documenting decision rights and approval flows.",
        "Establish a recurring governance cadence to prevent drift."
      ];
    }
    if (percentage >= 25) {
      return [
        "Start with the Governance Foundation package to establish basics.",
        "Create a use case inventory as your first priority.",
        "Define risk tiering criteria before building controls."
      ];
    }
    return [
      "Begin with basic inventory: what AI systems exist today?",
      "The Governance Foundation package provides a complete starting point.",
      "Focus on quick wins: document what exists before expanding."
    ];
  };

  const allQuestionsAnswered = Object.keys(answers).length === READINESS_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-6 md:px-12" data-testid="tool-page">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="bg-[#1a2744] text-white rounded-t-xl p-6 mb-0">
          <h1 className="font-serif text-3xl font-semibold mb-2">
            AI Governance Readiness Snapshot
          </h1>
          <p className="text-gray-300 text-sm">
            Choose your sector of operation to assess your readiness to audits, regulators, and risk assessment.
          </p>
          <div className="flex gap-4 mt-4 text-xs tracking-wider">
            <span className={step >= 1 ? 'text-white' : 'text-gray-400'}>SECTOR</span>
            <span className="text-gray-400">·</span>
            <span className={step >= 2 ? 'text-white' : 'text-gray-400'}>READINESS</span>
            <span className="text-gray-400">·</span>
            <span className={step >= 3 ? 'text-white' : 'text-gray-400'}>RESULTS</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-xl shadow-sm p-8">
          {/* Step 1: Sector Selection */}
          {step === 1 && (
            <div data-testid="step-1-sector">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#1a2744] font-semibold">1</span>
                <h2 className="font-serif text-2xl font-semibold text-[#1a2744]">Choose your sector</h2>
              </div>
              <p className="text-gray-600 mb-6">
                This tailors language and the expected evidence burden.
              </p>

              <div className="space-y-3">
                {SECTORS.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => handleSectorSelect(sector.id)}
                    data-testid={`sector-${sector.id}`}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedSector === sector.id
                        ? 'border-[#1a2744] bg-[#f8f9fc]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-serif font-semibold text-[#1a2744] mb-1">
                      {sector.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {sector.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Readiness Questions */}
          {step === 2 && (
            <div data-testid="step-2-readiness">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#1a2744] font-semibold">2</span>
                <h2 className="font-serif text-2xl font-semibold text-[#1a2744]">Assess your readiness</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Answer these questions to understand your current governance maturity.
              </p>

              <div className="space-y-6">
                {READINESS_QUESTIONS.map((q, index) => (
                  <div key={q.id} className="border-b border-gray-100 pb-6" data-testid={`question-${q.id}`}>
                    <p className="font-medium text-[#1a2744] mb-3">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                            answers[q.id]?.value === option.value
                              ? 'bg-[#1a2744] text-white'
                              : 'bg-[#f8f9fc] hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={option.value}
                            checked={answers[q.id]?.value === option.value}
                            onChange={() => handleAnswer(q.id, option.value, option.score)}
                            className="sr-only"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && showResults && (
            <div data-testid="step-3-results">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#1a2744] font-semibold">3</span>
                <h2 className="font-serif text-2xl font-semibold text-[#1a2744]">Your Readiness Results</h2>
              </div>

              {(() => {
                const { score, total, percentage } = calculateScore();
                const { level, color, bg } = getReadinessLevel(percentage);
                const recommendations = getRecommendations(percentage);
                const sectorInfo = SECTORS.find(s => s.id === selectedSector);

                return (
                  <>
                    {/* Score Display */}
                    <div className="bg-[#f8f9fc] rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-500 text-sm mb-1">Sector: {sectorInfo?.title}</p>
                          <p className={`text-2xl font-semibold ${color}`}>
                            {level} Readiness
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-[#1a2744]">{percentage}%</p>
                          <p className="text-gray-500 text-sm">{score} / {total} points</p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            percentage >= 75 ? 'bg-green-500' :
                            percentage >= 50 ? 'bg-yellow-500' :
                            percentage >= 25 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-6">
                      <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-4">
                        Recommendations
                      </h3>
                      <ul className="space-y-3">
                        {recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-[#1a2744] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Breakdown */}
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="font-serif text-lg font-semibold text-[#1a2744] mb-4">
                        Question Breakdown
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {READINESS_QUESTIONS.map((q) => {
                          const answer = answers[q.id];
                          return (
                            <div key={q.id} className="flex items-center justify-between p-3 bg-[#f8f9fc] rounded-lg">
                              <span className="text-sm text-gray-600 truncate mr-2" title={q.question}>
                                {q.question.slice(0, 40)}...
                              </span>
                              <span className={`text-sm font-medium px-2 py-1 rounded ${
                                answer?.score === 2 ? 'bg-green-100 text-green-700' :
                                answer?.score === 1 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {answer?.score || 0}/2
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <div className="flex gap-4">
              {step > 1 && (
                <button onClick={handleBack} className="btn-ghost" data-testid="back-btn">
                  Back
                </button>
              )}
              <button onClick={handleReset} className="text-gray-500 hover:text-gray-700" data-testid="reset-btn">
                Reset
              </button>
            </div>
            
            {step < 3 && (
              <button
                onClick={handleNext}
                disabled={(step === 1 && !selectedSector) || (step === 2 && !allQuestionsAnswered)}
                className={`btn-secondary ${
                  ((step === 1 && !selectedSector) || (step === 2 && !allQuestionsAnswered))
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                data-testid="next-btn"
              >
                Next
              </button>
            )}

            {step === 3 && (
              <div className="flex gap-4">
                <Link to="/connect" className="btn-primary" data-testid="book-debrief-btn">
                  Book a 30 minute debrief
                </Link>
                <Link to="/services" className="btn-ghost">
                  View services
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tool;
