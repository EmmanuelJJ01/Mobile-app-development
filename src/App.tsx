/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Info, 
  ArrowLeft, 
  ChevronRight, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck,
  Search,
  User,
  ExternalLink,
  MessageSquare,
  Lightbulb,
  Shield,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Constants ---

type Screen = 
  | 'welcome' 
  | 'home' 
  | 'skills-summary' 
  | 'skill-detail' 
  | 'cohort-insights' 
  | 'applicants' 
  | 'applicant-insight' 
  | 'info';

interface Skill {
  id: string;
  name: string;
  insight: string;
  icon: React.ReactNode;
  level: number; // 0-100 for progress bar
}

const SKILLS: Skill[] = [
  { id: 'comm', name: 'Communication', insight: 'Strong across many applicants', icon: <MessageSquare className="w-5 h-5" />, level: 75 },
  { id: 'prob', name: 'Problem Solving', insight: 'Consistent demonstration in challenges', icon: <Lightbulb className="w-5 h-5" />, level: 60 },
  { id: 'team', name: 'Teamwork', insight: 'High collaborative markers identified', icon: <Users className="w-5 h-5" />, level: 85 },
  { id: 'tech', name: 'Technical Skills', insight: 'Foundational knowledge confirmed', icon: <Zap className="w-5 h-5" />, level: 50 },
];

interface Applicant {
  id: string;
  skills: string[]; // ids of skills
}

const APPLICANTS: Applicant[] = [
  { id: 'CAND-8821', skills: ['comm', 'team'] },
  { id: 'CAND-4412', skills: ['prob', 'tech'] },
  { id: 'CAND-9033', skills: ['comm', 'prob', 'team'] },
  { id: 'CAND-1284', skills: ['tech', 'team'] },
  { id: 'CAND-5567', skills: ['comm', 'tech'] },
];

// --- Sub-components ---

