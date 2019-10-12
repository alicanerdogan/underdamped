import React, { memo } from "react";
import styled from "@emotion/styled";
import { colors } from "utils/styles";

export interface CardProps {
  imgSrc?: string;
  title?: string;
}

const Title = styled.h2`
  margin: 20px;
  color: ${colors.white};
  font-size: 18px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(123, 123, 123, 0.55) 100%
  );
`;

export const CardStyle = styled.div`
  position: relative;
  height: 200px;
  border-radius: 20px;
  background: ${colors.yellow[600]};
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Card: React.FC<CardProps> = memo(
  ({ imgSrc, title }: CardProps) => {
    return (
      <CardStyle>
        {imgSrc && (
          <>
            <img src={imgSrc} />
            <ImageOverlay />
          </>
        )}
        {title && (
          <>
            <Title>{title}</Title>
          </>
        )}
      </CardStyle>
    );
  }
);

Card.displayName = "Card";
