import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import passport from './config/authConfig.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import commentRoute from './routes/commentRoute.js';
import friendRoute from './routes/friendRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import sessionMiddleware from './config/sessionConfig.js';
import bodyParser from "body-parser";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Serve static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: 'https://devnest-frontend.onrender.com',  
    credentials: true 
  }));

//Middleware
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/posts")) {
        next(); // Skip JSON parsing for /posts (handled by Multer)
    } else {
        express.json({ limit: "50mb" })(req, res, next);
    }
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());



//Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoute);
app.use('/friends', friendRoute);
app.use('/notifications', notificationRoute);


app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack || err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  });
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
export default app;