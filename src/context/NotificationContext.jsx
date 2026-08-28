import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [permission, setPermission] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const requestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        setPermission(res);
        return res === 'granted';
      } catch (err) {
        console.error('Permission request failed', err);
        return false;
      }
    }
    return false;
  };

  const sendNotification = (title, body, icon = '/favicon.ico') => {
    if (permission === 'granted' && typeof window !== 'undefined' && 'Notification' in window) {
      new Notification(title, { body, icon });
    }
  };

  return (
    <NotificationContext.Provider value={{ permission, requestPermission, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
