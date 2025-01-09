import dotenv from 'dotenv';
import express from 'express';
import pkg from 'pg';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true'
});

//Middleware
app.use(express.json());

//Routes
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
export { app, pool };