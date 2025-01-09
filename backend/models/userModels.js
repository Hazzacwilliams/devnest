import pool from '../config/dbConfig.js';

export const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
}

export const createUser = async (username, email, name, mobile, region, password) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, name, mobile, region, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [username, email, name, mobile, region, password]
    );
    return result.rows[0];
}

export const updateUser = async (userID, username, email, name, mobile, region, password) => {
    const result = await pool.query(
        `UPDATE users
        SET username = $1, email = $2, name = $3, mobile = $4, region = $5, password = $6
        WHERE userID = $7
        RETURNING *
        `,
        [username, email, name, mobile, region, password, userID] 
    );
    return result.rows[0];
}

export const deleteUser = async (userID) => {
    const result = await pool.query(
        `DELETE FROM users WHERE userID = $1 RETURNING *`,
        [userID]
    );
    return result.rows[0];
}

export const getUserById = async (userID) => {
    const result = await pool.query('SELECT * FROM users WHERE userID = $1', [userID]);
    return result.rows[0];
}

export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}