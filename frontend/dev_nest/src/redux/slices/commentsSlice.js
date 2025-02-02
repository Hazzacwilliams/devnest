import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addComment = createAsyncThunk(
    "comments/addComments",
    async ({ postid, commentData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/comments`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postid, commentData }),
            })
            if (!response.ok) {
                throw new Error("Failed to add comment");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    } 
);

export const getAllComments = createAsyncThunk(
    "comments/getAllComments",
    async(_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/comments`);
            if(!response) {
                throw new Error(`Failed to retrieve all comments.`);
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        comment: null,
        allComments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addComment.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comment = action.payload;
        })
        .addCase(addComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllComments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllComments.fulfilled, (state, action) => {
            state.loading = false;
            state.allComments = action.payload;
        })
        .addCase(getAllComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default commentSlice.reducer;