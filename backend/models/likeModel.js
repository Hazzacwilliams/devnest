import pool from "../config/dbConfig.js";

export const getLikesByPostId = async (postid) => {
    const result = await pool.query('SELECT COUNT(*) FROM likes WHERE postid = $1', [postid]);
    return result.rows;
}

export const addLike = async (userid, postid) => {
    const result = await pool.query('INSERT INTO likes (userid, postid) VALUES ($1, $2) RETURNING *', [userid, postid]); 
    return result.rows[0];
}