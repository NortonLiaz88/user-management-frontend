import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`

 *{
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
        background: #fff;
      -webkit-font-smoothing: antialiased;
      margin: 0px;
  }

  body, input, button {
      font: 16px Roboto, sans-serif;
  }

  button {
      cursor: pointer;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
  }


`;
