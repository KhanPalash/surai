import React, { useState, useEffect } from 'react';

// IMPORTANT: Replace this with the URL you get after running the backend.py script
const API_URL = "https://e857afec0eba.ngrok-free.app"; // Paste your actual ngrok URL here

function App() {
  const [prompt, setPrompt] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="App">
      <header className="App-header">
        <h1>SurAI Music Generator</h1>
        <p>Enter a prompt to generate a short piece of music.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a calming lofi hip-hop beat"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {audioSrc && (
          <div className="audio-player">
            <h3>Your Music:</h3>
            <audio controls src={audioSrc} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;