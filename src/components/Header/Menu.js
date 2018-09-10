import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import icons from 'assets/icons';

export default class Menu extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  state = {
    submenuIndex: null,
  };

  onSubmenuClick = (index) => () => {
    this.setState(({submenuIndex}) => ({
      submenuIndex: index === submenuIndex ? null : index,
    }));
  };

  renderItem = (label, action) => {
    if (typeof action === 'string') {
      return (
        <Link key={label} className="menu__item" to={action}>
          {label}
        </Link>
      );
    } else if (typeof  action === 'function') {
      return (
        <button key={label} className="button button--clean menu__item" onClick={action}>
          {label}
        </button>
      );
    }
    return null;
  };

  renderItems = ([label, action], i) => {
    if (typeof action === 'string' || typeof  action === 'function') {
      return this.renderItem(label, action);
    } else if (Array.isArray(action)) {
      return (
        <div key={label} className="menu__group">
          <button className="button button--clean menu__item" onClick={this.onSubmenuClick(i)}>
            {label}
            <svg className="icon menu__icon">
              <use xlinkHref={icons.angleDown()}/>
            </svg>
          </button>
          {this.state.submenuIndex === i && action.map(this.renderItems)}
        </div>
      );
    }
    return null;
  };

  render () {
    const {items} = this.props;

    return (
      <ul className="menu">
        {items.map(this.renderItems)}
      </ul>
    );
  }
}
