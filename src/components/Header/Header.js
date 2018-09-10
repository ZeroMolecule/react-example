import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import SearchBar from 'components/Header/SearchBar';
import { paths } from 'routes';
import { getPokemon } from 'store/pokemon';
import Hamburger from 'components/Header/Hamburger';
import Menu from 'components/Header/Menu';
import { getAuth, signOut } from 'store/auth';

class Header extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  state = {
    showMenu: false,
  };

  getMenuItems = () => {
    const {t, i18n, auth} = this.props;
    const userAction = auth.isAuthenticated()
      ? [t('menu.signOut'), this.onSignOut]
      : [t('menu.signIn'), paths.signIn()];

    return [
      [t('menu.homepage'), paths.index()],
      userAction,
      [`${t('menu.language')} (${i18n.language.toUpperCase()})`,
        Object.keys(i18n.store.data).map(lang => [lang.toUpperCase(), this.onLanguageChange])],
      [t('menu.about'), paths.about()],
    ];
  };

  onLanguageChange = (e) => {
    this.props.i18n.changeLanguage(e.target.innerText.toLowerCase());
  };

  onSignOut = () => {
    this.props.signOut();
  };

  onChange = (e) => {
    const {location, history, pokemon} = this.props;
    const pokemonListPath = paths.pokemonList();

    if (location.pathname !== pokemonListPath) {
      if (pokemon.filterBySearch(e.target.value).length !== 1) {
        history.push(pokemonListPath);
      }
    }
  };

  onHamburgerClick = () => {
    this.setState(({showMenu}) => ({
      showMenu: !showMenu,
    }));
  };

  render () {
    const {auth} = this.props;

    return (
      <div className="header">
        <SearchBar onChange={this.onChange}/>
        <div className="header__actions">
          {auth.isAuthenticated() && (
            <img className="header__profile-icon" srcSet={`${auth.profileImage}`}/>
          )}
          <Hamburger onClick={this.onHamburgerClick}/>
          {this.state.showMenu && (
            <div ref={this.menu} className="header__menu">
              <Menu items={this.getMenuItems()}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemon: getPokemon(state),
  auth: getAuth(state),
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

export default compose(
  translate(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
