import { useState } from 'react';
import Header from './Header';
import ProjectList from './ProjectList';
import NewTrackModal from './NewTrackModal';
import { Music, Plus } from 'lucide-react';

function Studio({ user, onSignOut }) {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} onSignOut={onSignOut} />
      <main className="flex-1 p-8 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Projects</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Plus size={20}/>
            Create New Song
          </button>
        </div>

        {projects.length > 0 ? (
          <ProjectList projects={projects} />
        ) : (
          <div className="text-center py-20 bg-gray-800 rounded-lg">
            <Music size={64} className="mx-auto text-gray-500"/>
            <h2 className="mt-4 text-2xl font-semibold">No projects yet</h2>
            <p className="mt-2 text-gray-400">Click "Create New Song" to start your first track.</p>
          </div>
        )}

      </main>
      <NewTrackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddProject={addProject}
      />
    </div>
  );
}

export default Studio;
