import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding a like
export const addLike = createAsyncThunk(
  "likes/addLike",
  async ({ postid, userid }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postid, userid }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to add like");
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//Async think for removing a like
export const removeLike = createAsyncThunk(
  'likes/removeLike',
  async ({ postid }, { rejectWithValue }) => {
    console.log(`postid inside removeLike is ${postid}`);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/${postid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      })
      if(!response.ok) {
        throw new Error("Failed to unlike");
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

// Async thunk for fetching likes for a specific post
export const getLikes = createAsyncThunk(
  "likes/getLikes",
  async (postid, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes?postid=${postid}`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error("Failed to fetch likes for the post");
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for fetching all likes
export const fetchAllLikes = createAsyncThunk(
  "likes/fetchAllLikes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/all`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error("Failed to fetch all likes");
      }
      const data = await response.json();

      // Store an array of user IDs for each post instead of just a count
      return data.reduce((acc, like) => {
        const { postid, userid } = like; 

        if (!acc[postid]) {
          acc[postid] = []; // Initialize array for users who liked the post
        }
        acc[postid].push({ userid }); // Push each userid who liked the post
        return acc;
      }, {});
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Combined slice
const likesSlice = createSlice({
  name: "likes",
  initialState: {
    like: null, // For addLike
    likesCount: null, // For getLikes
    allLikes: {}, // For fetchAllLikes
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Like
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
      // Remove Like
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.like = action.payload;
      })
      // Get Likes for a Specific Post
      .addCase(getLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likesCount = action.payload.likes; 
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Likes
      .addCase(fetchAllLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.allLikes = action.payload; 
      })
      .addCase(fetchAllLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likesSlice.reducer;
