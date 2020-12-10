import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.postId;
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
      } else {
        console.log("Failed :: save comment.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <br />

      {/* Comment Lists */}

      {/* Root Comment From */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해주세요."
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;