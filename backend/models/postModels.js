import pool from "../config/dbConfig.js";

export const getAllPosts = async() => {
    const result = await pool.query('SELECT multimedia_posts.*, users.username FROM multimedia_posts LEFT JOIN users ON multimedia_posts.userid = users.userid');
    return result.rows;
}

export const getAllPostsByUserId = async(userid) => {
    const result = await pool.query(
        'SELECT * FROM multimedia_posts WHERE userid = $1', [userid]
    );
    return result.rows;
}

export const createPost = async (userid, posttitle, postdata) => {
    const result = await pool.query(
        `INSERT INTO multimedia_posts (userid, postdata, posttitle) VALUES ($1, $2, $3) RETURNING *`,
        [userid, postdata, posttitle]
    );
    return result.rows[0];
}