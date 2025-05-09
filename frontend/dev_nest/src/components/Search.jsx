//Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserInfo } from "../redux/slices/getUserInfoSlice";
import "../styles/search.css";
import { useNavigate } from "react-router-dom";

function Search() {

    //Initializing Component
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUserInfo, loading, error } = useSelector((state) => state.user);

    // Fetch all user info when the component mounts
    useEffect(() => {
        dispatch(getAllUserInfo());
    }, [dispatch]);

    // Filter users dynamically as the search term changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredUsers([]);
        } else {
            const results = allUserInfo.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(results);
        }
    }, [searchTerm, allUserInfo]);

    const handleInput = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUserClick = (userid) => {
        navigate(`/profile/${userid}`);
    }

    return (
        <div id="searchContainer">
            <input
                type="text"
                id="searchBar"
                placeholder="FIND FRIENDS"
                value={searchTerm}
                onChange={handleInput}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching user data: {error}</p>}
            <div id="filteredResultsContainer">
                {filteredUsers.map((user) => (
                    <p key={user.userid} id="filteredResults" onClick={() => handleUserClick(user.userid)}>
                        <strong>{user.name}</strong> ({user.username})
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Search;
