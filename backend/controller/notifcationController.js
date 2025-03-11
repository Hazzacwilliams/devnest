import * as notificationModel from '../models/notificationModel.js';

const getNotificationsByUserId = async (req, res) => {
    const userid = req.session.userid;
    try {
        const getNotificationsByUserId = await notificationModel.getNotificationsByUserId(userid);
        return res.status(200).json(getNotificationsByUserId);
    } catch (err) {
        console.error(`Unable to get notifications for user: ${err}`);
        res.status(500).json({ error: "Unable to fetch notifications" });
    }
}

const updateNotificationStatus = async (req, res) => {
    const { notificationid } = req.body;
    try {
        const updateNotificationStatus = await notificationModel.updateNotificationStatus(notificationid);
        return res.status(200).json(updateNotificationStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Unable to update notification status: ${err}`});
    }
}

export {
    getNotificationsByUserId,
    updateNotificationStatus
}