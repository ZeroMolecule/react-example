import { REQUEST_STATUS } from 'constants';

// Reducer
export default function reducer (state = {}, action = {}) {
  const {type, payload} = action;
  const matches = new RegExp(`(.*)_(${REQUEST_STATUS.PENDING}|${REQUEST_STATUS.REJECTED})`).exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === REQUEST_STATUS.REJECTED ? payload.message : null
  };
}
