import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice'
import loginReducer from './slices/loginSlice';
import newPostReducer from './slices/newPostSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        newPost: newPostReducer
    },
});

export default store;