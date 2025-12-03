import React from 'react';

function Studio({ user, onSignOut }) {
  // Determine the color of the tier badge based on the user's tier
  const tierColor = user.tier === 'VIP PRO' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-400 text-blue-900';

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
        <p className="text-gray-400">This is your creative dashboard. More features coming soon!</p>
        {/* Future components and features will go here */}
      </main>
    </div>
  );
}

export default Studio;
