import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import style from "./styleConstants";

export const Header = () => {
  const { appUser, signInWithGoogle, handleSignOut, message } = useContext(
    AppContext
  );
  let history = useHistory();

  //dropdown for mobile
  const [dropOpen, setDropOpen] = useState(false);

  const dropHandle = () => {
    setDropOpen(!dropOpen);
  };

  return (
    <Wrapper>
      {appUser && appUser.email ? (
        <>
          <Welcome>
            {message} {appUser.displayName}!
          </Welcome>
          <MenuDrop>
            <DropBtn onClick={() => dropHandle()}>Menu</DropBtn>
            {dropOpen && (
              <DropdownContent onClick={() => dropHandle()}>
                <DropItem exact to={`/user/${appUser.email}`}>
                  My Account
                </DropItem>
                <DropItem exact to="/createpost">
                  Post an Ad
                </DropItem>
                <DropItem exact to="/">
                  Home
                </DropItem>
                <DropItem exact to="/all">
                  All Posts
                </DropItem>
                <DropItem exact to="/search">
                  Search
                </DropItem>
                <DropItem exact to="/" onClick={handleSignOut}>
                  Sign Out
                </DropItem>
              </DropdownContent>
            )}
          </MenuDrop>
        </>
      ) : (
        <>
          <Welcome>Welcome to SkillSwap!</Welcome>
          <MenuDrop>
            <DropBtn onClick={() => dropHandle()}>Menu</DropBtn>
            {dropOpen && (
              <DropdownContent onClick={() => dropHandle()}>
                <DropItem onClick={signInWithGoogle} exact to="/all">
                  Sign in With Google
                </DropItem>
                <DropItem exact to="/">
                  Home
                </DropItem>
                <DropItem exact to="/search">
                  Search
                </DropItem>
                <DropItem exact to="/all">
                  All Posts
                </DropItem>
              </DropdownContent>
            )}
          </MenuDrop>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  background-color: transparent;
  color: ${style.black};
  width: 100vw;
  height: 80px;
  text-align: center;
`;
const Welcome = styled.div``;

const MenuDrop = styled.div``;

const DropBtn = styled.button`
  border: 6px solid ${style.black};
  background: ${style.black};
  color: ${style.white};
  border-radius: 16px;
  cursor: pointer;
  margin: 10px;
  font-size: 18px;
  padding: 5px 8px;
  width: 50vw;
  &:hover {
    background-color: ${style.white};
    color: ${style.black};
  }
`;

const DropdownContent = styled.ul`
  margin-top: -5px;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  left: 0;
  opacity: 0.9;
  background: transparent;
  width: 100vw;
  padding: 0 10vw;
`;

const DropItem = styled(NavLink)`
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: 53vw;
  background: ${style.black};
  border: 6px solid ${style.white};
  border-radius: 20px;
  color: white;
  padding: 10px 10px;
  margin: 0.5px 0;
  &:hover {
    background: ${style.black};
  }
`;

export default Header;
