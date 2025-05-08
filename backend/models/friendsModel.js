import pool from "../config/dbConfig.js";

export const addFriend = async (userid1, userid2, status) => {
    try {
        const result = await pool.query('INSERT INTO friends_list (userid1, userid2, status) VALUES ($1, $2, $3) RETURNING *', [userid1, userid2, status]);
        return result.rows[0];
    } catch (err) {
        console.error(`Problem inserting new friendship into friendslist: ${err.message}`);
        throw err;
    }
};   

export const retrieveFriendRequests = async (userid) => {
    try {
        const result = await pool.query('SELECT friends_list.*, users.username FROM friends_list LEFT JOIN users ON friends_list.userid2 = users.userid  WHERE userid2 = $1 AND status = $2', [userid, 'p']);
        return result.rows;
    } catch (err) {
        console.error(`Problem retrieving friend requests for user: ${err.message}`);
        throw err;
    }
}

export const updateFriendRequest = async (friendshipid, statusUpdate) => {
    try {
        const result = await pool.query('UPDATE friends_list SET status = $1 WHERE friendshipid = $2 RETURNING *', [statusUpdate, friendshipid]);
        return result.rows[0];
    } catch (err) {
        console.error(`Problem altering friendship status! ${err.message}`);
        throw err;
    }
}

export const getAllFriends = async (userid) => {
    try {
        const result = await pool.query('SELECT * FROM friends_list WHERE userid1 = $1 OR userid2 = $1', [userid]);
        return result.rows;
    } catch (err) {
        console.error(`Problem retrieving ${userid}'s friend list. ${err.message}`);
        throw err;
    }
};