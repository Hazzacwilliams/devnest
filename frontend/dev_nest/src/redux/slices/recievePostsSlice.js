import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk to fetch all posts
export const recievePosts = createAsyncThunk(
    'posts/recievePosts',
    async (userid, { rejectWithValue }) => {
        try {
            const url = userid
            ? `http://localhost:3000/posts?userid=${userid}`
            : 'http://localhost:3000/posts';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.statusText}`);
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(recievePosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recievePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(recievePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default postsSlice.reducer;
