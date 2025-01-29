import * as commentModel from '../models/commentModel.js';

const addComment = async (req, res) => {
    const { postid, commentData} = req.body;
    const userid = req.session.userid;
    try{
        const addComment = await commentModel.addComment(userid, postid, commentData);
        console.log(addComment);
        if(!addComment){
            return res.status(404).json({ error: "Unable to add comment."})
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