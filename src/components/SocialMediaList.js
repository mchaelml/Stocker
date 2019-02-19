import React from "react";
import styled from "styled-components";
import { FaFacebook, FaVk, FaYoutube, FaInstagram } from "react-icons/fa";

const list = [<FaVk />, <FaYoutube />, <FaInstagram />, <FaFacebook />];

const Social = styled.div`
  display: inherit;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  margin-left: 10px;
  background-color: grey;
`;

const Row = styled.div`
  display: flex;
`;

const SocialMediaList = () => (
  <React.Fragment>
    <Row>
      {list.map((item, i) => (
        <Social key={i}>{item}</Social>
      ))}
    </Row>
  </React.Fragment>
);

export default SocialMediaList;
