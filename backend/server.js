import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import passport from './config/authConfig.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import commentRoute from './routes/commentRoute.js';
import friendRoute from './routes/friendRoute.js';
import sessionMiddleware from './config/sessionConfig.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Serve static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Middleware
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoute);
app.use('/friends', friendRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
export default app;