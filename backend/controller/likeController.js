import * as likeModel from '../models/likeModel.js';

const getLikesByPostId = async (req, res) => {

    const { postid } = req.body;
    try{
        const likes = await likeModel.getLikesByPostId(postid);
        res.json(likes);
    } catch (err) {
        console.error("Unable to fetch number of likes: ", err);
        res.status(500).json({ error: "Failed to fetch likes" });
    }
};

const addLike = async (req, res) => {
    const { postid } = req.body;
    const userid = req.session.userid;
    try{
        const addLike = await likeModel.addLike(userid, postid);
        res.status(201).json(addLike);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to like post' });
    }
}

export {
    getLikesByPostId,
    addLike
};