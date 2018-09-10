import React, { PureComponent } from 'react';

export default class Hamburger extends PureComponent {
  render () {
    return (
      <button className="button button--clean" onClick={this.props.onClick}>
        <div className="hamburger">
          <div className="hamburger__item"/>
          <div className="hamburger__item"/>
          <div className="hamburger__item"/>
        </div>
      </button>
    );
  }
}
