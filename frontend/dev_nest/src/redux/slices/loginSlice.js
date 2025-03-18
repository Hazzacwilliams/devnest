import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'Failed to login')
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state){
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;