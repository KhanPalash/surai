import React, { useState } from 'react';

const instruments = [
  { name: 'Drums', icon: '🥁' },
  { name: 'Bass', icon: '🎸' },
  { name: 'Vocals', icon: '🎤' },
  { name: 'Guitar', icon: '🎸' },
];

const NewTrackModal = ({ onConfirm, onCancel }) => {
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Add New Track</h3>
        <div className="grid grid-cols-2 gap-4">
          {instruments.map(inst => (
            <button 
              key={inst.name} 
              onClick={() => setSelectedInstrument(inst)} 
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${selectedInstrument?.name === inst.name ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <span className="text-4xl">{inst.icon}</span>
              <span className="mt-2">{inst.name}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onCancel} className="mr-2 text-gray-400">Cancel</button>
          <button onClick={() => onConfirm(selectedInstrument)} className="bg-blue-500 px-4 py-2 rounded-lg" disabled={!selectedInstrument}>
            Add Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTrackModal;
