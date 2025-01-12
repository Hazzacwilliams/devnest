import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addLike = createAsyncThunk(
    'likes/addLike',
    async (postid, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/likes", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(postid),
            })
            if(!response.ok){
                throw new Error('Failed to like post: ', response.statusText)
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const addLikeSlice = createSlice({
    name: "addLike",
    initialState: {
        like: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
                    .addCase(addLike.pending, (state) => {
                        state.loading = true;
                        state.error = null;
                    })
                    .addCase(addLike.fulfilled, (state, action) => {
                        state.loading = false;
                        state.like = action.payload;
                    })
                    .addCase(addLike.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.payload;
                    })
    },
});

export default addLikeSlice.reducer;