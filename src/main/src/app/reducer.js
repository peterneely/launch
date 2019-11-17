import * as types from './types';

const initialState = {
  error: null, // error when loading folders or tiles
  folder: null, // folder from which to create bookmark tiles
  folders: null, // bookmark folders from which to choose a folder to create bookmark tiles
  loaded: false, // whether folders or tiles have been loaded
  scrollUrl: null, // bookmark URL to scroll to in SettingsModal.ImagesList
  settings: { theme: {} }, // user settings, synced via Chrome sync or cached in local storage
  showSettings: false, // whether to show the settings modal
  tiles: [], // bookmark tiles
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.APP_LOAD_ERROR:
      return { ...state, error: payload };
    case types.APP_LOAD_SUCCESS:
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
