import { createStore, compose, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import status from 'store/status';
import errors from 'store/errors';
import pokemon from 'store/pokemon';
import auth from 'store/auth';

const reducers = combineReducers({
  errors,
  status,
  pokemon,
  auth
});

const store = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)(createStore)(reducers, {});

export default store;
