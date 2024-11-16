
import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';

const NotificationIndicator = () => {
  const context = useContext(NotificationContext);
  if (!context) return null;

  const { notifications } = context;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative inline-block">
      <span className="text-white hover:text-green-200 cursor-pointer">
        📬
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </span>
    </div>
  );
};

export default NotificationIndicator;