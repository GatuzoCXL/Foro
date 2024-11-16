import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.username, formData.password);
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-dark-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">Iniciar Sesión</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-neutral-200 mb-2">Usuario</label>
          <input
            type="text"
            value={formData.username}
            onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="w-full p-2 border rounded dark:bg-dark-700 dark:border-dark-600 dark:text-neutral-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-neutral-200 mb-2">Contraseña</label>
          <input
            type="password"
            value={formData.password}
            onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full p-2 border rounded dark:bg-dark-700 dark:border-dark-600 dark:text-neutral-200"
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;