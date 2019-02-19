import React from "react";
import styled from "styled-components";
import { IoLogoBitcoin } from "react-icons/io";

const BitCoin = styled(IoLogoBitcoin)`
  align-self: center;
  color: white;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  justify-content: space-evenly;
`;

const Inline = styled.div`
  display: flex;
`;
const BetColor = styled.div`
  color: ${props => props.color};
`;
const Bet = styled.div`
  display: inherit;
  padding-left: 5px;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  height: 20%;
  width: 40%;
  margin: 20px;
`;
const Bg = styled.div`
  text-align: center;
`;
const IconDiv = styled.div`
  margin: 10px;
`;
const Text = styled.div`
  margin: 10px;
`;

const Modal = ({
  data: { iconToUse = null, text1 = "", text2 = "", bet = null, win = null },
  makeAnotherBet
}) => {
  return (
    <Container>
      <Bg>
        <IconDiv>{iconToUse ? iconToUse : null}</IconDiv>
        <Text>{text1}</Text>
        <Inline>
          <Text>{text2}:</Text>
          <Bet>
            <BetColor color={win ? "green" : "red"}>{bet.toFixed(4)}</BetColor>{" "}
            <BitCoin color={win ? "green" : "red"} />
          </Bet>
        </Inline>
        <div />
        <Button onClick={makeAnotherBet}>Сделать еще ставку</Button>
      </Bg>
    </Container>
  );
};

export default Modal;
