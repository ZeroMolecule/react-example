import { REQUEST_STATUS } from 'constants';

// Reducer
export default function reducer (state = {}, action = {}) {
  const {type} = action;
  const matches = new RegExp(`(.*)_(${Object.values(REQUEST_STATUS).join('|')})`).exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState
  };
}

//Util
export const shouldFetch = (state, prop) => {
  const status = state.status[prop];
  return status !== REQUEST_STATUS.FULFILLED && status !== REQUEST_STATUS.PENDING;
};
