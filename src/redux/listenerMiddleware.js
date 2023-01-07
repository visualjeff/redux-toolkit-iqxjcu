import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addNotificationsListeners } from './notificationsSlice';

export const listenerMiddleware = createListenerMiddleware();

// Add listeners from slices
addNotificationsListeners(listenerMiddleware.startListening);
