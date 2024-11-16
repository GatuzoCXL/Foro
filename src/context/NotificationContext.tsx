import React, { createContext, useContext, useState } from 'react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message,
      read: false
    }]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
