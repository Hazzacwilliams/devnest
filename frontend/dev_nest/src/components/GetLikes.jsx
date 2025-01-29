import React from "react";

function GetLikes({ likesCount }) {
    return (
        <div>
            <p>{likesCount || 0}</p>
        </div>
    );
}

export default GetLikes;
