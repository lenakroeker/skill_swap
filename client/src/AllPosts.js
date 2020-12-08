import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const AllPosts = (setReFetch) => {
  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    fetch("/allposts")
      .then((res) => res.json())
      .then((data) => {
        const postArr = Object.values(data.data);
        setAllPosts(postArr);
      });
  }, [setReFetch]);

  return (
    <Wrapper>
      all posted ads
      {allPosts ? (
        Object.values(allPosts)
          .sort((a, b) => {
            if (b.timestamp > a.timestamp) {
              return 1;
            } else {
              return -1;
            }
          })
          .map((post) => {
            return (
              <Postbox key={post.title + Math.random()}>
                <p>{post.title}</p>
                <p>location: {post.location}</p>
                <p>{post.content}</p>
                <p>posted by: {post.userId}</p>
                <p>date: {post.timestamp}</p>
              </Postbox>
            );
          })
      ) : (
        <div>loading</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Postbox = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 2px solid black;
`;

export default AllPosts;
