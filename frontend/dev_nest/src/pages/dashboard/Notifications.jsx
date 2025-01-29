import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveFriendRequests, updateFriendRequest } from "../../redux/slices/friendSlice";
import '../../styles/notifications.css';
import notificationIcon from '../../assets/navbar/notification.png';

function Notifications() {

    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useDispatch();
    const { friendRequests } = useSelector((state) => state.friend);

    useEffect(() => {
        dispatch(retrieveFriendRequests());
    }, [dispatch]);

    const handleClick = () => {
        if(!isClicked){
            setIsClicked(true);
        } else {
            setIsClicked(false);
        }
    };

    const handleFriendRequestResponse = (friendshipid, statusUpdate) => {
        dispatch(updateFriendRequest({ friendshipid, statusUpdate }));
        dispatch(retrieveFriendRequests());
    }

    return (
        <div>
            <button id="notificationsContainer" onClick={handleClick}>
                <img id="notificationIcon" src={notificationIcon} />
                <span id="notificationNumber">{friendRequests.length}</span>
            </button>
            {isClicked &&
            <div id="viewNotifications">
                {friendRequests.map((request) => (
                    <div key={request.friendshipid}>
                        <span>{request.username} wants to add you! </span>
                        <button id="acceptButton" onClick={() => handleFriendRequestResponse(request.friendshipid, 'a')}>ACCEPT</button>
                        <button onClick={() => handleFriendRequestResponse(request.friendshipid, 'r')}>DECLINE</button>
                    </div>
                ))}
            </div>
            }
        </div>
    )
};

export default Notifications;