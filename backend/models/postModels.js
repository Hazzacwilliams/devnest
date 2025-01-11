import pool from "../config/dbConfig.js";

export const getAllPosts = async() => {
    const result = await pool.query('SELECT * FROM multimedia_posts');
    return result.rows;
}

export const createPost = async (userid, posttitle, postdata) => {
    const result = await pool.query(
        `INSERT INTO multimedia_posts (userid, postdata, posttitle) VALUES ($1, $2, $3) RETURNING *`,
        [userid, postdata, posttitle]
    );
    return result.rows[0];
}