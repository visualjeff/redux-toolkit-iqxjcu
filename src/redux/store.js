import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listenerMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query';
import NotificationsReducer, { messageCreated } from './notificationsSlice';
import CounterReducer from './counterSlice';
import { sampleApi } from '../services/sampleApiSlice';

export const store = configureStore({
  reducer: {
    CounterReducer,
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
