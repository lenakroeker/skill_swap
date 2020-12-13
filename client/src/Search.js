import React from "react";
import style from "./styleConstants";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

export const SearchPage = () => {
  console.log("search");
  return (
    <Wrapper>
      <Cat exact to="/posts/type/seeking">
        Seeking
      </Cat>
      <Cat exact to="/posts/type/offering">
        Offering
      </Cat>
      <Head>Search by Category:</Head>
      <Cat exact to="/posts/bycategory/artandcraft">
        Art and Craft
      </Cat>
      <Cat exact to="/posts/bycategory/sportsandfitness">
        Sports and Fitness
      </Cat>
      <Cat exact to="/posts/bycategory/foodanddrink">
        Food and Drink
      </Cat>
      <Cat exact to="/posts/bycategory/homeandgarden">
        Home and Garden
      </Cat>
      <Cat exact to="/posts/bycategory/computersandtechnology">
        Computers and Technology
      </Cat>
      <Cat exact to="/posts/bycategory/other">
        Other
      </Cat>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 10vw;
`;

const Head = styled.p`
  font-weight: bold;

  margin-bottom: 15px;
`;

const Cat = styled(NavLink)`
  display: block;
  margin: 10px auto;
  width: 80%;
  box-shadow: inset 0px 0px 18px -6px ${style.skyblue};
  padding: 15px;
  border-radius: ${style.radius};
`;

export default SearchPage;
