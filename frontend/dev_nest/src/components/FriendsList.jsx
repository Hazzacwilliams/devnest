//Imports
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/friendsList.css";

function FriendsList({ allFriends, profileOwner, onClose }) {

    //Initializing Component
    const containerRef = useRef(null);
    const allUserInfo = useSelector((state) => state.user.allUserInfo);
    const [friendWithDetails, setFriendWithDetails] = useState([]);
    const navigate = useNavigate();

    //Checking if user owns profile, then filters friends based on accepted status and sorts them alphabetically
    useEffect(() => {
        if (!profileOwner) return;

        const profileOwnerFriends = allFriends.filter(
            (friend) => (friend.userid1 === profileOwner.userid || friend.userid2 === profileOwner.userid) && friend.status === 'a'
        );

        const detailedFriends = profileOwnerFriends.map((friend) => {
            const friendId = friend.userid1 === profileOwner.userid ? friend.userid2 : friend.userid1;
            const friendDetails = allUserInfo.find((user) => user.userid === friendId);
            return {
                ...friend,
                friendDetails,
            };
        });

        detailedFriends.sort((a, b) => {
            const nameA = (a.friendDetails?.name || "").toLowerCase();
            const nameB = (b.friendDetails?.name || "").toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        setFriendWithDetails(detailedFriends);
    }, [allFriends, profileOwner, allUserInfo]);

    //Allows the user to click outside of friendslist box to close it, rather than reclicking the friendslist button
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, [onClose]);

    //Navigates user to a profile if a name is clicked
    const handleClick = (userid) => {
        navigate(`/profile/${userid}`);
    }

    return (
        <div id="friendsList" ref={containerRef}>
            <h2>{profileOwner.name.toUpperCase()} FRIENDS LIST</h2>
            {friendWithDetails.map((friend) => (
                <div key={friend.friendshipid} id="friendName">
                    <span onClick={() => handleClick(friend.friendDetails.userid)}>{friend.friendDetails?.name.toUpperCase() || "Unknown user"}</span>
                </div>
            ))}
        </div>
    )
}

export default FriendsList;