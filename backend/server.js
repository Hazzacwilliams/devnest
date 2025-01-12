import dotenv from 'dotenv';
import express from 'express';
import passport from './config/authConfig.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import sessionMiddleware from './config/sessionConfig.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
export default app;