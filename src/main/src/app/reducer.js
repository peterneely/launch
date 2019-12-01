import * as types from './types';

const initialState = {
  appReady: false,
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
