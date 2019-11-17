import * as types from './types';

const initialState = {
  errors: {}, // errors keyed by domain (folder) name, like 'tiles' and 'settings'
  folders: [], // bookmark folders from which to choose a folder to create bookmark tiles
  foldersLoaded: false, // whether folders have been loaded
  tilesLoaded: false, // whether tiles have been loaded
  scrollUrl: null, // bookmark URL to scroll to in SettingsModal.ImagesList
  settings: { theme: {} }, // user settings, synced via Chrome sync or cached in local storage
  showSettings: false, // whether to show the settings modal
  tiles: [], // bookmark tiles
};

const clearErrors = ({ key, state }) => {
  const { errors: { [key]: errorsToRemove, ...restErrors } = {} } = state;
  return restErrors;
};

const setError = ({ key, state, payload }) => {
  const { errors } = state;
  const { error } = payload;
  return { ...errors, [key]: [...(errors[key] || {}), error] };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.APP_LOAD_FOLDERS_ERROR:
      return { ...state, errors: setError({ key: 'folders', state, payload }) };
    case types.APP_LOAD_FOLDERS_SUCCESS:
      return { ...state, ...payload, errors: clearErrors({ key: 'folders', state }), foldersLoaded: true };
    case types.APP_LOAD_TILES_ERROR:
      return { ...state, errors: setError({ key: 'tiles', state, payload }) };
    case types.APP_LOAD_TILES_SUCCESS:
      return { ...state, ...payload, errors: clearErrors({ key: 'tiles', state }), showSettings: !payload.tiles.length, tilesLoaded: true };
    case types.APP_SAVE_SETTINGS_ERROR:
      return { ...state, errors: setError({ key: 'settings', state, payload }) };
    case types.APP_SAVE_SETTINGS_SUCCESS:
      return { ...state, errors: clearErrors({ key: 'settings', state }) };
    case types.APP_TOGGLE_SETTINGS:
      return { ...state, scrollUrl: payload.url, showSettings: !state.showSettings };
    default:
      return state;
  }
};
