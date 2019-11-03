import * as types from './types';

const initialState = {
  error: null,
  loaded: false,
  scrollUrl: null,
  settings: { theme: {} },
  showSettings: false,
  tiles: [],
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.APP_LOAD_TILES_ERROR:
      return { ...state, error: payload };
    case types.APP_LOAD_TILES_SUCCESS:
      return { ...state, ...payload, loaded: true };
    case types.APP_SAVE_SETTINGS_ERROR:
      return { ...state, error: payload };
    case types.APP_SAVE_SETTINGS_SUCCESS:
      return { ...state, error: null };
    case types.APP_TOGGLE_SETTINGS:
      return { ...state, scrollUrl: payload, showSettings: !state.showSettings };
    default:
      return state;
  }
};
