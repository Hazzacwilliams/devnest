import React, { useState } from "react";

const FetchAllLikes = async () => {

    const [likes, setLikes] = useState({});

    const response = await fetch("http://localhost:3000/likes/all");
    const data = await response.json();

    // Transform data into a dictionary for easy access
    const likesMap = data.reduce((acc, like) => {
        acc[like.postid] = like.count;
        return acc;
    }, {});

    setLikes(likesMap);

    return likes;
};

export default FetchAllLikes;