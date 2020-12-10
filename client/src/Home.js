import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";

export const Home = () => {
  const { appUser, signInWithGoogle } = useContext(AppContext);
  return (
    <Wrapper>
      <p>A Big Hero Image And Blurb!</p>

      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 40px;
  padding: 100px;
`;

export default Home;
