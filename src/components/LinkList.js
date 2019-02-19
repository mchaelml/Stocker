import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Media from "../responsive/MediaCss";

const list = [
  "На главный сайт",
  "Регистрация",
  "Документы",
  "Правила",
  "О компании"
];

const Row = styled.div`
  display: flex;
`;

const LinkStyled = styled(Link)`
  color: #706f73;
  font-size: 14px;
  ${Media.Small.max`
    font-size: 10px;
  `}
`;

const Item = styled.div`
  padding-right: 10px;
  text-align: center;
`;

const LinkList = () => (
  <React.Fragment>
    <Row>
      {list.map(item => (
        <Item key={item}>
          <LinkStyled to="/">{item}</LinkStyled>
        </Item>
      ))}
    </Row>
  </React.Fragment>
);

export default LinkList;
