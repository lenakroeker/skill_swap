import { createGlobalStyle } from "styled-components";
import reset from "styled-reset-advanced";
import style from "./styleConstants";

const GlobalStyle = createGlobalStyle`
${reset}
  body {
    background: ${style.white};
    font-family: 'Poppins', sans-serif;  }


  button {
      padding: 10px 20px;
      border-radius: 10px;
      border:2px solid ${style.black};
      background-color: rgb(86, 211, 252, 0.2);
      cursor: pointer;
      margin: 10px;
  }

  button:hover {
      background-color: ${style.skyblue};
  }
`;

export default GlobalStyle;
