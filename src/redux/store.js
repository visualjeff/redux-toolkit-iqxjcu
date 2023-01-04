import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import NotificationsReducer from './notificationsSlice';
import { sampleApi } from '../services/sampleApiSlice';

export const store = configureStore({
  reducer: {
    NotificationsReducer,
    [sampleApi.reducerPath]: sampleApi.reducer,
  },
  // To disable the immutableCheck if necessary.  If actions take more than 32ms
  // then warnings will be printed.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: () => process.env.NODE_ENV !== 'production',
    }).prepend(sampleApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

/*
store.subscribe(() => {
  console.log(`store current state: ${JSON.stringify(store.getState())}`);
});
*/

// setupListeners(store.dispatch);
