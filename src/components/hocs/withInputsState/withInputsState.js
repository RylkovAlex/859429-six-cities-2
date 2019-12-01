import React from "react";

const validate = (validation, value) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== `` && isValid;
  }

  if (validation.email) {
    isValid = /[-.\w]+@([\w-]+\.)+[\w-]+/g.test(value) && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }

  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }

  return isValid;
};

const withInputsState = (Component, inputs, validation = {}) => {
  class WithInputsState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isFormValid: false
      };
      this.setInput = this.setInput.bind(this);
    }

    componentDidMount() {
      inputs.forEach((inputName) => {
        this.setState({
          [inputName]: ``
        });
      }, this);
    }

    checkForm() {
      this.setState((prevState) => ({
        isFormValid: inputs.every((inputName) => !!prevState[inputName])
      }));
    }

    setInput(inputName, value) {
      if (!validation[inputName]) {
        this.setState({
          [inputName]: value
        });
        this.checkForm();
        return;
      } else if (validate(validation[inputName], value)) {
        this.setState({
          [inputName]: value
        });
        this.checkForm();
        return;
      }
      this.setState({
        [inputName]: false
      });
      this.checkForm();
    }

    render() {
      const inputValues = {};
      inputs.forEach((inputName) => {
        inputValues[inputName] = this.state[inputName];
      });
      return (
        <Component
          {...this.props}
          inputValues={inputValues}
          isFormValid={this.state.isFormValid}
          setInput={this.setInput}
        />
      );
    }
  }

  WithInputsState.propTypes = {};
  return WithInputsState;
};

export default withInputsState;
