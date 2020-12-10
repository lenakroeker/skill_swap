import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import style from "./styleConstants";

export const AccountDetails = () => {
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

  console.log(posts);
  return (
    <Wrapper>
      {appUser.profilePic ? (
        <img
          src={appUser.profilePic}
          alt={`${appUser.displayName}'s profile`}
        />
      ) : appUser.displayName ? (
        <Placeholder>{appUser.displayName[0]}</Placeholder>
      ) : (
        <div></div>
      )}
      <UserInfo>{appUser.displayName}</UserInfo>
      <UserInfo>{appUser.email}</UserInfo>
      <UserInfo>Posts by You:</UserInfo>
      {posts && posts.length > 0 && (
        <Wrapper>
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
                  <p>{post.timestamp}</p>
                </Postbox>
              );
            })}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default AccountDetails;

const Wrapper = styled.div`
  margin: 0px 10vw 20px 10vw;
`;

const UserInfo = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 10px;
`;

const Placeholder = styled.div`
  background-color: ${style.skyblue};
  color: white;
  height: 100px;
  width: 100px;
  font-size: 80px;
  padding: 10px;
  text-align: center;
  border-radius: 70px;
  margin: 20px auto;
`;

const Postbox = styled.div`
  padding: 10px;
  border: 1px solid black;
`;
