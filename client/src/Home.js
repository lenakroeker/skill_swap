import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import Hero from "./assets/hero.png";

export const Home = () => {
  const { appUser, signInWithGoogle } = useContext(AppContext);
  return (
    <Wrapper>
      <Img src={Hero} />
      <Main>Share yo skills with yo Neighbour!</Main>

      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Main = styled.div`
  font-size: 20px;
`;

const Img = styled.img`
  width: 100vw;
`;
export default Home;
