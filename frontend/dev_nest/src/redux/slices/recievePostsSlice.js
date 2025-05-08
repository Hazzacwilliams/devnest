import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk to fetch all posts
export const receivePosts = createAsyncThunk(
    'posts/receivePosts',
    async (userid, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const url = userid
            ? `${process.env.REACT_APP_BACKEND_URL}/posts/${userid}`
            : `${process.env.REACT_APP_BACKEND_URL}/posts`;
            
            const startTime = Date.now();
            const response = await fetch(url, { 
                headers: { "Authorization": `Bearer ${token}` },
                cache: 'no-store' 
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.statusText}`);
            }
            const data = await response.json();

            const elapsed = Date.now() - startTime;
            if(elapsed < 2000) {
                await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
            }
            return data;
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
    reducers: {
        resetPostsState: (state) => {
            state.posts = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(receivePosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(receivePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(receivePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default postsSlice.reducer;
export const { resetPostsState } = postsSlice.actions;
