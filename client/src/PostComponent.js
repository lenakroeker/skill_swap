import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import style from "./styleConstants";

export const PostComponent = (props) => {
  const { title, content, imageSrc, timestamp, editedOn } = props;
  return (
    <Wrapper>
      <Title></Title>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.p``;

export default PostComponent;
