import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ForumProvider } from './context/ForumContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ModeratorProvider } from './context/ModeratorContext';
import { AchievementsProvider } from './context/AchievementsContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ModeratorProvider>
          <AchievementsProvider>
            <ForumProvider>
              <AppRoutes />
            </ForumProvider>
          </AchievementsProvider>
        </ModeratorProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
