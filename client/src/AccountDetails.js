import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import style from "./styleConstants";

export const AccountDetails = () => {
  const { appUser } = useContext(AppContext);
  let history = useHistory();

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
      <button onClick={() => history.push(`/user/${appUser.email}/messages`)}>
        My Messages
      </button>
      <button onClick={() => history.push(`/user/${appUser.email}/posts`)}>
        My Posts
      </button>
      <button onClick={() => history.push(`/user/${appUser.email}/favorites`)}>
        My favorites
      </button>
    </Wrapper>
  );
};

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

export default AccountDetails;
