import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/NavBar";
import PostData from "../dashboard/PostData";
import FriendsList from "../../components/FriendsList";
import { getUserInfo } from "../../redux/slices/getUserInfoSlice";
import profileImg from '../../assets/navbar/profile.png';
import '../../styles/profile.css';
import { useParams } from "react-router-dom";
import { addFriend, getAllFriends } from "../../redux/slices/friendSlice";


function Profile() {

    const { userid } = useParams();
    const [profileType, setProfileType] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.login.user);
    const allUsers = useSelector((state) => state.user.allUserInfo) || [];
    const allFriends = useSelector((state) => state.friend.allFriends) || [];

    const user = userid ?
        allUsers.find((u) => u.userid === parseInt(userid, 10))
        : loggedInUser;

    const dOrP = "profile";

    const determineProfileType = () => {
        if (user) {
            if (user === loggedInUser) {
                setProfileType("userProfile");
            } else {
                setProfileType("foreignProfile");
            }
        }
    };

    useEffect(() => {
        determineProfileType();
        dispatch(getAllFriends());
        dispatch(getUserInfo());
    }, [user, loggedInUser, dispatch]);

    const addFriendFunc = (userid2, status) => {
        dispatch(addFriend({ userid2, status }));
    }

    const isFriendRequestPending = allFriends.some(
        (friend) =>
            (friend.userid1 === loggedInUser.userid && friend.userid2 === user.userid && friend.status === "p") ||
            (friend.userid2 === loggedInUser.userid && friend.userid1 === user.userid && friend.status === "p")
    );

    const isAlreadyFriend = allFriends.some(
        (friend) =>
            (friend.userid1 === loggedInUser.userid && friend.userid2 === user.userid && friend.status === "a") ||
            (friend.userid2 === loggedInUser.userid && friend.userid1 === user.userid && friend.status === "a")
    );

    if (!user) {
        return <p>User not found</p>
    }



    return (
        <div id="profileContainer">
            <NavBar id="profileNavBar" />
            <div id="profileHeader">
                <div id="profileImgContainer">
                    <img
                        src={user.profilepic_url || profileImg}
                        alt="profileImg"
                        id="profileImg"
                    />
                </div>
                <div id="profileInfo">
                    <h2>{user.name}</h2>
                    <h3>@{user.username}</h3>
                    <span>{user.region}</span>

                    {profileType === 'foreignProfile' && !isFriendRequestPending && !isAlreadyFriend && (
                        <button onClick={() => addFriendFunc(userid, "p")}>Add User</button>
                    )}
                    {profileType === 'foreignProfile' && isFriendRequestPending && (
                        <span>Friend request pending...</span>
                    )}
                    {profileType === 'foreignProfile' && isAlreadyFriend && (
                        <span>Already friends!</span>
                    )}
                    {profileType === "userProfile" && (
                        <button onClick={() => setIsClicked(!isClicked)}>
                            Friends: {allFriends.filter(
                                friend => friend.userid1 === user.userid || friend.userid2 === user.userid
                            ).length}
                        </button>
                    )}
                </div>
            </div>
            {isClicked &&
                <FriendsList allFriends={allFriends} profileOwner={user} />
            }
            <div id="yourPostsContainer">
                <PostData dOrP={dOrP} userid={user.userid} />
            </div>
        </div>

    )
};

export default Profile;