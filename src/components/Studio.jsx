import React, { useState, useEffect, useRef } from 'react';
import SurpriseMeButton from './SurpriseMeButton';

// IMPORTANT: Replace this with the URL from your running backend.py script
const API_URL = "https://e857afec0eba.ngrok-free.app"; // Paste your actual ngrok URL here

function Studio({ user, onSignOut }) {
  const [prompt, setPrompt] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const tierColor = user.tier === 'VIP PRO' ? 'bg-secondary text-white' : 'bg-accent text-background';

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/status`);
        if (!response.ok) {
          setError('Backend is offline. Please start the server.');
        }
      } catch (err) {
        setError('Cannot connect to backend. Is the ngrok URL correct?');
      }
    };
    checkBackendStatus();
  }, []);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioSrc]);

  const handleSurpriseMe = (selectedPrompt) => {
    setPrompt(selectedPrompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setAudioSrc('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success' && data.audio) {
        setAudioSrc(data.audio);
      } else {
        throw new Error(data.message || 'Failed to generate audio.');
      }
    } catch (err) {
      console.error("Audio generation error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text bg-noise">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-primary">SurAI Studio</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-lg">{user.name}</p>
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${tierColor}`}>
                {user.tier}
              </span>
            </div>
            <button 
              onClick={onSignOut} 
              className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              Sign Out
            </button>
          </div>
        </header>

        <main className="bg-surface p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h2>
            <p className="text-subtle">Let's create something amazing. Enter a prompt to generate music.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., an epic cinematic score for a space battle"
                disabled={isLoading}
                className="w-full p-4 pr-16 rounded-xl bg-background text-text border-2 border-transparent focus:outline-none focus:border-primary transition-all duration-300 shadow-inner"
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <SurpriseMeButton onSelect={handleSurpriseMe} />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
              className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary hover:bg-purple-700 transform hover:scale-105'}`}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : 'Generate Music'}
            </button>
          </form>

          {error && <p className="text-red-400 mt-6 text-center bg-red-900 bg-opacity-50 p-3 rounded-lg">{`Error: ${error}`}</p>}

          {audioSrc && (
            <div className="audio-player mt-10 p-6 rounded-2xl bg-background shadow-inner">
              <h3 className="text-2xl font-bold mb-4 text-center text-accent">Your Masterpiece</h3>
              <audio ref={audioRef} controls src={audioSrc} className="w-full" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Studio;
