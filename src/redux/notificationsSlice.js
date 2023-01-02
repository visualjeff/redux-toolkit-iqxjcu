import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Action
    messageCreated: (state, action) => {
      state.message = action.payload;
      console.log(`Notification: ${state.message}`);
    },
  },
});

// Action creators are generated for each case reducer function
export const { messageCreated } = notificationsSlice.actions;

export default notificationsSlice.reducer;
