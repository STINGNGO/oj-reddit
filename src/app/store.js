import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for posts
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions to be used in components
export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;

// Create and export the Redux store
export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer, // This is where you define your reducers
  },
});
