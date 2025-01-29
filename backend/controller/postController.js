import * as postModel from '../models/postModels.js';

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        console.log("Do I fire once? - postController.")
        res.json(posts);
    } catch (err) {
        console.error(`Unable to fetch posts: ${err}`);
        res.status(500).json({ error: 'Failed to fetch posts!' });
    }
};

const getAllPostsByUserId = async (req, res) => {
    const { userid } = req.params;
    try {
        const postsByUserId = await postModel.getAllPostsByUserId(userid);
        return res.json(postsByUserId);
    } catch (err) {
        console.error(`Failed to fetch posts for user: ${err}`);
        res.status(500).json({ error: 'Failed to fetch posts for user.'});
    }
}

const createPost = async (req, res) => {
    const { posttitle, postdata } = req.body;
    console.log(`posttitle = ${posttitle} and postdata = ${postdata}`);
    const userid = req.session.userid;
    try {
        const newPost = await postModel.createPost(userid, posttitle, postdata);
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post!' });
    }
}

export {
    getAllPosts,
    getAllPostsByUserId,
    createPost
}