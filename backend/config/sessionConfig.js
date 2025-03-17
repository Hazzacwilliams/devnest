import session from 'express-session';
import pgSession from 'connect-pg-simple';
import pool from './dbConfig.js';

const PgSession = pgSession(session);

const sessionMiddleware = session({
  store: new PgSession({
    pool, // your PostgreSQL connection pool
    tableName: 'user_sessions', // table that will store sessions
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // use HTTPS in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day, adjust if needed
  }
});

export default sessionMiddleware;
