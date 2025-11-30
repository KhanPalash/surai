
import { FileAudio, Clock } from 'lucide-react';

// Mock data for recent projects
const recentProjects = [
  { id: 1, name: 'Lofi Chill Beat', lastOpened: '2 hours ago', type: 'remix' },
  { id: 2, name: 'Rock Anthem', lastOpened: '1 day ago', type: 'new' },
  { id: 3, name: 'Acoustic Ballad', lastOpened: '3 days ago', type: 'new' },
];

export default function ProjectList() {
  return (
    <div className="max-w-4xl w-full mt-12 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-xl font-bold text-white mb-4">Recent Projects</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl divide-y divide-gray-800">
        {recentProjects.map((project) => (
          <button key={project.id} className="w-full text-left flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-4">
              <FileAudio className="w-6 h-6 text-gray-500" />
              <div>
                <p className="font-bold text-white">{project.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <Clock className="w-3 h-3 text-gray-600" />
                   <span className="text-xs text-gray-500">{project.lastOpened}</span>
                </div>
              </div>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${project.type === 'remix' ? 'bg-pink-500/10 text-pink-400' : 'bg-purple-500/10 text-purple-400'}`}>
              {project.type}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
