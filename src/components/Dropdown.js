import React from "react";
import styled from "styled-components";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Media from "../responsive/MediaCss";

const Anchor = styled.div`
  position: relative;
  background-color: inherit;
  display: flex;
`;

const DropDownButton = styled.div`
  ${props => props.isOpen && `background-color: ${props.theme.primary};`}
  margin: 0 15px;
  padding: 10p 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.text};
  cursor: pointer;
  > span {
    margin-left: 10px;
  }
  ${Media.Large.max`
    font-size: 16px;
    margin: 0 10px;
    display: block;
  `}
  :hover::before {
    opacity: 0.65;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  top: 45px;
  right: 0px;
  width: 200px;
  background-color: white;
  font-weight: bold;
  position: absolute;

  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

class Dropdown extends React.Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { options } = this.props;
    const { isOpen } = this.state;
    return (
      <Anchor isOpen={isOpen}>
        {!isOpen && Object.keys(options)[0]}
        <Ul>
          {isOpen && (
            <React.Fragment>
              {Object.values(options).map(option => (
                <li>{option.code}</li>
              ))}
            </React.Fragment>
          )}
        </Ul>
        <DropDownButton isOpen={isOpen} onClick={this.toggleOpen}>
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </DropDownButton>
      </Anchor>
    );
  }
}

export default Dropdown;
