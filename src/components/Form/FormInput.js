import React, { Fragment, PureComponent } from 'react';
import { FormContext } from 'components/Form';
import Input from 'components/common/Input';

export default class FormInput extends PureComponent {
  render () {
    const {name} = this.props;
    return (
      <FormContext.Consumer>
        {({onInputRef, getError}) => {
          const error = getError(name);
          return (
            <Fragment>
              <Input ref={onInputRef} {...this.props}/>
              {error && <span>{error.message}</span>}
            </Fragment>
          );
        }}
      </FormContext.Consumer>
    );
  }
}
