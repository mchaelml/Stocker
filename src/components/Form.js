import React from "react";
import { Field, reduxForm } from "redux-form";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { connect } from "react-redux";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import Media from "../responsive/MediaCss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Inline = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || "space-between"};
  padding: ${props => `${props.padding} 0`};
  ${props => (props.fontSize ? `font-size: ${props.fontSize}px` : null)}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  align-items: ${props => props.alignItems || "normal"};
`;

const FormBg = styled.div`
  background-color: #f5f3f4;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  padding: 10px;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${Media.Small.max`
    height: auto;
  `}
`;

const Error = styled.div`
  color: red;
  text-align: center;
`;

const Label = styled.label``;

const Select = styled.select`
  width: 100%;
  border: 1px solid #cccaca;
`;

const Input = styled.div`
  padding: 5px 0 10px 0;
  width: 100%;
`;

const InputBox = styled.input`
  width: inherit;
  box-sizing: border-box;
  border: 1px solid #ccc;
  height: 30px;
`;

const OptionSelector = styled.div`
  display: flex;
  flex-direction: column;
`;

const RulesContent = styled.div`
  display: flex;
  padding: 10px 0;
  height: 20%;
  align-items: center;
  ${Media.Small.max`
    height: auto;
  `}
`;

const Headline = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 10px 0;
  height: 10%;
  display: flex;
  align-items: center;
`;

const DropdownStyled = styled(Dropdown)`
  & > div {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const Form = styled.form`
  height: 100%;
`;

const UpArrow = styled(MdArrowUpward)``;

const DownArrow = styled(MdArrowDownward)``;

class BForm extends React.Component {
  constructor(props) {
    super(props)
  }
  renderInput = ({ input, label, meta, mode, disabled }) => {
    return (
      <React.Fragment>
        {mode === "input" && (
          <Column>
            <Label>{label}</Label>
            <Input>
              <InputBox {...input} disabled={disabled} />
            </Input>
            {meta.error && meta.touched && <Error>{meta.error}</Error>}
          </Column>
        )}
        {mode === "dropdown" && (
          <Column>
            <Label>{label}</Label>
            <Input>
              <DropdownStyled
                {...input}
                disabled={disabled}
                options={Object.values(this.props.currencies).map(option => (
                  <div key={Math.random()}>
                    {ReactHtmlParser(option.symbol)} {option.code}
                  </div>
                ))}
              />
            </Input>
            {meta.error && meta.touched && <Error>{meta.error}</Error>}
          </Column>
        )}
      </React.Fragment>
    );
  };
  renderRadioSelectors = ({ meta, input, label, mode, disabled }) => {
    return (
      <React.Fragment>
        <Inline padding="20px">
          <Column alignItems="center">
            <input
              type="radio"
              name="choice"
              {...input}
              value="up"
              disabled={disabled}
            />
            <Inline justifyContent="normal" padding="10px" fontSize="11">
              <UpArrow />
              ВВЕРХ
            </Inline>
          </Column>
          <Column alignItems="center">
            <input
              type="radio"
              name="choice"
              {...input}
              value="down"
              disabled={disabled}
            />
            <Inline justifyContent="normal" padding="10px" fontSize="11">
              <DownArrow />
              ВНИЗ
            </Inline>
          </Column>
        </Inline>
        {meta.error && meta.touched && <Error>{meta.error}</Error>}
      </React.Fragment>
    );
  };
  renderRules = ({ meta, input, label, disabled }) => {
    return (
      <React.Fragment>
        <Inline>
          <input
            type="checkbox"
            name="acceptRules"
            value="acceptRules"
            {...input}
            disabled={disabled}
          />
          <label>{label}</label>
        </Inline>
        {meta.error && meta.touched && <Error>{meta.error}</Error>}
      </React.Fragment>
    );
  };
  onSubmit = vals => this.props.onSubmitForms(vals);

  render() {
    this.props.submitRef(this.props.handleSubmit(this.onSubmit));
    return (
      <React.Fragment>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Headline>Выберите валюту и введите сумму ставки:</Headline>
          <FormBg>
            <Inline>
              <Field
                name="currency"
                component={this.renderInput}
                label="Валюта"
                mode="dropdown"
                currencies={this.props.currencies}
                disabled={this.props.disabled}
              />
              <Field
                name="sum"
                component={this.renderInput}
                label="Сумма"
                mode="input"
                disabled={this.props.disabled}
              />
            </Inline>
            <OptionSelector>
              После следующего изменения котировок индекс биткойна к этой валюте
              пойдет:
              <Field
                name="updown"
                component={this.renderRadioSelectors}
                disabled={this.props.disabled}
              />
            </OptionSelector>
          </FormBg>
          <RulesContent>
            <Field
              name="acceptRules"
              component={this.renderRules}
              label="Я ознакомлен с правилами сервиса."
              disabled={this.props.disabled}
            />
          </RulesContent>
        </Form>
      </React.Fragment>
    );
  }
}

const validate = (vals, props) => {
  const errors = {};
  if (!vals.currency) errors.currency = "Нужно выбрать валюту";
  if (vals.currency === "Валюта") errors.currency = "Нужно выбрать валюту";
  if (!vals.sum) errors.sum = "Нужно ввести сумму";
  if (isNaN(vals.sum)) errors.sum = "Сумма должна быть числом";
  if (vals.sum <= 0) errors.sum = "Сумма должна быть больше 0";
  if (vals.sum > props.user.amount) errors.sum = "Такой суммы на счету нет";
  if (!vals.updown) errors.updown = "Нужно выбрать условие";
  if (!vals.acceptRules)
    errors.acceptRules = "Нужно согласиться с правилами сервиса";
  return errors;
};

const mapStateToProps = state => {
  return {
    initialValues: {
      currency: "Валюта"
    },
    user: state.user
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "placeBet",
    validate,
    enableReinitialize: true
  })(BForm)
);
