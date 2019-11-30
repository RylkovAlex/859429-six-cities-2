import React from 'react';

export const validator = {
  EMAIL: `email`,
  REQUIED: `requied`,
};

const validate = (_validator, value) => {
  switch (_validator) {
    case `email`:
      return (/[-.\w]+@([\w-]+\.)+[\w-]+/g).test(value);
    case `requied`:
      return !!value;
    default:
      throw new Error(`unknown validator`);
  }
};

const withInputsState = (Component, inputs, validation) => {
  class WithInputsState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      this.setInput = this.setInput.bind(this);
    }

    componentDidMount() {
      inputs.forEach((inputName) => {
        this.setState({
          [inputName]: ``
        });
      }, this);
    }

    setInput(inputName, value) {
      if (validation[inputName] === undefined) {
        this.setState({
          [inputName]: value,
        });
        return;
      } else if (validation[inputName].every((val) => validate(val, value))) {
        this.setState({
          [inputName]: value,
        });
        return;
      }
      this.setState({
        [inputName]: false,
      });
    }

    render() {
      return <Component
        {...this.props}
        inputValues = {this.state}
        setInput = {this.setInput}
      />;
    }
  }

  WithInputsState.propTypes = {};
  return WithInputsState;
};

export default withInputsState;
