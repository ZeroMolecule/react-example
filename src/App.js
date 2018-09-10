import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import store from 'store';
import firebase from 'api/firebase';
import { Components, paths } from 'routes';
import Header from 'components/Header';
import SearchProvider from 'components/Header/SearchProvider';
import i18n from 'strings';
import { signIn } from 'store/auth';
import PrivateRoute from 'components/PrivateRoute';

firebase.initFirestore();

class App extends Component {
  componentDidMount () {
    store.dispatch(signIn());
  }

  render () {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SearchProvider>
            <BrowserRouter>
              <Fragment>
                <Header/>
                <Switch>
                  <Redirect exact from='/' to={paths.pokemonList()}/>
                  <PrivateRoute path={paths.pokemonCreate()} component={Components.PokemonCreate}/>
                  <Route path={paths.pokemonDetails()} component={Components.PokemonDetails}/>
                  <Route path={paths.pokemonList()} component={Components.PokemonList}/>
                  <Route path={paths.signIn()} component={Components.SignIn}/>
                  <Route component={Components.NoMatch}/>
                </Switch>
              </Fragment>
            </BrowserRouter>
          </SearchProvider>
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;