const BottomNav = ({ current, setScreen }: { current: Screen, setScreen: (s: Screen) => void }) => {
  const tabs = [
    { id: 'home', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5 border-2 border-black p-0.5 bg-white" /> },
    { id: 'skills-summary', label: 'Skills', icon: <Target className="w-5 h-5 border-2 border-black p-0.5 bg-white" /> },
    { id: 'cohort-insights', label: 'Cohorts', icon: <BarChart3 className="w-5 h-5 border-2 border-black p-0.5 bg-white" /> },
    { id: 'info', label: 'Info', icon: <Info className="w-5 h-5 border-2 border-black p-0.5 bg-white" /> },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] frosted-nav px-4 flex justify-around items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`nav-${tab.id}`}
          onClick={() => setScreen(tab.id as Screen)}
          className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${
            (current === tab.id || (tab.id === 'home' && current === 'welcome') || (tab.id === 'skills-summary' && current === 'skill-detail') || (tab.id === 'home' && current === 'applicants') || (tab.id === 'home' && current === 'applicant-insight')) 
              ? 'text-black' 
              : 'text-gray-400'
          }`}
        >
          {tab.icon}
          <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const Header = ({ title, showBack, onBack, rightElement }: { title: string, showBack?: boolean, onBack?: () => void, rightElement?: React.ReactNode }) => (
  <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-40">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} id="header-back-btn" className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className="text-sm font-bold uppercase tracking-widest text-gray-800">{title}</h1>
    </div>
    {rightElement || <User className="w-5 h-5 text-gray-400" />}
  </header>
);

// --- Screen Components ---

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="h-full bg-white flex flex-col items-center justify-center p-8 text-center"
  >
    <div className="mb-12 p-6 bg-black rounded-xl inline-block shadow-lg">
      <Briefcase className="w-16 h-16 text-white mx-auto" />
    </div>
    
    <h1 className="text-2xl font-bold mb-4">Graduate Skills Insight</h1>
    
    <div className="space-y-4 mb-12">
      <p className="text-sm text-gray-600 font-medium leading-relaxed px-4">Understand applicant skills at scale. No automated decisions.</p>
    </div>

    <div className="flex flex-col w-full gap-4">
      <button 
        id="btn-login"
        onClick={onNext}
        className="btn-primary w-full"
      >
        Log In
      </button>
      <button 
        id="btn-demo"
        onClick={onNext}
        className="btn-outline w-full"
      >
        View Demo
      </button>
    </div>
    
    <p className="mt-8 text-[10px] text-gray-400 border-t border-gray-100 pt-4 w-full uppercase tracking-widest">Version 1.0.4 • Secure</p>
  </motion.div>
);

const HomeScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const cards = [
    { id: 'total', title: 'Applicants', val: '1,240', sub: 'Applications', icon: <Users /> },
    { id: 'assessed', title: 'Skills', val: '12', sub: 'Markers', icon: <Target /> },
    { id: 'strong', title: 'Teamwork', val: 'Strength', sub: 'Cohort Rank', icon: <TrendingUp /> },
    { id: 'gaps', title: 'Technical', val: 'Gap Area', sub: 'Training Opt', icon: <Search /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="h-[calc(100%-72px)] overflow-y-auto w-full pb-8"
    >
      <Header title="2026 Intake" />
      <div className="p-4 grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <button 
            key={card.id}
            id={`home-card-${card.id}`}
            onClick={() => setScreen('skills-summary')}
            className="frosted-card flex flex-col text-left !mb-0 hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 border-2 border-black bg-white mb-3 flex items-center justify-center p-1">
              {React.cloneElement(card.icon as React.ReactElement, { className: 'w-full h-full' })}
            </div>
            <h3 className="text-lg font-bold mb-0.5 leading-tight">{card.val}</h3>
            <p className="text-[10px] uppercase font-bold text-gray-400">{card.title}</p>
          </button>
        ))}
      </div>
      <div className="px-4">
        <div className="frosted-card text-[11px] leading-relaxed text-gray-600">
          <p><strong>Note:</strong> These metrics aggregate cohort performance across gamified challenges. They do not rank individuals.</p>
        </div>
        
        <button 
          id="btn-view-applicants"
          onClick={() => setScreen('applicants')}
          className="btn-outline w-full text-xs py-3 mt-4"
        >
          Explore All Applicants
        </button>
      </div>
    </motion.div>
  );
};

const SkillsSummaryScreen = ({ setScreen, setSelectedSkill }: { setScreen: (s: Screen) => void, setSelectedSkill: (s: Skill) => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="h-[calc(100%-72px)] overflow-y-auto w-full pb-8"
  >
    <Header title="Skills Summary" />
    <div className="p-4">
      {SKILLS.map((skill) => (
        <button 
          key={skill.id}
          id={`skill-card-${skill.id}`}
          onClick={() => {
            setSelectedSkill(skill);
            setScreen('skill-detail');
          }}
          className="frosted-card w-full text-left"
        >
          <div className="flex justify-between items-center mb-2">
            <strong className="text-sm font-bold">{skill.name}</strong>
            <ChevronRight className="w-4 h-4" />
          </div>
          
          <div className="skill-bar">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              className="h-full bg-black" 
            />
          </div>
          
          <p className="text-[11px] text-gray-600 mt-2 leading-tight">{skill.insight}</p>
        </button>
      ))}
    </div>
  </motion.div>
);

const SkillDetailScreen = ({ skill, onBack }: { skill: Skill, onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="pb-24"
  >
    <Header title={skill.name} showBack onBack={onBack} />
    <div className="p-6">
      <div className="mb-12 text-center">
        <div className="w-24 h-24 border-2 border-black mx-auto flex items-center justify-center mb-6">
          {React.cloneElement(skill.icon as React.ReactElement, { className: 'w-10 h-10' })}
        </div>
        <h2 className="text-3xl font-black uppercase mb-2">Demonstration Level</h2>
        <p className="text-gray-500 uppercase tracking-widest text-xs">Based on {skill.name.toLowerCase()} challenge performance</p>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Top Patterns Detected</h4>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full border border-black flex-shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">High clarity in articulating complex project outcomes across written responses.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-5 h-5 rounded-full border border-black flex-shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">Strategic use of structured data to support arguments in simulated team scenarios.</p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 border-2 border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="font-bold uppercase text-xs tracking-widest">How this was generated</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            This insight is generated from candidate challenge responses using NLP analysis. 
            <span className="block mt-2 font-bold text-black uppercase text-[10px]">Important: No candidates are ranked, rejected, or sorted by this metric.</span>
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const CohortInsightsScreen = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="pb-24"
    >
      <Header title="Cohort Insights" />
      <div className="p-4">
        <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
          {['all', 'degree', 'university'].map((f) => (
            <button
              key={f}
              id={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all flex-shrink-0 ${
                filter === f ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'
              }`}
            >
              By {f === 'all' ? 'All Applicants' : f}
            </button>
          ))}
        </div>

        <div className="border-2 border-black p-6 mb-8">
          <h4 className="font-black text-sm uppercase mb-6">Skill Distribution Trend</h4>
          <div className="flex items-end justify-between h-40 gap-2 mb-4">
            {[60, 80, 45, 90, 70, 55].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gray-100 border border-gray-200 hover:bg-black transition-colors"
                title={`Pattern ${i}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] uppercase font-bold text-gray-400 tracking-tighter">
            <span>Critical thinking</span>
            <span>Digital fluency</span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border border-dashed border-gray-300">
          <p className="text-xs text-gray-500 leading-relaxed italic">
            “System Message: This view shows high-level patterns across the entire recruitment cohort. It is designed for workforce planning, not individual assessment.”
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ApplicantsListScreen = ({ setScreen, setSelectedApplicant }: { setScreen: (s: Screen) => void, setSelectedApplicant: (a: Applicant) => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="pb-24"
  >
    <Header title="Applicants" />
    <div className="p-4">
      <div className="mb-6 p-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center">
        Note: Applicants are shown in no particular order
      </div>
      
      <div className="space-y-3">
        {APPLICANTS.map((app) => (
          <button 
            key={app.id}
            id={`applicant-item-${app.id}`}
            onClick={() => {
              setSelectedApplicant(app);
              setScreen('applicant-insight');
            }}
            className="w-full flex items-center justify-between p-4 border-2 border-gray-50 bg-white hover:border-black transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold text-xs">
                {app.id.slice(-2)}
              </div>
              <div>
                <p className="text-sm font-black mb-1">{app.id}</p>
                <div className="flex gap-2">
                  {app.skills.map((s) => (
                    <div key={s} className="p-1 border border-gray-200">
                      {SKILLS.find(sk => sk.id === s)?.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

const ApplicantInsightScreen = ({ applicant, onBack }: { applicant: Applicant, onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="pb-24"
  >
    <Header title="Applicant Skills Overview" showBack onBack={onBack} />
    <div className="p-6">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 border-2 border-black flex items-center justify-center font-black text-2xl">
          {applicant.id.slice(-2)}
        </div>
        <div>
          <h2 className="text-2xl font-black mb-1">{applicant.id}</h2>
          <p className="text-xs uppercase tracking-widest text-gray-400">Anonymous ID • Applied 2 days ago</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Primary Skill Indicators</h4>
          <div className="flex flex-wrap gap-2">
            {applicant.skills.map(s => {
              const skill = SKILLS.find(sk => sk.id === s);
              return (
                <div key={s} className="px-3 py-2 border border-black flex items-center gap-2">
                   {skill?.icon}
                   <span className="text-[10px] font-bold uppercase tracking-widest">{skill?.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-2">Insight summary</h4>
          <div className="p-4 border-l-4 border-black bg-gray-50">
            <p className="text-sm leading-relaxed mb-4 italic text-gray-600">
              “Applicant demonstrates strong non-verbal communication through structured file submission. Problem-solving approach is methodical rather than creative.”
            </p>
            <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black flex items-center gap-1 hover:gap-2 transition-all">
              View Challenge Response
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-6 border-2 border-gray-100 rounded-xl mt-12 bg-white flex flex-col items-center text-center">
          <Shield className="w-8 h-8 mb-4 text-gray-300" />
          <h5 className="font-black uppercase text-sm mb-2">Ethical Review Guide</h5>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
            AI provides insight for human reviewers only. Decisions remain 100% human-led.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const InfoScreen = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
    className="h-[calc(100%-72px)] overflow-y-auto w-full pb-8"
  >
    <Header title="How It Works" />
    <div className="p-4">
      <div className="frosted-card">
        <ul className="text-sm space-y-2 list-disc pl-5">
          <li>Analyses challenge responses</li>
          <li>Identifies skill patterns</li>
          <li>Does not auto-rank or reject</li>
          <li>Decisions are human-led</li>
        </ul>
      </div>
      
      <div className="p-4 border-2 border-dashed border-black rounded-lg text-xs leading-relaxed font-medium bg-white/50">
        <strong>Ethical Guarantee:</strong> This tool supports fair, skills-first hiring by surfacing potential rather than just CV history.
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant>(APPLICANTS[0]);

  return (
    <div className="w-[360px] h-[640px] bg-white border-[8px] border-black rounded-[40px] relative overflow-hidden shadow-2xl flex flex-col font-sans text-[#111827]">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <WelcomeScreen key="welcome" onNext={() => setScreen('home')} />
        )}
        {screen === 'home' && (
          <HomeScreen key="home" setScreen={setScreen} />
        )}
        {screen === 'skills-summary' && (
          <SkillsSummaryScreen 
            key="skills" 
            setScreen={setScreen} 
            setSelectedSkill={setSelectedSkill} 
          />
        )}
        {screen === 'skill-detail' && (
          <SkillDetailScreen 
            key="skill-detail" 
            skill={selectedSkill} 
            onBack={() => setScreen('skills-summary')} 
          />
        )}
        {screen === 'cohort-insights' && (
          <CohortInsightsScreen key="cohorts" />
        )}
        {screen === 'applicants' && (
          <ApplicantsListScreen 
            key="applicants" 
            setScreen={setScreen} 
            setSelectedApplicant={setSelectedApplicant} 
          />
        )}
        {screen === 'applicant-insight' && (
          <ApplicantInsightScreen 
            key="applicant-insight" 
            applicant={selectedApplicant} 
            onBack={() => setScreen('applicants')} 
          />
        )}
        {screen === 'info' && (
          <InfoScreen key="info" />
        )}
      </AnimatePresence>

      {screen !== 'welcome' && (
        <BottomNav current={screen} setScreen={setScreen} />
      )}
    </div>
  );
}
