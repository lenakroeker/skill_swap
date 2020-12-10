import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

export const PostsByCategory = () => {
  const params = useParams();
  const category = params.category;
  let history = useHistory();
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch(`/posts/bycategory/${category}`)
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
          <p>posts in {category}</p>
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
        <div>no posts in {category}</div>
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

export default PostsByCategory;

const Wrapper = styled.div``;
