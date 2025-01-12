import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice'
import loginReducer from './slices/loginSlice';
import newPostReducer from './slices/newPostSlice';
import recievePostsReducer from './slices/recievePostsSlice';
import addLikeReducer from './slices/addLikeSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        newPost: newPostReducer,
        posts: recievePostsReducer,
        likes: addLikeReducer
    },
});

export default store;