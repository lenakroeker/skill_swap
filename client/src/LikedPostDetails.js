import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const LikedPost = () => {
  const history = useHistory();
  const [post, setPost] = useState({ title: null });
  const params = useParams();
  const postId = params.postId;

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
      });
    return;
  }, [postId]);

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

export default LikedPost;
