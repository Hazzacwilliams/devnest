import * as likeModel from '../models/likeModel.js';
import * as postModel from '../models/postModels.js';
import * as notificationModel from '../models/notificationModel.js';

const getLikesByPostId = async (req, res) => {
    const { postid } = req.query;
    try{
        const likes = await likeModel.getLikesByPostId(postid);
        if(!likes){
            return res.status(404).json({ error: "No likes found for this post."});
        }
        res.json({ likes: likes });
    } catch (err) {
        console.error("Unable to fetch number of likes: ", err);
        res.status(500).json({ error: "Failed to fetch likes" });
    }
};

const addLike = async (req, res) => {
    const { postid } = req.body;
    const userid = req.user.userid;
    try{
        const addLike = await likeModel.addLike(userid, postid);
        const post = await postModel.getPostById(postid);
        if(post.userid !== userid){
            await notificationModel.createNotification(post.userid, userid, 'like', postid);
        }
        res.status(201).json(addLike);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to like post' });
    }
}

const removeLike = async (req, res) => {
    const { postid } = req.params;
    const userid = req.user.userid;
    try {
        const removeLike = await likeModel.removeLike(userid, postid);
        res.status(201).json(removeLike);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to unlike post" });
    }
}

const getAllPostLikes = async (req, res) => {
    try{
        const getAllPostLikes = await likeModel.getAllPostLikes();
        res.status(201).json(getAllPostLikes);
    } catch (err) {
        console.error(`Failed to get all likes for post: ${err}`);
        res.status(500).json({ error: 'Failed to fetch likes for post'});
    }
}



export {
    getLikesByPostId,
    addLike,
    removeLike,
    getAllPostLikes
};