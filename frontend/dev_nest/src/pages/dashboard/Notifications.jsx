import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends, updateFriendRequest } from "../../redux/slices/friendSlice";
import '../../styles/notifications.css';
import notificationIcon from '../../assets/navbar/notification.png';
import { getNotificationsByUserId, updateNotificationStatus } from "../../redux/slices/notificationsSlice";

const Notifications = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();

    const { allNotifications } = useSelector((state) => state.notification);
    const { allFriends } = useSelector((state) => state.friend);

    useEffect(() => {
        dispatch(getNotificationsByUserId());
    }, [dispatch, allNotifications]);

    const handleClick = () => {
        setIsClicked(!isClicked);

        if (isClicked) {
            // Only mark notifications as read when opening the popup
            const unreadNotificationIds = allNotifications
                .filter(notification => !notification.read && notification.type !== "friendRequest")
                .map(notification => notification.notificationid);

            unreadNotificationIds.forEach(notificationId => {
                dispatch(updateNotificationStatus(notificationId));
            });

            // Re-fetch updated notifications
            dispatch(getNotificationsByUserId());
        }
    };


    const handleFriendRequestResponse = (notification, statusUpdate) => {
        const friendship = allFriends.find(
            (friend) =>
                (friend.userid1 === notification.senderid && friend.userid2 === notification.userid) ||
                (friend.userid2 === notification.senderid && friend.userid1 === notification.userid)
        );

        if (!friendship) {
            console.error("Friendship not found for notification:", notification);
            return;
        }

        dispatch(updateFriendRequest({ friendshipid: friendship.friendshipid, statusUpdate }))
            .then(() => {
                dispatch(getNotificationsByUserId());
                dispatch(getAllFriends());
            });

        dispatch(updateNotificationStatus(notification.notificationid));
    };


    const unreadNotifications = allNotifications
        .filter(notification => notification.status === 'unread')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const readNotifications = allNotifications
        .filter(notification => notification.status === 'read')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const displayedReadNotifications = showAll ? readNotifications : readNotifications.slice(0, 5);

    return (
        <div>
            <button id="notificationsContainer" onClick={handleClick}>
                <img id="notificationIcon" src={notificationIcon} />
                <span id="notificationNumber">{unreadNotifications.length}</span>
            </button>

            {isClicked && (
                <div id="viewNotifications">
                    {/* NEW NOTIFICATIONS (Unread) */}
                    <div className="notification-section">
                        <h3>New Notifications</h3>
                        {unreadNotifications.length === 0 ? (
                            <p>No new notifications</p>
                        ) : (
                            unreadNotifications.map(notification => (
                                <div key={notification.notificationid} className="notification unread">
                                    {notification.type === "friendRequest" && notification.status === "unread" && (
                                        <span>{notification.username} wants to add you!
                                            <span>
                                                <button onClick={() => handleFriendRequestResponse(notification, "a")}>ACCEPT</button>
                                                <button onClick={() => handleFriendRequestResponse(notification, "d")}>DECLINE</button>
                                            </span>
                                        </span>
                                    )}
                                    {notification.type === "like" && (
                                        <span>{notification.username} liked your post</span>
                                    )}
                                    {notification.type === "comment" && (
                                        <span>{notification.username} commented on your post</span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* SEEN NOTIFICATIONS (Read) */}
                    <div className="notification-section">
                        <div className={`notification-section ${showAll ? 'scrollable' : ''}`}>
                            <h3>Previously Seen</h3>
                            {readNotifications.length === 0 ? (
                                <p>No previous notifications</p>
                            ) : (
                                displayedReadNotifications.map(notification => (
                                    <div key={notification.notificationid} className="notification read">
                                        {notification.type === "friendRequest" && (
                                            <span>{notification.username} sent you a friend request!</span>
                                        )}

                                        {notification.type === "like" && (
                                            <span>{notification.username} liked your post</span>
                                        )}
                                        {notification.type === "comment" && (
                                            <span>{notification.username} commented on your post</span>
                                        )}
                                    </div>
                                ))
                            )}
                            {readNotifications.length > 5 && (
                                <button onClick={() => setShowAll(!showAll)}>
                                    {showAll ? "Show Less" : "Show All"}
                                </button>
                            )}
                        </div>


                    </div>
                </div>
            )}
        </div>

    );
};

export default Notifications;


