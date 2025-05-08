import pool from "../config/dbConfig.js";

export const getAllPosts = async () => {
    try {
        const result = await pool.query('SELECT multimedia_posts.*, users.username FROM multimedia_posts LEFT JOIN users ON multimedia_posts.userid = users.userid');
        return result.rows;
    } catch (err) {
        console.error(`Unable to get all posts. ${err.message}`);
        throw err;
    }
}

export const getAllPostsByUserId = async (userid) => {
    try {
        const result = await pool.query('SELECT * FROM multimedia_posts WHERE userid = $1', [userid]);
        return result.rows;
    } catch (err) {
        console.error(`Unable to fetch all posts for ${userid}. ${err.message}`);
        throw err;
    }
}

export const createPost = async (userid, posttitle, postdata, postmedia) => {
    try {
        const result = await pool.query(
            `INSERT INTO multimedia_posts (userid, postdata, posttitle, postmedia) VALUES ($1, $2, $3, $4) RETURNING *`,
            [userid, postdata, posttitle, postmedia]
        );
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to create post! ${err.message}`);
        throw err;
    }
}

export const getPostById = async (postid) => {
    try {
        const result = await pool.query('SELECT * FROM multimedia_posts WHERE postid = $1', [postid]);
        return result.rows[0];
    } catch (err) {
        console.error(`Unable to get post by id. ${err.message}`);
        throw err;
    }
}