import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDarkMode } from '../hooks/useDarkMode';
import NotificationIndicator from './notifications/NotificationIndicator';

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();

  return (
    <nav className="bg-white dark:bg-dark-200 shadow-soft sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Shrek 50
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/new-topic" className="nav-link">Nuevo Tema</Link>
            
            <button 
              onClick={toggle}
              className="btn-icon relative overflow-hidden group"
              aria-label="Toggle dark mode"
            >
              <span className="absolute transition-all duration-500 transform dark:rotate-0 rotate-90 opacity-0 dark:opacity-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              </span>
              <span className="transition-all duration-500 transform dark:rotate-90 rotate-0 opacity-100 dark:opacity-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                </svg>
              </span>
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400">
                  <img 
                    src={user.avatar || 'default-avatar.png'} 
                    className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-primary-500"
                    alt={user.username}
                  />
                  <span>{user.username}</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Perfil</Link>
                  <button onClick={logout} className="dropdown-item">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Iniciar Sesión
                <svg className="login-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;