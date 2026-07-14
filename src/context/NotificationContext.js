import React, { createContext, useState, useCallback, useRef } from 'react';

export const NotificationContext = createContext(null);

let _id = 0;

/**
 * NotificationProvider – toast notification system.
 *
 * Usage:
 *   const { notify } = useNotification();
 *   notify.success('Saved!');
 *   notify.error('Something went wrong.');
 *   notify.info('New message received.');
 *   notify.warning('Check your input.');
 */
export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts]   = useState([]);
  const timersRef             = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
  }, []);

  const push = useCallback((message, type = 'info', duration = 5000) => {
    const id = ++_id;
    setToasts((prev) => [...prev, { id, message, type }]);
    timersRef.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  const notify = {
    success: (msg, dur) => push(msg, 'success', dur),
    error:   (msg, dur) => push(msg, 'error',   dur ?? 8000),
    warning: (msg, dur) => push(msg, 'warning', dur),
    info:    (msg, dur) => push(msg, 'info',    dur),
  };

  return (
    <NotificationContext.Provider value={{ toasts, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
};
