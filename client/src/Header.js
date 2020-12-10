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
  background-color: ${style.black};
  color: ${style.white};
  width: 100vw;
  height: 80px;
  text-align: center;
`;
const Welcome = styled.div``;

const MenuDrop = styled.div``;

const DropBtn = styled.button`
  border: 1px solid white;
  background: transparent;
  color: ${style.white};
  cursor: pointer;
  margin: 10px;
  font-size: 18px;
  padding: 5px 8px;
  width: 50vw;
  &:hover {
    background-color: rgb(237, 245, 247, 0.1);
  }
`;

const DropdownContent = styled.ul`
  margin-top: 0px;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  left: 0;
  opacity: 0.9;
  background: ${style.black};
  width: 100vw;
  padding: 0 10vw;
`;

const DropItem = styled(NavLink)`
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: 80vw;
  background: ${style.black};
  color: white;
  padding: 10px 10px;
  margin: 5px 0;
  &:hover {
    background: ${style.black};
  }
`;
export default Header;

{
  /* <label htmlFor="category">Find Posts By Category</label>
      <select
        type="dropdown"
        name="category"
        onChange={(ev) => history.push(`/posts/bycategory/${ev.target.value}`)}
      >
        <option value="" disabled selected>
          Select
        </option>
        <option value="sportsandfitness">Sports & Fitness</option>
        <option value="foodanddrink">Food & Drink</option>
        <option value="artandcraft">Art & Craft</option>
        <option value="homeandgarden">Home & Garden</option>
        <option value="computersandtechnology">Computers & Technology</option>
      </select> */
}
