import pool from '../config/dbConfig.js';

export const getAllUsers = async () => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        return result.rows;
    } catch (err) {
        console.error(`Unable to get all users. ${err.message}`);
        throw err;
    }
}

export const createUser = async (username, email, name, mobile, region, password) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, name, mobile, region, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, email, name, mobile, region, password]
        );
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to create new user! ${err.message}`);
        throw err;
    }
}

export const updateUser = async (userID, username, email, name, mobile, region, password) => {
    try {
        const result = await pool.query(
            `UPDATE users
        SET username = $1, email = $2, name = $3, mobile = $4, region = $5, password = $6
        WHERE userid = $7
        RETURNING *
        `,
            [username, email, name, mobile, region, password, userID]
        );
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to update user: ${userID}. ${err.message}`);
        throw err;
    }
}

export const deleteUser = async (userID) => {
    try {
        const result = await pool.query(
            `DELETE FROM users WHERE userid = $1 RETURNING *`,
            [userID]
        );
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to delete user ${userID}. ${err.message}`);
        throw err;
    }
}

export const getUserById = async (userID) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE userid = $1', [userID]);
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to get user by id: ${userID}. ${err.message}`);
        throw err;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to get user by email: ${email}. ${err.message}`);
        throw err;
    }
}

export const updateUserProfilePicture = async (userID, profilePictureUrl) => {
    try {
        const result = await pool.query('UPDATE users SET profilepic_url = $1 WHERE userid = $2 RETURNING *', [profilePictureUrl, userID]);
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to update user profile picture: ${userID}. ${err.message}`);
        throw err;
    }
}