import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Validator from 'models/Validator';

export const FormContext = React.createContext('');

export default class Form extends PureComponent {
  static propTypes = {
    onSubmitSuccess: PropTypes.func,
    onSubmitFail: PropTypes.func,
  };

  static defaultProps = {
    onSubmitSuccess: () => {},
    onSubmitFail: () => {}
  };

  constructor () {
    super();

    this.state = {
      inputs: {},
      errors: [],
      submitting: false,
      onInputRef: this.onInputRef,
      getError: this.getError,
    };
  };

  getError = (name) => {
    return this.state.errors.find(err => err.field === name);
  };

  generateValidator = () => {
    const {inputs} = this.state;

    const validator = new Validator();

    Object.values(inputs).forEach(input => {
      const el = input.inputRef.current;
      const {name, value} = el;
      validator.addData({[name]: value})
        .addRules(name, input.props.rules);
    });

    return validator;
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      submitting: true,
    });

    const validator = this.generateValidator();
    validator.validateAll().then(this.onSubmitSuccess)
      .catch(this.onSubmitFail);
  };

  onSubmitSuccess = (data) => {
    this.setState({
      errors: [],
      submitting: false,
    }, () => {
      this.props.onSubmitSuccess(data);
    });
  };

  onSubmitFail = (errors) => {
    this.setState({
      errors,
      submitting: false,
    }, () => {
      this.props.onSubmitFail(errors);
    });
  };

  onInputRef = (comp) => {
    this.setState(({inputs}) => ({
      inputs: {
        ...inputs,
        [comp.props.name]: comp,
      }
    }));
  };

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <FormContext.Provider value={this.state}>
          {this.props.children}
        </FormContext.Provider>
      </form>
    );
  }
}
