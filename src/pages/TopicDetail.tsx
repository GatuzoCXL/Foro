import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForumContext } from '../context/ForumContext';

const TopicDetail = () => {
  const { id } = useParams();
  const { topics, comments, setComments } = useForumContext();
  const [newComment, setNewComment] = useState('');

  const topic = topics.find(t => t.id === Number(id));
  const topicComments = comments.filter(c => c.topicId === Number(id));

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      topicId: Number(id),
      content: newComment,
      author: "Usuario",
      createdAt: new Date()
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  if (!topic) return <div>Tema no encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <div className="topic-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold heading-gradient">{topic.title}</h1>
          <div className="flex items-center space-x-2">
            <button className="btn-icon" title="Compartir">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
            </button>
            <button className="btn-icon" title="Guardar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-2">
            <img src={topic.authorAvatar || 'default-avatar.png'} 
                 className="w-8 h-8 rounded-full" 
                 alt={topic.author} />
            <span>{topic.author}</span>
          </div>
          <span>•</span>
          <time>{topic.createdAt.toLocaleDateString()}</time>
        </div>
        <div className="prose prose-primary max-w-none">
          <div dangerouslySetInnerHTML={{ __html: topic.content }} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold heading-gradient">Comentarios</h2>
        
        <form onSubmit={handleAddComment} className="card">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input-primary mb-4"
            rows={3}
            placeholder="Comparte tus pensamientos..."
          />
          <button type="submit" className="btn-primary">
            Publicar comentario
          </button>
        </form>

        <div className="space-y-4">
          {topicComments.map(comment => (
            <div key={comment.id} className="card group">
              <div className="text-sm text-gray-600 mb-2">
                {comment.author} · {comment.createdAt.toLocaleDateString()}
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;