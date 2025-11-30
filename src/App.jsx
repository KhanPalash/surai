import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Mic, Music, Drum, Guitar, Music4, Layers, 
  Settings, MoreVertical, Wand2, Plus, Download, X, Edit3, 
  Scissors, Sparkles, BrainCircuit, Undo, Save, UploadCloud, 
  FileAudio, Smartphone, ArrowLeft, Trash2, Zap, Lock, 
  LogOut, CheckCircle, AlertCircle, Music2
} from 'lucide-react';

// --- 1. CONFIGURATION AREA (User Editable) ---
const APP_CONFIG = {
  name: "SurAI",
  version: "1.1.0", // Updated version
  // VIP Whitelist: Tomar bondhuder email ekhane add koro
  vipEmails: [
    "admin@surai.com", 
    "review@test.com",
    "friend@gmail.com"
  ]
};

const SUGGESTED_STYLES = [
  { id: 'lofi', name: 'Lofi Hip Hop', color: 'bg-indigo-600' },
  { id: 'pop', name: 'Modern Pop', color: 'bg-pink-600' },
  { id: 'rock', name: 'Alt Rock', color: 'bg-red-600' },
  { id: 'cinematic', name: 'Cinematic', color: 'bg-teal-600' },
  { id: 'folk', name: 'Bengali Folk', color: 'bg-orange-600' },
  { id: 'edm', name: 'EDM', color: 'bg-blue-600' },
];

const TRACK_TYPES = [
  { type: 'vocal', name: 'Vocals', icon: Mic, color: 'bg-yellow-500' },
  { type: 'guitar', name: 'Solo Guitar', icon: Guitar, color: 'bg-orange-500' },
  { type: 'drum', name: 'Drum Loop', icon: Drum, color: 'bg-blue-500' },
  { type: 'bass', name: 'Bass Line', icon: Music, color: 'bg-red-500' },
  { type: 'piano', name: 'Piano', icon: Music4, color: 'bg-purple-500' },
  { type: 'other', name: 'Synth / FX', icon: Layers, color: 'bg-teal-500' },
];

// --- MAIN APP COMPONENT ---
export default function SurAIApp() {
  // --- STATE ---
  const [user, setUser] = useState(null); // { email, isPremium }
  const [view, setView] = useState('LOGIN'); // LOGIN, HOME, GENERATE, REMIX, STUDIO
  
  // Studio Data
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  const [layers, setLayers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Inputs
  const [prompt, setPrompt] = useState('');
  const [stylePrompt, setStylePrompt] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Modals & Interaction
  const [showNewTrackModal, setShowNewTrackModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [popupMenu, setPopupMenu] = useState(null);
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [showLyricModal, setShowLyricModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // AI & Logs
  const [logs, setLogs] = useState([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [geminiSuggestion, setGeminiSuggestion] = useState('');
  const [geminiChords, setGeminiChords] = useState(''); // ✨ New State for Chords

  // Long Press Logic
  const longPressTimer = useRef(null);
  const isLongPress = useRef(false);

  // --- ACTIONS ---

  // 1. LOGIN LOGIC
  const handleLogin = (email) => {
    const isPremium = APP_CONFIG.vipEmails.includes(email);
    setUser({ email, isPremium });
    setView('HOME');
  };

  // 2. MOCK AI GENERATION
  const startProcessing = () => {
    if (!stylePrompt) return alert("Please specify a style!");
    setView('PROCESSING');
    
    // Simulate Initial Generation (MusicGen + Demucs)
    const steps = [
      "Connecting to SurAI Cloud...",
      `Analyzing Style: "${stylePrompt}"...`,
      uploadedFile ? "Processing Reference Audio..." : "Composing Melody...",
      "MusicGen: Generating Base Audio...",
      "HTDemucs-6s: Separating Stems...",
      "Isolating Vocals, Drums, Bass...",
      "Mastering Tracks...",
      "Studio Ready."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, steps[i]]);
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        // Initialize Studio with some mock layers
        setLayers([
          { id: 'v1', name: 'Vocals', type: 'vocal', color: 'bg-yellow-500', volume: 80, isEmpty: false },
          { id: 'd1', name: 'Drums', type: 'drum', color: 'bg-blue-500', volume: 90, isEmpty: false },
          { id: 'b1', name: 'Bass', type: 'bass', color: 'bg-red-500', volume: 85, isEmpty: false },
          { id: 'o1', name: 'Others', type: 'other', color: 'bg-teal-500', volume: 70, isEmpty: false },
        ]);
        setTimeout(() => setView('STUDIO'), 1000);
      }
    }, 800);
  };

  // 3. GEMINI API CALL (Expanded)
  const callGemini = (mode, contextData = '') => {
    setIsAiThinking(true);
    
    // In a real app, you would fetch from: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
    setTimeout(() => {
      setIsAiThinking(false);
      
      if (mode === 'lyrics') {
        setPrompt("(Verse)\nNeon lights on Dhaka streets\nRhythm of the rain, skipping beats\n(Chorus)\nEi shohor, ei raat...");
      } 
      else if (mode === 'rhyme') {
        setGeminiSuggestion("Tomar chokher nil rong...");
      }
      // ✨ Feature 1: Style Enhancer
      else if (mode === 'enhance_style') {
        const enhanced = contextData 
          ? `${contextData}, Cinematic atmosphere, Lo-fi texture, 90 BPM, Minor Scale` 
          : "Melancholic Lofi Beat, Rain sounds, Slow Tempo, Nostalgic Vibe";
        setStylePrompt(enhanced);
      }
      // ✨ Feature 2: Chord Suggestion
      else if (mode === 'suggest_chords') {
        setGeminiChords("Am7 - Fmaj7 - C - G (Soulful Progression)");
      }
    }, 1500);
  };

  // 4. STUDIO ACTIONS
  const handlePointerDown = (e, layerId) => {
    isLongPress.current = false;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setSelectedRegion({ layerId, start: 30, end: 40 });
      setPopupMenu({ x: clientX, y: clientY, layerId });
      if (navigator.vibrate) navigator.vibrate(50);
    }, 600); // 600ms hold
  };

  const addNewTrack = (option) => {
    const newLayer = {
      id: `custom-${Date.now()}`,
      name: `${option.name} ${layers.filter(l => l.type === option.type).length + 1}`,
      type: option.type,
      color: option.color,
      volume: 80,
      isEmpty: true // Empty state
    };
    setLayers([...layers, newLayer]);
    setShowNewTrackModal(false);
  };

  const handlePremiumFeature = (featureName) => {
    if (user.isPremium) {
      if (featureName === 'download') alert("Exporting WAV Stems (Premium)...");
      if (featureName === 'lyric') setShowLyricModal(true);
    } else {
      setShowPremiumModal(true);
    }
  };

  // --- RENDERERS ---

  if (view === 'LOGIN') return (
    <LoginScreen onLogin={handleLogin} />
  );

  if (view === 'HOME') return (
    <HomeScreen 
      user={user} 
      onNavigate={setView} 
      onLogout={() => setView('LOGIN')} 
    />
  );

  if (view === 'GENERATE') return (
    <GenerateSetup 
      prompt={prompt} setPrompt={setPrompt}
      stylePrompt={stylePrompt} setStylePrompt={setStylePrompt}
      onBack={() => setView('HOME')}
      onGenerate={startProcessing}
      onGemini={(mode) => callGemini(mode, stylePrompt)}
      isAiThinking={isAiThinking}
    />
  );

  if (view === 'REMIX') return (
    <RemixSetup 
      file={uploadedFile} setFile={setUploadedFile}
      stylePrompt={stylePrompt} setStylePrompt={setStylePrompt}
      onBack={() => setView('HOME')}
      onGenerate={startProcessing}
    />
  );

  if (view === 'PROCESSING') return (
    <ProcessingScreen logs={logs} />
  );

  if (view === 'STUDIO') return (
    <div className="h-screen bg-gray-950 text-white flex flex-col relative overflow-hidden" onClick={() => setPopupMenu(null)}>
      
      {/* Landscape Warning */}
      <div className="md:hidden portrait:flex fixed inset-0 z-[100] bg-black flex-col items-center justify-center text-center p-6">
        <Smartphone className="w-16 h-16 text-purple-500 mb-4 animate-bounce rotate-90" />
        <h2 className="text-xl font-bold mb-2">Please Rotate Device</h2>
        <p className="text-gray-400 text-sm">SurAI Studio needs landscape mode.</p>
      </div>

      {/* Header */}
      <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('HOME')} className="text-gray-500 hover:text-white"><ArrowLeft className="w-5 h-5"/></button>
          <h1 className="font-bold text-sm hidden md:block">Project <span className="text-purple-400">{projectTitle}</span></h1>
        </div>
        
        {/* Playback & Export */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200">
            {isPlaying ? <Pause className="w-5 h-5 fill-current"/> : <Play className="w-5 h-5 fill-current pl-1"/>}
          </button>
          
          <button 
            onClick={() => handlePremiumFeature('download')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 ${user.isPremium ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-800 text-gray-400'}`}
          >
            {!user.isPremium && <Lock className="w-3 h-3" />} Export
          </button>
        </div>
      </header>

      {/* Main Workspace (Horizontal Scroll) */}
      <div className="flex-1 overflow-y-auto bg-gray-950 relative overflow-x-hidden">
        <div className="flex min-w-[1200px]"> 
           
           {/* Sidebar Controls */}
           <div className="sticky left-0 w-48 md:w-64 bg-gray-900 border-r border-gray-800 z-40 shrink-0 shadow-xl flex flex-col min-h-[calc(100vh-56px)]">
             <div className="h-8 border-b border-gray-800 bg-gray-900/95 backdrop-blur flex items-center justify-between px-3 text-[10px] text-gray-500 font-bold tracking-wider">
               <span>TRACKS ({layers.length})</span>
             </div>
             
             {layers.map((layer) => (
               <TrackControl 
                 key={layer.id} layer={layer} 
                 activeMenu={activeMenu} setActiveMenu={setActiveMenu}
                 onDelete={() => setLayers(layers.filter(l => l.id !== layer.id))}
                 onSVS={() => handlePremiumFeature('lyric')}
                 isPremium={user.isPremium}
               />
             ))}

             <button 
                onClick={() => setShowNewTrackModal(true)}
                className="m-3 py-3 border border-dashed border-gray-700 rounded-xl text-gray-500 text-xs font-bold hover:border-purple-500 hover:text-purple-400 hover:bg-gray-800/50 transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" /> Add Track
             </button>
           </div>

           {/* Timeline Waveforms */}
           <div className="flex-1 bg-gray-950 relative" onContextMenu={(e) => e.preventDefault()}>
              <TimelineRuler />
              
              {layers.map((layer) => (
                <div 
                  key={layer.id} 
                  className="h-24 border-b border-gray-800/30 relative group select-none hover:bg-white/5 transition-colors"
                  onMouseDown={(e) => handlePointerDown(e, layer.id)}
                  onMouseUp={() => clearTimeout(longPressTimer.current)}
                  onMouseLeave={() => clearTimeout(longPressTimer.current)}
                  onTouchStart={(e) => handlePointerDown(e, layer.id)}
                  onTouchEnd={() => clearTimeout(longPressTimer.current)}
                  onTouchMove={() => clearTimeout(longPressTimer.current)}
                >
                   {layer.isEmpty ? (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <span className="text-[10px] text-gray-600 uppercase tracking-widest border border-gray-800 px-3 py-1 rounded-full bg-gray-900/80">
                           Long press to generate
                         </span>
                      </div>
                   ) : (
                      <MockWaveform color={layer.color} />
                   )}

                   {/* Region Highlight */}
                   {selectedRegion?.layerId === layer.id && (
                      <div className="absolute top-0 bottom-0 left-[200px] w-[200px] bg-purple-500/20 border-x-2 border-purple-500 z-20 flex items-center justify-center backdrop-blur-[1px]"></div>
                   )}
                </div>
              ))}

              {/* Popup Menu */}
              {popupMenu && (
                <div 
                  className="absolute bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 flex overflow-hidden animate-in zoom-in-95"
                  style={{ left: `${popupMenu.x}px`, top: `${layers.findIndex(l => l.id === popupMenu.layerId) * 96 + 30}px` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => { setPopupMenu(null); setShowRegenModal(true); }} className="px-4 py-2 hover:bg-gray-700 text-xs font-bold text-white flex items-center gap-2 border-r border-gray-700">
                    <Zap className="w-3 h-3 text-yellow-400" /> 
                    {layers.find(l => l.id === popupMenu.layerId)?.isEmpty ? 'Generate' : 'Edit'}
                  </button>
                  <button onClick={() => { setPopupMenu(null); setSelectedRegion(null); }} className="px-4 py-2 hover:bg-red-900/30 text-xs font-bold text-red-400 flex items-center gap-2">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* 1. New Track Modal */}
      {showNewTrackModal && (
        <Modal onClose={() => setShowNewTrackModal(false)} title="Add New Layer">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TRACK_TYPES.map((t) => (
              <button key={t.type} onClick={() => addNewTrack(t)} className="flex flex-col items-center gap-2 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
                <div className={`p-3 rounded-full ${t.color} bg-opacity-20`}><t.icon className={`w-6 h-6 ${t.color.replace('bg-', 'text-').replace('500', '400')}`}/></div>
                <span className="text-sm font-bold text-gray-200">{t.name}</span>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* 2. Premium Upgrade Modal */}
      {showPremiumModal && (
        <Modal onClose={() => setShowPremiumModal(false)} title="Premium Feature">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unlock Pro Studio</h3>
            <p className="text-gray-400 text-sm mb-6">Stem Download, SVS Lyric Extension, and Unlimited Generation are available for VIP users.</p>
            <button onClick={() => setShowPremiumModal(false)} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200">Contact Admin for Access</button>
          </div>
        </Modal>
      )}

      {/* 3. Regeneration Modal */}
      {showRegenModal && (
        <Modal onClose={() => setShowRegenModal(false)} title="Generate Audio">
          <p className="text-xs text-purple-400 font-bold mb-2 uppercase tracking-wide">
             Target: {layers.find(l => l.id === popupMenu?.layerId)?.name || 'Track'}
          </p>
          <textarea className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white mb-4 focus:border-purple-500 outline-none h-24 resize-none" placeholder="Describe the sound (e.g. 'Soft piano chords in C minor')..." autoFocus />
          <button onClick={() => { setShowRegenModal(false); alert("Generating..."); }} className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-bold">Generate</button>
        </Modal>
      )}

      {/* 4. Lyric Extension (SVS) Modal */}
      {showLyricModal && (
        <Modal onClose={() => setShowLyricModal(false)} title="Lyric Extension (SVS)">
          <div className="bg-gray-950 h-24 rounded border border-gray-800 mb-4 flex items-center justify-center text-gray-600 text-xs font-mono relative">
             Pitch Curve Visualization
             {/* Gemini Chords Overlay */}
             {geminiChords && (
               <div className="absolute bottom-2 bg-purple-900/80 px-3 py-1 rounded text-xs text-purple-200 font-bold border border-purple-500/50 animate-in fade-in">
                 🎵 AI Chords: {geminiChords}
               </div>
             )}
          </div>
          <textarea className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white mb-4 focus:border-purple-500 outline-none" placeholder="New lyrics..." defaultValue={geminiSuggestion} />
          <div className="flex flex-wrap gap-2 justify-between items-center">
             <div className="flex gap-2">
                <button onClick={() => callGemini('rhyme')} className="text-xs text-purple-400 hover:text-white flex items-center gap-1 border border-gray-700 px-2 py-1 rounded-full"><Sparkles className="w-3 h-3"/> {isAiThinking ? 'Thinking...' : 'AI Rhyme'}</button>
                <button onClick={() => callGemini('suggest_chords')} className="text-xs text-blue-400 hover:text-white flex items-center gap-1 border border-gray-700 px-2 py-1 rounded-full"><Music2 className="w-3 h-3"/> {isAiThinking ? 'Analyzing...' : 'Get Chords'}</button>
             </div>
             <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-sm font-bold">Synthesize</button>
          </div>
        </Modal>
      )}

    </div>
  );
}

// ... (Sub-Components remain largely same, updated GenerateSetup below) ...

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"></div>
      
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl z-10 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <BrainCircuit className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Sur<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI</span></h1>
        <p className="text-gray-400 mb-8">Next-Gen AI Music Studio</p>

        <input 
          type="email" 
          placeholder="Enter your email" 
          className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white mb-4 focus:border-purple-500 outline-none transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          onClick={() => email && onLogin(email)}
          className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          Continue with Google <span className="text-xs font-normal text-gray-500">(Simulated)</span>
        </button>
        <div className="mt-6 text-xs text-gray-500">
           Try <b>admin@surai.com</b> for VIP access
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ user, onNavigate, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center relative">
      <div className="w-full max-w-4xl flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
             <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-50"></div>
          </div>
          <div>
            <h2 className="font-bold text-lg">{user.email.split('@')[0]}</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${user.isPremium ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' : 'border-gray-700 text-gray-500'}`}>
              {user.isPremium ? 'VIP PRO' : 'FREE TIER'}
            </span>
          </div>
        </div>
        <button onClick={onLogout} className="p-2 hover:bg-gray-800 rounded-full text-gray-400"><LogOut className="w-5 h-5"/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <HomeCard 
          icon={Wand2} title="Create New Song" desc="Text to Music generation with Gemini lyrics."
          color="text-purple-400" bg="hover:border-purple-500"
          onClick={() => onNavigate('GENERATE')}
        />
        <HomeCard 
          icon={UploadCloud} title="Remix / Cover" desc="Upload audio & transform style with AI."
          color="text-pink-400" bg="hover:border-pink-500"
          onClick={() => onNavigate('REMIX')}
        />
      </div>
    </div>
  );
}

function HomeCard({ icon: Icon, title, desc, color, bg, onClick }) {
  return (
    <button onClick={onClick} className={`text-left p-8 bg-gray-900 border border-gray-800 rounded-3xl transition-all hover:scale-[1.02] hover:shadow-2xl group ${bg}`}>
      <div className={`w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </button>
  );
}

function GenerateSetup({ prompt, setPrompt, stylePrompt, setStylePrompt, onBack, onGenerate, onGemini, isAiThinking }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col">
       <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5"/> Back</button>
       <div className="max-w-2xl mx-auto w-full space-y-6 animate-in slide-in-from-bottom-4">
         <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold flex items-center gap-2 text-gray-200"><Sparkles className="w-4 h-4 text-purple-400"/> Lyrics / Concept</label>
              <button onClick={() => onGemini('lyrics')} className="text-xs bg-gray-800 border border-gray-700 text-purple-300 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-gray-700">
                {isAiThinking ? 'Thinking...' : 'Ask Gemini'}
              </button>
            </div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full h-32 bg-gray-950 border border-gray-800 rounded-xl p-4 focus:border-purple-500 outline-none resize-none text-white placeholder-gray-600" placeholder="Write lyrics or song idea..." />
         </div>
         
         <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
               <label className="font-bold block text-gray-200">Target Style</label>
               {/* ✨ AI Enhance Button */}
               <button onClick={() => onGemini('enhance_style')} className="text-[10px] bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full flex items-center gap-1 hover:shadow-lg">
                 <Sparkles className="w-3 h-3" /> Enhance with AI
               </button>
            </div>
            <textarea value={stylePrompt} onChange={(e) => setStylePrompt(e.target.value)} className="w-full h-20 bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm focus:border-purple-500 outline-none resize-none mb-4 text-white placeholder-gray-600" placeholder="E.g., Upbeat Pop, Female Vocals..." />
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_STYLES.map((style) => (
                <button key={style.id} onClick={() => setStylePrompt(prev => prev ? `${prev}, ${style.name}` : style.name)} className="text-xs bg-gray-800 border border-gray-700 hover:border-purple-500 px-2 py-1 rounded transition-all text-gray-300">+ {style.name}</button>
              ))}
            </div>
         </div>
         <button onClick={onGenerate} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90"><Wand2 className="w-5 h-5" /> Generate & Open Studio</button>
       </div>
    </div>
  );
}

function RemixSetup({ file, setFile, stylePrompt, setStylePrompt, onBack, onGenerate }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col">
       <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5"/> Back</button>
       <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
         {!file ? (
           <div className="animate-in slide-in-from-bottom-4">
             <h2 className="text-3xl font-bold mb-6 text-center text-white">Upload Reference Track</h2>
             <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-2xl cursor-pointer bg-gray-900/50 hover:bg-gray-800 hover:border-pink-500 transition-all group">
               <UploadCloud className="w-12 h-12 mb-4 text-gray-500 group-hover:text-pink-500 transition-colors" />
               <p className="mb-2 text-sm text-gray-400">Click to upload or drag and drop</p>
               <input type="file" className="hidden" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
             </label>
           </div>
         ) : (
           <div className="animate-in fade-in zoom-in duration-300 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl">
             <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800/50 rounded-lg">
               <FileAudio className="w-8 h-8 text-pink-500" />
               <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-bold truncate text-white">{file.name}</p>
                 <p className="text-xs text-green-400">Ready for Remix</p>
               </div>
               <button onClick={() => setFile(null)} className="p-1 hover:bg-gray-700 rounded text-gray-400"><X className="w-4 h-4" /></button>
             </div>
             <label className="text-sm font-semibold text-gray-300 mb-3 block">New Style & Mood</label>
             <textarea value={stylePrompt} onChange={(e) => setStylePrompt(e.target.value)} placeholder="E.g., Transform this into a slow Lofi beat..." className="w-full h-24 bg-gray-950 border border-gray-700 rounded-xl p-3 text-white text-sm focus:border-pink-500 outline-none resize-none mb-6" autoFocus />
             <button onClick={onGenerate} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-3 rounded-xl font-bold shadow-lg">Generate Remix</button>
           </div>
         )}
       </div>
    </div>
  );
}

function ProcessingScreen({ logs }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
      <div className="w-24 h-24 relative mb-8">
        <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md h-64 overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 bg-gray-800/50 px-4 py-1 text-xs text-gray-400">Terminal Output</div>
        <div className="mt-4 space-y-2">
          {logs.map((log, i) => <div key={i} className="text-xs text-green-400 animate-in fade-in slide-in-from-left-2">{'>'} {log}</div>)}
        </div>
      </div>
    </div>
  );
}

function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5"/></button>
        <h3 className="text-lg font-bold text-white mb-6">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function TimelineRuler() {
  return (
    <div className="h-8 bg-gray-900/50 border-b border-gray-800 flex items-end sticky top-0 z-30">
      {[...Array(30)].map((_, i) => (
         <div key={i} className="flex-1 border-l border-gray-800 h-2 text-[9px] text-gray-600 pl-1 relative">
           <span className="absolute -top-3">{i*5}s</span>
         </div>
      ))}
    </div>
  );
}

function MockWaveform({ color }) {
  return (
    <div className="absolute inset-0 flex items-center px-4 gap-1 opacity-50 pointer-events-none">
       {[...Array(120)].map((_, i) => (
          <div key={i} className={`w-1 rounded-full ${color}`} style={{ height: `${Math.random() * 80 + 10}%` }}></div>
       ))}
    </div>
  );
}