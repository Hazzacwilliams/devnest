import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice'
import loginReducer from './slices/loginSlice';
import newPostReducer from './slices/newPostSlice';
import recievePostsReducer from './slices/recievePostsSlice';
import likesSliceReducer from './slices/likesSlice';
import getUserInfoReducer from './slices/getUserInfoSlice';
import commentReducer from './slices/commentsSlice';
import friendReducer from './slices/friendSlice';
import notificationReducer from './slices/notificationsSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        newPost: newPostReducer,
        posts: recievePostsReducer,
        likes: likesSliceReducer,
        user: getUserInfoReducer,
        comment: commentReducer,
        friend: friendReducer,
        notification: notificationReducer,
    },
});

export default store;