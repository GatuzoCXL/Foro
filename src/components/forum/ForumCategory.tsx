import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForumContext } from '../../context/ForumContext';

const ForumCategory = () => {
  const { id } = useParams();
  const { categories, topics, handleVote, searchTopics } = useForumContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
  
  const category = categories.find(cat => cat.id === Number(id));
  let categoryTopics = topics.filter(topic => topic.categoryId === Number(id));

  // Aplicar búsqueda si hay query
  if (searchQuery) {
    categoryTopics = searchTopics(searchQuery).filter(topic => topic.categoryId === Number(id));
  }

  // Ordenar temas
  categoryTopics.sort((a, b) => {
    if (sortBy === 'date') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    return (b.likes - b.dislikes) - (a.likes - a.dislikes);
  });

  if (!category) {
    return <div className="container mx-auto p-4 dark:text-neutral-200">Categoría no encontrada</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:text-neutral-200">
      <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">{category.title}</h1>
      
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Buscar temas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded dark:bg-dark-700 dark:border-dark-600 dark:text-neutral-200"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}
          className="p-2 border rounded dark:bg-dark-700 dark:border-dark-600 dark:text-neutral-200"
        >
          <option value="date">Más recientes</option>
          <option value="likes">Más populares</option>
        </select>
      </div>

      <div className="space-y-4">
        {categoryTopics.length > 0 ? (
          categoryTopics.map(topic => (
            <div key={topic.id} className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow">
              <Link to={`/topic/${topic.id}`}>
                <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400">{topic.title}</h2>
              </Link>
              <div 
                className="text-gray-600 dark:text-neutral-400 mt-2"
                dangerouslySetInnerHTML={{ __html: topic.content }}
              />
              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => handleVote(topic.id, 'like')}
                  className="flex items-center gap-1 text-green-600 dark:text-green-400"
                >
                  <span>👍 {topic.likes}</span>
                </button>
                <button
                  onClick={() => handleVote(topic.id, 'dislike')}
                  className="flex items-center gap-1 text-red-600 dark:text-red-400"
                >
                  <span>👎 {topic.dislikes}</span>
                </button>
                <span className="text-sm text-gray-500 dark:text-neutral-400">
                  {topic.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-neutral-400">No hay temas en esta categoría aún</p>
        )}
      </div>
      <Link 
        to="/new-topic" 
        className="mt-4 inline-block bg-primary-600 dark:bg-primary-400 text-white px-4 py-2 rounded hover:bg-primary-700 dark:hover:bg-primary-500"
      >
        Crear Nuevo Tema
      </Link>
    </div>
  );
};

export default ForumCategory;