import { createGlobalStyle } from "styled-components";
import reset from "styled-reset-advanced";

const GlobalStyle = createGlobalStyle`
${reset}
  body {
    background: ivory;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  button {
      padding: 10px 20px;
      border-radius: 10px;
      border:2px solid black;
      background-color:transparent;
      cursor: pointer;
  }

  button:hover {
      background-color: pink;
  }
`;

export default GlobalStyle;
