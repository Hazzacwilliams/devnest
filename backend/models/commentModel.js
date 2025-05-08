import pool from "../config/dbConfig.js";

export const addComment = async (userid, postid, commentData) => {
    try {
        const result = await pool.query('INSERT INTO comments (userid, postid, commentdata) VALUES ($1, $2, $3) RETURNING *', [userid, postid, commentData]);
        return result.rows[0];
    } catch (err) {
        console.error(`Error inserting comment from ${userid} into post no. ${postid}. ${err.message}`);
        throw err;
    }
};

export const getAllComments = async () => {
    try {
        const result = await pool.query('SELECT comments.*, users.username FROM comments LEFT JOIN users ON comments.userid = users.userid');
        return result.rows;
    } catch (err) {
        console.error(`Unable to retrieve all comments: ${err.message}`);
        throw err;
    }
};