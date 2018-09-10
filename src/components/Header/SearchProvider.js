import React, { PureComponent } from 'react';

export const SearchContext = React.createContext('');

export default class SearchProvider extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  onChange = (e) => {
    this.setState({value: e.target.value});
  };

  state = {
    value: '',
    onChange: this.onChange,
  };

  render () {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
