import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForumContext } from '../context/ForumContext';
import { useAuth } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewTopic = () => {
  const navigate = useNavigate();
  const { categories, topics, setTopics } = useForumContext();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: ''
  });
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Debes iniciar sesión para crear un tema.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.categoryId) {
      setError('Por favor completa todos los campos');
      return;
    }

    const newTopic = {
      id: topics.length + 1,
      title: formData.title,
      content: formData.content,
      categoryId: Number(formData.categoryId),
      author: user.username,
      createdAt: new Date(),
      comments: [],
      likes: 0,
      dislikes: 0,
      mentions: [], // Add missing property
      reactions: []  // Add missing property
    };

    setTopics(prev => [...prev, newTopic]);
    navigate(`/category/${formData.categoryId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">Crear Nuevo Tema</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl bg-white dark:bg-dark-800 p-6 rounded-lg shadow-xl">
        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-neutral-200 mb-2" htmlFor="categoryId">
            Categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-dark-800 text-gray-700 dark:text-neutral-200 border-gray-300 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id} className="dark:bg-dark-800">
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-neutral-200 mb-2" htmlFor="title">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-dark-800 text-gray-700 dark:text-neutral-200 border-gray-300 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-neutral-200 mb-2">Contenido</label>
          <div className="dark:quill-dark">
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              className="h-64 mb-12"
              theme="snow"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['link', 'blockquote', 'code-block'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['clean']
                ]
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary"
        >
          Crear Tema
        </button>
      </form>
    </div>
  );
};

export default NewTopic;