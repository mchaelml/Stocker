import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FaCheck, FaCheckCircle, FaFrown } from "react-icons/fa";
import { fetchData, changeUserBTC } from "../actions/index";
import Media from "../responsive/MediaCss";

import LinkList from "./LinkList";
import SocialMediaList from "./SocialMediaList";
import Form from "./Form";
import CurrenciesStats from "./CurrenciesStats";
import Modal from "./Modal";
import Spinner from "./Spinner";

const Container = styled.div`
  color: black;
  display: flex;
  height: inherit;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Page = styled.div`
  height: 80vh;
  margin: 5vw 10vw 0 10vw;
  ${Media.Small.max`
    margin: 5vw 5vw 0 5vw;
    height: 95vh;
  `}
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const NavBar = styled.div`
  height: 10%;
  border-bottom: 1px solid #dcd7d7;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  ${Media.Small.max`
      height: 5%;
  `}
`;

const MainForm = styled.div`
  border-bottom: 1px solid #dcd7d7;
  padding: 0 20px;
  background-color: white;
  height: 60%;
  ${Media.Small.max`
    height: auto;
  `}
`;

const ActionButtonSection = styled.div`
  height: 10%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  ${Media.Small.max`
      justify-content: center;
      & > button {
        width: auto;
      }
  `}
`;

const HeadLine = styled.div`
  text-align: center;
  font-weight: bold;
`;

const UserForm = styled(Form)`
  height: inherit;
`;

const ActionButton = styled.button`
  background-color: grey;
  height: 60%;
  display: inherit;
  justify-content: center;
  color: white;
  padding: 0;
  overflow-y: hidden;
  opacity: ${props => (props.disabled ? "0.6" : "1")}
    ${props => (props.borderLeft ? `border-left: ${props.borderLeft}` : null)}
    ${props =>
      props.borderRight ? `border-right: ${props.borderRight}` : null};
  ${Media.Small.max`
      height: auto;
    `}
`;

const Sections = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  ${props => (props.bg ? "background-color: #2f2d2d" : null)}
  ${props => (props.padding ? `padding : ${props.padding}` : null)}
  width: 100%
  ${Media.Small.max`
      ${props => (props.row ? null : "flex-direction: column")};
    
  `}
  @media (max-width: 620px) {
    flex-direction: column
    justify-content: space-evenly;
    & > div {
      align-self: center;
    }
  }
  ${props => (props.mobile ? "@media (max-width: 620px) { padding: 0 }" : null)}
`;

const LeftSection = styled.div`
width: ${props => props.width || "70%"};
  ${props => (props.alignItems ? "align-items: center" : null)}
  ${props => (props.display ? "display: flex" : null)}
  ${Media.Small.max`
  width: ${props => props.width || "100%"}

`}
`;

const RightSection = styled.div`
  width: ${props => props.width || "27%"};
  ${props => (props.alignItems ? `align-items: ${props.alignItems}` : null)}
  ${props => (props.display ? `display: ${props.display}` : null)}
  ${props =>
    props.justifyContent ? `justify-content: ${props.justifyContent}` : null}
    ${Media.Small.max`
    width: ${props => props.width || "100%"}

`}
`;

const BottomSection = styled.div`
  ${props => (props.bg ? "background-color: #191717" : null)}
  height: 10%;
  display: flex;
`;

const Rest = styled.div`
  color: grey;
  margin-top: 10px;
  padding-top: 5px;
`;

const Center = styled.div`
  text-align-last: center;
  text-align: center;
  font-size: 13px;
`;

const ButtonText = styled.div`
  padding: 10px;
  align-self: center;
`;

const Separator = styled.line`
  border-left: 1px solid black;
