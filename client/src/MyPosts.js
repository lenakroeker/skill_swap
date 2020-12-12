import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import style from "./styleConstants";

export const MyPosts = () => {
  const { appUser } = useContext(AppContext);
  const [posts, setPosts] = useState();
  let history = useHistory();

  useEffect(() => {
    fetch(`/account/posts/${appUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.post);
      });
  }, [appUser]);

  return (
    <>
      {posts && posts.length > 0 && (
        <Wrapper>
          {Object.values(posts)
            .sort((a, b) => {
              if (b.editedOn > a.editedOn) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((post) => {
              return (
                <Postbox key={post.postId}>
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                  <p>{post.timestamp}</p>
                  <Edit
                    onClick={() =>
                      history.push(`/user/${appUser.email}/${post.postId}/edit`)
                    }
                  >
                    Edit/Delete
                  </Edit>
                </Postbox>
              );
            })}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin: 20px 10vw 20px 10vw;
`;

const Postbox = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid black;
  border-radius: ${style.radius};
`;

const Edit = styled.p`
  margin-top: 5px;
  padding: 4px;
  border: 1px solid red;
  color: red;
  font-weight: bold;
  border-radius: ${style.radius};
`;

export default MyPosts;
