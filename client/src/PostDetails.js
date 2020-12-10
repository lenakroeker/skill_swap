import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const PostDetails = () => {
  const [post, setPost] = useState();
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
  return (
    <Wrapper>
      {post && (
        <Wrapper>
          <Title>{post.title}</Title>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
          <button>reply!</button>
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
