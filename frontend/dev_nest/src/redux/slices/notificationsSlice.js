import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getNotificationsByUserId = createAsyncThunk(
    "notifications/getNotificationsByUserId",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, { credentials: 'include' });
            if(!response.ok){
                throw new Error("Failed to fetch notifications");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateNotificationStatus = createAsyncThunk(
    "notifications/updateNotificationStatus",
    async(notificationid, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ notificationid }),
                credentials: 'include',
            })
            if(!response.ok){
                throw new Error("failed to update notification status");
            }
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        notification: null,
        allNotifications: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getNotificationsByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getNotificationsByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.allNotifications = action.payload;
        })
        .addCase(getNotificationsByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateNotificationStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateNotificationStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.notification = action.payload;
        })
        .addCase(updateNotificationStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default notificationSlice.reducer;