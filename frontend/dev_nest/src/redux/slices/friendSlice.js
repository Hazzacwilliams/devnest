import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addFriend = createAsyncThunk(
    'friends/addFriend',
    async ({ userid2, status }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`userid2 and status are: ${userid2}, ${status}`);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userid2, status }),
                credentials: 'include',
            })
            if(!response.ok){
                throw new Error("Failed to add friend");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const retrieveFriendRequests = createAsyncThunk(
    'friends/retrieveFriendRequests',
    async (_, { rejectWithValue }) => {
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends`, { headers: { "Authorization": `Bearer ${token}` } });
            if(!response.ok){
                throw new Error("Failed to retrieve friend requests.");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateFriendRequest = createAsyncThunk(
    'friends/updateFriendRequest',
    async ({ friendshipid, statusUpdate }, { rejectWithValue }) => {
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ friendshipid, statusUpdate}),
                credentials: 'include',
            }) 
            if(!response.ok) {
                throw new Error("Failed to update friendrequest!");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }  
    }
);

export const getAllFriends = createAsyncThunk(
    'friends/getAllFriends',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Token in friends is: ${token}`);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/getFriends`, { headers: { "Authorization": `Bearer ${token}` } });
            if(!response.ok){
                throw new Error("Failed to fetch friends list");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const friendSlice = createSlice({
    name: "friends",
    initialState: {
        friend: null,
        friendRequests: [],
        requestUpdate: [],
        allFriends: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addFriend.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addFriend.fulfilled, (state, action) => {
            state.loading = false;
            state.friend = action.payload;
        })
        .addCase(addFriend.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(retrieveFriendRequests.fulfilled, (state, action) => {
            state.friendRequests = action.payload;
        })
        .addCase(updateFriendRequest.fulfilled, (state, action) => {
            state.requestUpdate = action.payload;
        })
        .addCase(getAllFriends.fulfilled, (state, action) => {
            state.allFriends = action.payload;
        })
    }
});

export default friendSlice.reducer;