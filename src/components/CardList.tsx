import React, { memo } from "react";
import styled from "@emotion/styled";
import { Card, CardStyle } from "./Card";

import Arch1 from "assets/arch1.jpg";

export interface CardListProps {}

export const CardListStyle = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  ${CardStyle} {
    width: calc(50% - 24px);

    margin: 12px;
  }
`;

export const CardList: React.FC<CardListProps> = memo(({  }: CardListProps) => {
  return (
    <CardListStyle>
      <Card imgSrc={Arch1} />
      <Card title="New design trends of summer '19" />
      <Card />
      <Card imgSrc={Arch1} />
      <Card title="New design trends of summer '19" />
      <Card />
      <Card imgSrc={Arch1} />
      <Card title="New design trends of summer '19" />
      <Card />
      <Card imgSrc={Arch1} />
      <Card title="New design trends of summer '19" />
      <Card />
    </CardListStyle>
  );
});

CardList.displayName = "CardList";
