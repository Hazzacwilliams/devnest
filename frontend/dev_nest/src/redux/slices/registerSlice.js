import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'Failed to register');
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }

)

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default registerSlice.reducer;