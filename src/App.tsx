import * as React from "react";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader";

import { GlobalStyles, colors, shadow } from "./utils/styles";
import { MultiSelect, MultiSelectStyle } from "components/MultiSelect";
// import { CardList } from "components/CardList";

const MobileHost = styled.div`
  height: 720px;
  width: 440px;
  background: ${colors.gray[0]};
  box-shadow: ${shadow.lg};
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;

  ${MultiSelectStyle} {
    margin: 24px;
  }
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
          <MultiSelect
            options={[
              { label: "January", value: 1 },
              { label: "February", value: 2 },
              { label: "March", value: 3 },
              { label: "April", value: 4 },
              { label: "May", value: 5 },
              { label: "June", value: 6 },
              { label: "July", value: 7 },
              { label: "August", value: 8 },
              { label: "September", value: 9 },
              { label: "October", value: 10 },
              { label: "November", value: 11 },
              { label: "December", value: 12 }
            ]}
          />
          {/* <CardList /> */}
        </MobileHost>
      </AppStyle>
    </GlobalStyles>
  );
};

export default hot(module)(App);