`;

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      waitForResults: false,
      data: null,
      isFormDisabled: false,
      bet: {},
      winOrLose: null
    };
  }
  componentDidMount() {
    this.props.fetchData();
    setInterval(() => this.props.fetchData(), 60000);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data !== undefined &&
      this.props.data.bpi !== nextProps.data.bpi &&
      this.state.waitForResults
    ) {
      this.winOrLose(nextProps);
      this.setState({
        waitForResults: false,
        isModalOpen: true,
        data: nextProps.data
      });
    }
  }

  calculateReturnBetAmount(oldVal, newVal, betAmount) {
    return (betAmount * newVal) / oldVal;
  }

  winOrLose(newData) {
    const NewAmountBTCReturnedAfterStockUpdate = this.calculateReturnBetAmount(
      this.state.bet.value,
      newData.data.bpi[this.state.bet.currency].rate_float,
      this.state.bet.betAmount
    );
    if (
      this.state.bet.value <
      newData.data.bpi[this.state.bet.currency].rate_float
    ) {
      this.setState({
        winOrLose: {
          win: true,
          label: "Ставка выиграла",
          iconToUse: <FaCheckCircle color="green" size="80px" />,
          text1: `Поздравляем! Ваша ставка выиграла`,
          text2: `Сумма выигрыша по обновленному курсу`,
          bet: NewAmountBTCReturnedAfterStockUpdate
        }
      });
      this.props.changeUserBTC(
        NewAmountBTCReturnedAfterStockUpdate - this.state.bet.betAmount
      );
    } else {
      this.setState({
        winOrLose: {
          win: false,
          label: "Ставка проиграла",
          iconToUse: <FaFrown color="red" size="80px" />,
          text1: `К сожалению ваша ставка проиграла`,
          text2: `Сумма проигрыша по обновленному курсу`,
          bet: NewAmountBTCReturnedAfterStockUpdate
        }
      });
      this.props.changeUserBTC(
        (this.state.bet.betAmount - NewAmountBTCReturnedAfterStockUpdate) * -1
      );
    }
  }

  ModalShow = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  onSubmitForm = props => this.submit(props);

  onSubmitForms = props => {
    const currency = props.currency.label.props.children[2]
    this.setState({
      waitForResults: true,
      isFormDisabled: true,
      bet: {
        currency: currency,
        value: this.props.data.bpi[currency].rate_float,
        betAmount: Number(props.sum)
      },
      data: this.props.data
    });
  };

  fetchNewData() {
    while (this.state.waitForResults) {
      setInterval(() => this.props.fetchData(), 10000);
    }
  }

  makeAnotherBet = () => {
    this.setState({
      winOrLose: null,
      bet: null,
      isModalOpen: false,
      isFormDisabled: false
    });
  };

  render() {
    return (
      <Page>
        <Container>
          <Layout>
            <NavBar>
              <HeadLine>
                {this.state.winOrLose
                  ? this.state.winOrLose.label
                  : "Бинарный опцион"}
              </HeadLine>
            </NavBar>
            {!this.state.isModalOpen && (
              <React.Fragment>
                {" "}
                <MainForm>
                  {this.state.waitForResults && <Spinner />}
                  <Sections>
                    <LeftSection>
                      <UserForm
                        submitRef={submit => (this.submit = submit)}
                        currencies={this.props.data ? this.props.data.bpi : []}
                        onSubmitForms={this.onSubmitForms}
                        disabled={this.state.isFormDisabled}
                      />
                    </LeftSection>
                    <RightSection>
                      <CurrenciesStats
                        currencies={this.props.data ? this.props.data.bpi : []}
                      />
                    </RightSection>
                  </Sections>
                </MainForm>
                <ActionButtonSection>
                  <ActionButton
                    onClick={this.onSubmitForm}
                    disabled={this.state.isFormDisabled}
                  >
                    <FaCheck
                      size="1em"
                      style={{
                        padding: 10,
                        height: "inherit",
                        borderRight: "1px solid black"
                      }}
                    />

                    <ButtonText>СДЕЛАТЬ СТАВКУ</ButtonText>
                  </ActionButton>
                </ActionButtonSection>
              </React.Fragment>
            )}
            {this.state.isModalOpen && (
              <Modal
                data={this.state.winOrLose}
                makeAnotherBet={this.makeAnotherBet}
              />
            )}
            <BottomSection bg>
              <Sections padding="0 20px" row mobile>
                <LeftSection alignItems="center" display="flex" width="auto">
                  <LinkList />
                </LeftSection>
                <RightSection
                  alignItems="center"
                  display="flex"
                  justifyContent="flex-end"
                  width="auto"
                >
                  <SocialMediaList />
                </RightSection>
              </Sections>
            </BottomSection>
            <Rest>
              <Center>
                &copy; Общество ограниченной ответственности "SAA"
              </Center>
              <Center>Зарегестрированный товарный знак SAA</Center>
            </Rest>
          </Layout>
        </Container>
      </Page>
    );
  }
}

const mapStatetoProps = state => {
  return {
    data: state.data.payload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    changeUserBTC: val => dispatch(changeUserBTC(val))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(MainScreen);
