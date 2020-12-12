import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const PostDetails = () => {
  const [post, setPost] = useState();
  const [favorited, isFavorited] = useState(false);
  const params = useParams();
  const postId = params.postId;

  console.log(postId);

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
      });
  }, []);
  console.log(post);

  const likePost = () => {
    window.alert("post liked!");
    isFavorited(!favorited);
    // fetch(`/posted`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <Wrapper>
      {post && (
        <Wrapper>
          <Title>{post.title}</Title>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
          <button>reply!</button>
          <button onClick={likePost}>
            {favorited ? "unfavorite" : "favorite"}
          </button>
        </Wrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  background-color: white;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default PostDetails;
