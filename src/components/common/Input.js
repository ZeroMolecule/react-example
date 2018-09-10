import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Input extends PureComponent {
  static propTypes = {
    onChange: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.func)
    ]),
  };

  static defaultProps = {
    onChange: null,
  };

  inputRef = React.createRef();

  onCustomChange = (e) => {
    const {onChange} = this.props;
    if (typeof onChange === 'function') {
      onChange(e);
    } else if (Array.isArray(onChange)) {
      onChange.forEach(fnc => {
        if (typeof fnc === 'function') {
          fnc(e);
        }
      });
    }
  };

  render () {
    return <input {...this.props} ref={this.inputRef} onChange={this.onCustomChange}/>;
  }
}

