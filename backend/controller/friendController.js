import * as friendsModel from '../models/friendsModel.js';

const addFriend = async (req, res) => {
    const { userid2, status } = req.body; 
    const userid1 = req.session.userid;
    try {
        const addFriend = await friendsModel.addFriend(userid1, userid2, status);
        if(!addFriend){
            return res.status(404).json({ error: "Unable to add friend" });
        }
        return res.status(201).json(addFriend);
    } catch (err) {
        console.error(`Unable to add friend: ${err}`);
        res.status(500).json({ error: "Unable to add friend" });
    }

};

const retrieveFriendRequests = async (req, res) => {
    const userid = req.session.userid;
    try {
        const retrieveFriendRequests = await friendsModel.retrieveFriendRequests(userid);
        if(!retrieveFriendRequests) {
            return res.status(404).json({ error: "Unable to fetch friend requests" });
        }
        return res.status(201).json(retrieveFriendRequests);
    } catch (err) {
        console.error(`Unable to fetch friend requests: ${err}`);
        res.status(500).json({ error: "Unable to fetch friend requests!"});
    }
};

const updateFriendRequest = async (req, res) => {
    const { friendshipid, statusUpdate } = req.body;
    try {
        const updateFriendRequest = await friendsModel.updateFriendRequest(friendshipid, statusUpdate);
        if(!updateFriendRequest){
            return res.status(404).json({ error: "Unable to alter friendship status"})
        }
        return res.status(201).json(updateFriendRequest);
    } catch (err) {
        console.error(`Unable to update friendship status: ${err}`);
        res.status(500).json({ error: "Unable to update friendship status" });
    }
}

const getAllFriends = async (req, res) => {
    const userid = req.session.userid;
    try {
        const getAllFriends = await friendsModel.getAllFriends(userid);
        if(!getAllFriends) {
            return res.status(404).json({ error: "Unable to fetch friends!" });
        }
        return res.status(200).json(getAllFriends);
    } catch (err) {
        console.error(`Unable to retrieve users friends list: ${err}`);
        res.status(500).json({ error: "Unable to retrieve users friend list" });
    }
}

export {
    addFriend,
    retrieveFriendRequests,
    updateFriendRequest,
    getAllFriends
};