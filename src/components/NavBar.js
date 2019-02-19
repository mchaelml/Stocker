import React from "react";
import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";
import { IoLogoBitcoin } from "react-icons/io";
import { getUserAcc } from "../actions/index";
import { connect } from "react-redux";

import MediaQuery from "react-responsive";
import Breakpoints from "../responsive/Breakpoints";

import fakeLogo from "../images/fakelogo.png";

const customer = {
  name: "Test Test",
  fundsAvailable: 120,
  accountNumber: 62946480
};

const Nav = styled.div`
  display: inline-flex;
  background-color: #111e25fc;
  position: relative;
  width: 100%;
  height: 5vh;
  justify-content: space-between
  flex-direction: row;
  border-bottom: 1px solid #4a4848;
`;

const Inline = styled.div`
  display: flex;
  flex-direction: ${props => props.flex || "row"};
  padding: ${props => props.padding || "0"};
  color: ${props => props.color || "black"};
  align-self: center;
  @media (max-width: 400px) {
    ${props => (props.mobile ? "font-size: 12px" : null)}
  }
  height: ${props => props.height || "100%"};
`;

const AccountNumber = styled.div`
  padding-left: 10px;
  color: #98a3ad;
`;

const UserName = styled.div`
  color: white;
`;

const FundsAvailable = styled.div`
  color: white;
  padding-left: 10px;
`;

const Sector = styled.div`
  padding: 0 20px;
  display: inherit;
`;

const Separator = styled.div`
  border-left: 1px solid #4a4848;
`;

const BitCoin = styled(IoLogoBitcoin)`
  align-self: center;
  color: white;
`;

const User = styled(MdAccountCircle)`
  align-self: center;
  color: white;
`;

const FakeLogo = styled.img`
  height: 30px;
  align-self: center;
`;

class NavBar extends React.Component {
  componentDidMount() {
    this.props.getUserAcc();
  }
  render() {
    const isInte = Number.isInteger(this.props.user.amount)
      ? this.props.user.amount
      : this.props.user.amount.toFixed(4);
    return (
      <Nav>
        <Inline padding="0 20px">
          <FakeLogo src={fakeLogo} alt="" />
        </Inline>
        <Inline>
          <User size="2em" />
          <Inline flex="column" padding="0 20px 0 10px" mobile height="true">
            <Inline>
              <Inline>
                <UserName>{customer.name}</UserName>
                <MediaQuery minWidth={Breakpoints.Medium.min}>
                  <AccountNumber>Счет: #{customer.accountNumber}</AccountNumber>
                </MediaQuery>
              </Inline>
            </Inline>
            <Inline color="#98a3ad">
              Доступно средств:
              <FundsAvailable>{this.props.user ? isInte : null}</FundsAvailable>
            </Inline>
          </Inline>
          <Separator />
          <Sector>
            <BitCoin size="2em" />
          </Sector>
        </Inline>
      </Nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUserAcc }
)(NavBar);
