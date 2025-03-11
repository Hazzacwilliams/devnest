import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function FriendsList ({ allFriends, profileOwner }) {

    const allUserInfo = useSelector((state) => state.user.allUserInfo);
    const [friendWithDetails, setFriendWithDetails] = useState([]);

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

        setFriendWithDetails(detailedFriends);
    }, [allFriends, profileOwner, allUserInfo]);
    

    return (
        <div id="friendsList">
            <h2>{profileOwner.username}'s Friends!</h2>
            {friendWithDetails.map((friend) => (
                <div key={friend.friendshipid}>
                    <span>{friend.friendDetails?.username || "Unknown user"}</span>
                </div>
            ))}
        </div>
    )
}

export default FriendsList;