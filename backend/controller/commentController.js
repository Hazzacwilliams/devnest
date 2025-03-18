import * as commentModel from '../models/commentModel.js';
import * as postModel from '../models/postModels.js';
import * as notificationModel from '../models/notificationModel.js';

const addComment = async (req, res) => {
    const { postid, commentData} = req.body;
    const userid = req.user.userid;
    try{
        const addComment = await commentModel.addComment(userid, postid, commentData);
        if(!addComment){
            return res.status(404).json({ error: "Unable to add comment."})
        }
        const post = await postModel.getPostById(postid);
        if(post.userid !== userid){
            await notificationModel.createNotification(post.userid, userid, 'comment', postid);
        }
        return res.status(201).json(addComment);
    } catch (err) {
        console.error(`Unable to add comment: ${err}`);
        res.status(500).json({ error: 'Failed to add comment' });
    }
}

const getAllComments = async (req, res) => {
    try {
        const allComments = await commentModel.getAllComments();
        return res.json(allComments);
    } catch (err) {
        console.error(`Unable to fetch all comments: ${err}`);
        res.status(500).json({ error: "Unable to fetch all comments" });
    }
    
}

export {
    addComment,
    getAllComments
};