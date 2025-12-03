import React from 'react';
import { Plus } from 'lucide-react';

const Toolbar = ({ onAddTrack }) => {
  return (
    <div className="flex justify-center items-center p-4 bg-gray-900">
      <button onClick={onAddTrack} className="p-2 bg-blue-500 rounded-full">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Toolbar;
