import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

export const PostsBySeeking = () => {
  const params = useParams();
  const seeking = params.seeking;
  let history = useHistory();
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch(`/posts/type/${seeking}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.post);
      });
  }, []);
  console.log(posts);
  return (
    <Wrapper>
      {posts && posts.length > 0 ? (
        <>
          <p>posts in {seeking}</p>
          {Object.values(posts)
            .sort((a, b) => {
              if (b.timestamp > a.timestamp) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((post) => {
              return (
                <Postbox
                  key={post.postId}
                  onClick={() => history.push(`/posts/${post.postId}`)}
                >
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                </Postbox>
              );
            })}
        </>
      ) : (
        <div>no posts in {seeking}</div>
      )}
    </Wrapper>
  );
};

const Postbox = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 2px solid black;
  cursor: pointer;
`;

const Wrapper = styled.div``;

export default PostsBySeeking;
