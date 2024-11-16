
import React, { createContext, useContext, useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
}

interface AchievementsContextType {
  achievements: Achievement[];
  badges: Badge[];
  checkAchievement: (type: string) => void;
}

export const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-post',
      name: 'Primer Post',
      description: 'Creaste tu primer tema en el foro',
      icon: '📝',
      unlocked: false
    },
    {
      id: 'popular-post',
      name: 'Post Popular',
      description: 'Obtuviste 10 likes en un tema',
      icon: '⭐',
      unlocked: false
    }
  ]);

  const [badges] = useState<Badge[]>([
    { id: 'newcomer', name: 'Novato', icon: '🌱' },
    { id: 'contributor', name: 'Contribuidor', icon: '🌟' }
  ]);

  const checkAchievement = (type: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === type ? { ...achievement, unlocked: true } : achievement
    ));
  };

  return (
    <AchievementsContext.Provider value={{ achievements, badges, checkAchievement }}>
      {children}
    </AchievementsContext.Provider>
  );
};