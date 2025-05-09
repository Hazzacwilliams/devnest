import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk(
    'users/getUserInfo',
    async (userid, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}`, { headers: { "Authorization": `Bearer ${token}` } });
            if (!response.ok) {
                throw new Error(`Failed to reciever user info: ${response.statusText}`);
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateUserInfo = createAsyncThunk(
    'users/updateUserInfo',
    async ({ userid, userData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`Failed to update user: ${response.statusText}`);
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const getAllUserInfo = createAsyncThunk(
    'users/getAllUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, { headers: { "Authorization": `Bearer ${token}` } });
            if (!response.ok) {
                throw new Error(`Failed to get all users: ${response.statusText}`);
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const getUserInfoSlice = createSlice({
    name: "getUserInfo",
    initialState: {
        userInfo: null,
        allUserInfo: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetUserInfoState: (state) => {
            state.userInfo = null;
            state.allUserInfo = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = { ...state.userInfo, ...action.payload };
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.allUserInfo = action.payload;
            })
            .addCase(getAllUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default getUserInfoSlice.reducer;
export const { resetUserInfoState } = getUserInfoSlice.actions;
