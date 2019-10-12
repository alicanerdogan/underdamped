import React, { memo } from "react";
import styled from "@emotion/styled";

export interface AspectRatioProps {
  aspectRatio: number;
  children: React.ReactElement;
  width?: string;
}

export const AspectRatioStyle = styled.div`
  position: relative;
  display: block;

  &:before {
    display: block;
    content: "";
    width: 100%;
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
`;

export const AspectRatio: React.FC<AspectRatioProps> = memo(
  ({ aspectRatio, width, children }: AspectRatioProps) => {
    return (
      <AspectRatioStyle
        style={{ paddingTop: `${100 / aspectRatio}%`, width: width || "auto" }}
      >
        {children}
      </AspectRatioStyle>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
