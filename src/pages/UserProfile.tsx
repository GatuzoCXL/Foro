import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-shrek-green mb-4">Perfil de Usuario</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-xl mb-2">Username: {user.username}</p>
        <p className="text-gray-600">User ID: {user.id}</p>
      </div>
    </div>
  );
};

export default UserProfile;
