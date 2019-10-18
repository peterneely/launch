import * as types from './types';

const initialState = {
  error: null,
  tiles: [],
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.APP_GET_TILES_ERROR:
      return { ...state, error: payload }
    case types.APP_GET_TILES_SUCCESS:
      return { ...state, tiles: payload }
    default:
      return state;
  }
};
