import * as React from "react";
import styled from "@emotion/styled";

export interface HelloProps {
  compiler: string;
  framework: string;
}

const Header = styled.h1`
  font-size: 24px;
`;

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <Header>
        Hello from {this.props.compiler} and {this.props.framework}!
      </Header>
    );
  }
}
