import React, { useState, useEffect } from 'react';

// IMPORTANT: Replace this with the URL you get after running the backend.py script
const API_URL = "https://e857afec0eba.ngrok-free.app"; // Paste your actual ngrok URL here

function Studio({ user, onSignOut }) {
  const [prompt, setPrompt] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Determine the color of the tier badge based on the user's tier
  const tierColor = user.tier === 'VIP PRO' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-400 text-blue-900';

  useEffect(() => {
    // This is an optional but recommended feature.
    // It checks if the backend is online when the app first loads.
    const checkBackendStatus = async () => {
      try {
        // We assume you create a new `/status` endpoint in your Python backend
        const response = await fetch(`${API_URL}/status`);
        if (!response.ok) {
          setError('Backend is not available. Please ensure the server is running.');
        }
      } catch (err) {
        setError('Cannot connect to backend. Is ngrok running and the URL correct?');
      }
    };

    checkBackendStatus();
  }, []); // The empty array means this effect runs once on component load

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
      // The backend expects form data, so we create it here
      const formData = new FormData();
      formData.append('prompt', prompt);

      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success' && data.audio) {
        setAudioSrc(data.audio);
      } else {
        throw new Error('Failed to generate audio. The server responded without audio data.');
      }

    } catch (err) {
      console.error("Error generating audio:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-400">SurAI Studio</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-lg">{user.name}</p>
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${tierColor}`}>
              {user.tier}
            </span>
          </div>
          <button 
            onClick={onSignOut} 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </header>
      
      {/* Main content area of the studio */}
      <main className="text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h2>
        <p className="text-gray-400 mb-8">Enter a prompt to generate a short piece of music.</p>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a calming lofi hip-hop beat"
            disabled={isLoading}
            className="w-full max-w-lg p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
          <button type="submit" disabled={isLoading} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {audioSrc && (
          <div className="audio-player mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Music:</h3>
            <audio controls src={audioSrc} className="w-full max-w-lg mx-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default Studio;
