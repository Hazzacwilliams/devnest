import pool from "../config/dbConfig.js";

export const createNotification = async (userid, senderid, type, postid = null) => {
    try {
        const response = await pool.query('INSERT INTO notifications (userid, senderid, type, postid) VALUES ($1, $2, $3, $4)', [userid, senderid, type, postid]);
        return response.rows[0];
    } catch (err) {
        console.error(`Failed to create notification: ${err.message}`);
    }
};

export const getNotificationsByUserId = async (userid) => {
    try {
        const response = await pool.query('SELECT notifications.*, users.username FROM notifications LEFT JOIN users ON notifications.senderid = users.userid WHERE notifications.userid = $1', [userid]);
        return response.rows;
    } catch (err) {
        console.error(`Failed to fetch notifications for userid: ${userid}: ${err.message}`);
    }
}

export const updateNotificationStatus = async (notificationid) => {
    try {
        const response = await pool.query(`UPDATE notifications SET status = 'read' WHERE notificationid = $1`, [notificationid]);
        return response.rows[0];
    } catch (err) {
        console.error(`Unable to update notification to read: ${err.message}`);
    }
}