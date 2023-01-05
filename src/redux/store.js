import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import NotificationsReducer, { messageCreated } from './notificationsSlice';
import { sampleApi } from '../services/sampleApiSlice';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Just to test listeners.  When the Notifcation.messageCreated action fires this
// Listener will log a message.
listenerMiddleware.startListening({
  matcher: isAnyOf(messageCreated),
  effect: (action, listenerApi) => {
    console.log('Listener API fired effect');
  },
});

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
    })
      .prepend(sampleApi.middleware)
      .prepend(listenerMiddleware.middleware);
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
