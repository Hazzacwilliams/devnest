import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import commentRoute from './routes/commentRoute.js';
import friendRoute from './routes/friendRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import bodyParser from "body-parser";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const allowedOrigins = [
  'http://localhost:3000',
  'https://devnest-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
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



//Routes
app.use('/login', authRoute);
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