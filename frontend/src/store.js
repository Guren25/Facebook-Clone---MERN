import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authslice';
import postReducer from './features/post/postslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
