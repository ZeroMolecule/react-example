import Auth from 'models/Auth';
import AuthAPI from 'api/AuthAPI';
import { REQUEST_STATUS } from 'constants';
import firebase from 'api/firebase';

// Actions
const AUTH_PENDING = 'AUTH_PENDING';
const AUTH_FULFILLED = 'AUTH_FULFILLED';
const AUTH_REJECTED = 'AUTH_REJECTED';

// Reducer
export default function reducer (state = null, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case AUTH_FULFILLED:
      return payload;
    default:
      return state;
  }
}

// Action Creators
export const authPending = () => {
  return {type: AUTH_PENDING};
};

export const authFulfilled = (data) => {
  return {type: AUTH_FULFILLED, payload: data};
};

export const authRejected = (err) => {
  return {type: AUTH_REJECTED, payload: err};
};

// Side effects
export const signIn = () => async (dispatch) => {
  dispatch(authPending());
  try {
    const data = await AuthAPI.getLocalUser();
    return dispatch(authFulfilled(data));
  } catch (e) {
    return dispatch(authRejected(e));
  }
};

export const signOut = () => async (dispatch) => {
  dispatch(authPending());
  try {
    await firebase.auth().signOut();
    return dispatch(authFulfilled(null));
  } catch (e) {
    return dispatch(authRejected(e));
  }
};

// Selectors
export const getAuth = (state) => {
  const auth = state.auth || {};
  const {AUTH} = state.status;
  const authProcessFinished = AUTH === REQUEST_STATUS.FULFILLED || AUTH === REQUEST_STATUS.REJECTED;
  return new Auth(Object.assign(auth, {authProcessFinished}));
};
