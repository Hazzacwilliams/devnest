import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice'
import loginReducer from './slices/loginSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer
    },
});

export default store;