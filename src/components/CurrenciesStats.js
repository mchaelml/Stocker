import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { IoLogoBitcoin } from "react-icons/io";
import Media from "../responsive/MediaCss";

const FormBg = styled.div`
  background-color: #f5f3f4;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  padding: 0 10px;
  height: 60%;
  ${Media.Small.max`
    display: flex;
    justify-content: space-evenly
    height: auto;
`}
`;

const CurrencyColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Inline = styled.div`
  display: flex;
  flex-direction: ${props => props.flex || "row"};
  padding: ${props => props.padding || "0"};
  color: ${props => props.color || "black"};
`;

const Headline = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 10px 0;
  height: 10%;
  display: flex;
  align-items: center;
`;

const TextSmall = styled.div`
  font-size: 10px;
  color: grey;
`;

const Icon = styled.div`
  padding-right: 30px;
  display: inherit;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  ${Media.Small.max`
    padding-right: 10px;
  `}
`;

const CurrentRate = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  height: 20%
  align-items: center
  ${Media.Small.max`
      justify-content: center;
  `}
`;

const BitCoin = styled(IoLogoBitcoin)`
  align-self: center;
  color: black;
`;

const CurrenciesStats = ({ currencies }) => (
  <React.Fragment>
    <Headline>Текущие индексы:</Headline>
    <FormBg>
      {Object.values(currencies).map(currency => (
        <Inline
          key={currency.symbol}
          padding=""
          style={{
            height: `${100 / Object.values(currencies).length}%`
          }}
        >
          <Icon>{ReactHtmlParser(currency.symbol)}</Icon>
          <CurrencyColumn>
            <div>{currency.code}</div>
            <TextSmall>Курс: {(1 / currency.rate_float).toFixed(6)}</TextSmall>
          </CurrencyColumn>
        </Inline>
      ))}
    </FormBg>
    <CurrentRate>
      По текущему курсу:&nbsp;
      {(
        1 /
        (currencies
          ? currencies["EUR"]
            ? currencies["EUR"].rate_float
            : 0
          : currencies)
      ).toFixed(4)}{" "}
      <BitCoin />
    </CurrentRate>
  </React.Fragment>
);

export default CurrenciesStats;
