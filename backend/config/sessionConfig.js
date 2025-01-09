import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

//Set up express-session
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === ' production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
});

export default sessionMiddleware;