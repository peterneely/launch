import * as types from './types';
// import { clearErrors, setError } from './reducerUtils';

const initialState = {
  appReady: false,
  errors: {}, // errors keyed by domain (folder) name, like 'tiles' and 'settings'
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.APP_SET_APP_READY:
      return { ...state, appReady: true };
    default:
      return state;
  }
};
