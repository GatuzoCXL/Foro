
import React from 'react';
import { useForumContext } from '../../context/ForumContext';

const ActivityHistory = () => {
  const { topics, comments } = useForumContext();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-shrek-green mb-4">Historial de Actividad</h2>
      <div className="space-y-4">
        {[...topics, ...comments]
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map(item => (
            <div key={item.id} className="border-b pb-2">
              <p className="text-gray-600">
                {item.hasOwnProperty('title') ? 'Creó un tema: ' : 'Comentó en: '}
                <span className="font-semibold">{(item as any).title || item.content}</span>
              </p>
              <p className="text-sm text-gray-500">
                {item.createdAt.toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActivityHistory;