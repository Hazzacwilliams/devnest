import pool from "../config/dbConfig.js";

export const getLikesByPostId = async (postid) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS count FROM likes WHERE postid = $1', [postid]);
        return parseInt(result.rows[0].count, 10);
    } catch (err) {
        console.error(`Error fetching like for ${postid}: ${err.message}`);
        throw err;
    }

}

export const addLike = async (userid, postid) => {
    try {
        const result = await pool.query('INSERT INTO likes (userid, postid) VALUES ($1, $2) RETURNING *', [userid, postid]);
        return result.rows[0];
    } catch (err) {
        console.error(`Error adding like to ${postid}: ${err.message}`);
        throw err;
    }

}

export const removeLike = async (userid, postid) => {
    try {
        const result = await pool.query('DELETE FROM likes WHERE userid = $1 AND postid = $2 RETURNING *', [userid, postid]);
        return result.rows[0];
    } catch (err) {
        console.error(`Error removing like from post ${postid}: ${err.message}`);
        throw err;
    }
}

export const getAllPostLikes = async () => {
    try {
        const result = await pool.query('SELECT postid, userid FROM likes');
        return result.rows;
    } catch (err) {
        console.error(`Error fetching likes for all posts: ${err.message}`);
        throw err;
    }
};