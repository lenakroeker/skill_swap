import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useHistory } from "react-router-dom";

export const PostDetails = () => {
  const history = useHistory();
  const { appUser } = useContext(AppContext);
  const [post, setPost] = useState({ title: null });
  const [favorited, isFavorited] = useState(false);
  const [likeData, setLikeData] = useState();
  const params = useParams();
  const postId = params.postId;

  console.log(postId);

  useEffect(() => {
    setLikeData({
      ...likeData,
      postId: postId,
      userEmail: appUser.email,
      title: post.title,
    });
  }, [post, appUser, postId]);

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
      });
    return;
  }, [postId]);
  console.log(post);
  console.log(likeData);

  const likePost = () => {
    fetch(`/likepost`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    });
  };

  return (
    <Wrapper>
      {post && (
        <Wrapper>
          <Title>{post.title}</Title>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
          <button onClick={() => history.push(`/posts/${post.postId}/message`)}>
            reply!
          </button>
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
