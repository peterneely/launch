import * as types from './types';
import { clearErrors, setError } from '../reducerUtils';

const initialState = {
  errors: {}, // errors keyed by domain (folder) name, like 'tiles' and 'settings'
  foldersById: {}, // bookmark folders from which to choose a folder to create bookmark tiles
  foldersLoaded: false, // whether folders have been loaded
  scrollToUrl: null, // bookmark URL to scroll to in SettingsModal.ImagesList
  settings: {}, // user settings, synced via Chrome sync or cached in local storage
  showSettings: false, // whether to show the settings modal
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SETTINGS_LOAD_FOLDERS_ERROR:
      return { ...state, errors: setError({ key: 'folders', state, payload }) };
    case types.SETTINGS_LOAD_FOLDERS_SUCCESS:
      return { ...state, ...payload, errors: clearErrors({ key: 'folders', state }), foldersLoaded: true };
    case types.SETTINGS_LOAD_SETTINGS_ERROR:
      return { ...state, errors: setError({ key: 'settings', state, payload }) };
    case types.SETTINGS_LOAD_SETTINGS_SUCCESS:
      return { ...state, ...payload, errors: clearErrors({ key: 'settings', state }) };
    case types.SETTINGS_SAVE_SETTINGS_ERROR:
      return { ...state, errors: setError({ key: 'settings', state, payload }) };
    case types.SETTINGS_SAVE_SETTINGS_SUCCESS:
      return { ...state, errors: clearErrors({ key: 'settings', state }) };
    case types.SETTINGS_TOGGLE_SETTINGS:
      return { ...state, scrollToUrl: payload.scrollToUrl, showSettings: !state.showSettings };
    default:
      return state;
  }
};
