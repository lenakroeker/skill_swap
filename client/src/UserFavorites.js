import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import style from "./styleConstants";

export const UserFavorites = () => {
  const { appUser } = useContext(AppContext);
  const [posts, setPosts] = useState();
  let history = useHistory();

  useEffect(() => {
    fetch(`/account/favorites/${appUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.post);
      });
  }, [appUser]);

  console.log(posts);

  return (
    <>
      <Title>My Favorites</Title>
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
                <Postbox
                  key={post.postId}
                  onClick={() => history.push(`/posts/${post.postId}/liked`)}
                >
                  <p>{post.title}</p>
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

const Title = styled.p`
  font-size: 20px;
`;

const Postbox = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid black;
  border-radius: ${style.radius};
`;

export default UserFavorites;
