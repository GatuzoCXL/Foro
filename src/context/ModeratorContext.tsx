
import React, { createContext, useContext, useState } from 'react';

interface ModAction {
  id: number;
  topicId: number;
  action: 'warn' | 'delete' | 'lock';
  moderator: string;
  reason: string;
  timestamp: Date;
}

interface ModeratorContextType {
  isModerator: boolean;
  modActions: ModAction[];
  handleModAction: (action: Omit<ModAction, 'id' | 'timestamp'>) => void;
}

export const ModeratorContext = createContext<ModeratorContextType | undefined>(undefined);

export const ModeratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modActions, setModActions] = useState<ModAction[]>([]);
  const [isModerator] = useState(false); // In real app, this would be determined by user role

  const handleModAction = (action: Omit<ModAction, 'id' | 'timestamp'>) => {
    setModActions(prev => [...prev, {
      ...action,
      id: Date.now(),
      timestamp: new Date()
    }]);
  };

  return (
    <ModeratorContext.Provider value={{ isModerator, modActions, handleModAction }}>
      {children}
    </ModeratorContext.Provider>
  );
};