import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import icons from '../../assets/icons/index';
import { SearchContext } from 'components/Header/SearchProvider';
import Input from 'components/common/Input';
import { translate } from 'react-i18next';

class SearchBar extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render () {
    return (
      <SearchContext.Consumer>
        {({value, onChange}) => {
          return (
            <div className="search-bar">
              <Input
                className="search-bar__input"
                placeholder={this.props.t('form.placeholder.search')}
                value={value}
                onChange={[onChange, this.props.onChange]}
              />
              <svg className="icon search-bar__icon">
                <use xlinkHref={icons.search()}/>
              </svg>
            </div>
          );
        }}
      </SearchContext.Consumer>
    );
  }
}

export default translate()(SearchBar)
