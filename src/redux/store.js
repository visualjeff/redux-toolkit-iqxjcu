import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import NotificationsReducer from './notificationsSlice';
import { sampleApi } from '../services/sampleApiSlice';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer: {
    NotificationsReducer,
    [sampleApi.reducerPath]: sampleApi.reducer,
  },
  // To disable the immutableCheck if necessary.  If actions take more than 32ms
  // then warnings will be printed.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // Disable middleware for production
      immutableCheck: () => process.env.NODE_ENV !== 'production',
      serializableCheck: {
        ignoreState: () => process.env.NODE_ENV !== 'production',
        ignoreActions: () => process.env.NODE_ENV !== 'production',
      },
    }).prepend(sampleApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

/*
store.subscribe(() => {
  console.log(`store current state: ${JSON.stringify(store.getState())}`);
});
*/

// Configure listeners with recommended defaults for refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);
