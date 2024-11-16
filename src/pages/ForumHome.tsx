import React from 'react';
import { Link } from 'react-router-dom';

// Definir los iconos SVG
const categoryIcon = {
  viewBox: "0 0 24 24",
  path: <path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
};

const topicIcon = {
  viewBox: "0 0 24 24",
  path: <path fill="currentColor" d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
};

const postIcon = {
  viewBox: "0 0 24 24",
  path: <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
};

const ForumHome = () => {
  const categories = [
    {
      id: 1,
      title: "General",
      description: "Discusiones generales sobre el curso",
      topics: 10,
      posts: 50
    },
    {
      id: 2,
      title: "Ayuda",
      description: "Solicita ayuda con tus dudas",
      topics: 5,
      posts: 20
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold heading-gradient mb-6">
          Foro Shrek 50
        </h1>
        <p className="text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
          Únete a nuestra comunidad y participa en las discusiones más interesantes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(category => (
          <Link 
            key={category.id}
            to={`/category/${category.id}`}
            className="card group hover:-translate-y-1 animate-slide-up"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" viewBox={categoryIcon.viewBox}>
                  {categoryIcon.path}
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-200 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {category.title}
                </h2>
                <p className="text-gray-600 dark:text-neutral-400 mt-1">{category.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-neutral-400">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox={topicIcon.viewBox}>
                      {topicIcon.path}
                    </svg>
                    {category.topics} temas
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox={postIcon.viewBox}>
                      {postIcon.path}
                    </svg>
                    {category.posts} posts
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumHome;