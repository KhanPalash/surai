import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Go up one directory to find firebase.js

function LoginScreen() {
  const [email, setEmail] = useState('demo@surai.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        console.error("Login Error:", err);
        setError("Invalid credentials. Please try again.");
      });
      // On successful login, the onAuthStateChanged in App.jsx will handle the redirect.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold mb-4 text-purple-400">SurAI</h1>
        <p className="text-xl text-gray-400 mb-8">Your AI-powered creative partner.</p>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors duration-300"
          >
            Enter Studio
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
