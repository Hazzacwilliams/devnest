import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createNewPost = createAsyncThunk(
    'posts/createNewPost',
    async (formData, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            })
            console.log("API payload request", JSON.stringify(formData));
            if(!response.ok){
                throw new Error(`Failed to create post: ${response.statusText}`)
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
        
    }
)

const newPostSlice = createSlice({
    name: 'newPost',
    initialState: {
        post: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetNewPostState: (state) => {
            state.post = null;
            state.error = null;
            state.loading = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetNewPostState } = newPostSlice.actions
export default newPostSlice.reducer;