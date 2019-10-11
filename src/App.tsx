import * as React from "react";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader";

import { Hello } from "./components/Hello";
import { GlobalStyles, colors, shadow } from "./utils/styles";

const MobileHost = styled.div`
  height: 720px;
  width: 440px;
  background: ${colors.white};
  box-shadow: ${shadow.lg};
  border-radius: 4px;
`;

const AppStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
`;

const App: React.SFC<{}> = () => {
  return (
    <GlobalStyles>
      <AppStyle>
        <MobileHost>
          <Hello compiler="TypeScript" framework="React" />
        </MobileHost>
      </AppStyle>
    </GlobalStyles>
  );
};

export default hot(module)(App);
