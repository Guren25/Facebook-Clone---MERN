import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post('http://localhost:5000/api/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

const postslice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export default postslice.reducer;
