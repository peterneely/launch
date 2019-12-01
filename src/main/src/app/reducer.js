import * as types from './types';

const initialState = {
  appReady: false,
  bookmarksByFolderId: {},
  errors: {}, // errors keyed by domain (folder) name, like 'tiles' and 'settings'
  folder: {},
  foldersById: {}, // bookmark folders from which to choose a folder to create bookmark tiles
  foldersLoaded: false, // whether folders have been loaded
  parentFolders: [],
  scrollToUrl: null, // bookmark URL to scroll to in SettingsModal.ImagesList
  settings: {}, // user settings, synced via Chrome sync or cached in local storage
  showSettings: false, // whether to show the settings modal
  tiles: [], // bookmark tiles
};

const clearErrors = ({ key, state }) => {
  const { errors: { [key]: errorsToRemove, ...restErrors } = {} } = state;
  return restErrors;
};

const handleLoadTilesSuccess = (state, payload) => {
  const { bookmarksByFolderId, folder } = state;
  const { bookmarks, tiles } = payload;
  return {
    ...state,
    bookmarksByFolderId: {
      ...bookmarksByFolderId,
      [folder.id]: bookmarks,
    },
    errors: clearErrors({ key: 'tiles', state }),
    showSettings: !tiles.length,
    tiles
  };
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
    case types.APP_LOAD_SETTINGS_ERROR:
      return { ...state, errors: setError({ key: 'settings', state, payload }) };
    case types.APP_LOAD_SETTINGS_SUCCESS:
      return { ...state, ...payload, errors: clearErrors({ key: 'settings', state }) };
    case types.APP_LOAD_TILES_ERROR:
      return { ...state, errors: setError({ key: 'tiles', state, payload }) };
    case types.APP_LOAD_TILES_SUCCESS:
      return handleLoadTilesSuccess(state, payload);
    case types.APP_SET_APP_READY:
      console.log('APP_SET_APP_READY');
      return { ...state, appReady: true };
    case types.APP_SET_FOLDER:
      return { ...state, folder: payload.folder };
    case types.APP_SAVE_SETTINGS_ERROR:
      return { ...state, errors: setError({ key: 'settings', state, payload }) };
    case types.APP_SAVE_SETTINGS_SUCCESS:
      return { ...state, errors: clearErrors({ key: 'settings', state }) };
    case types.APP_TOGGLE_SETTINGS:
      return { ...state, scrollToUrl: payload.scrollToUrl, showSettings: !state.showSettings };
    default:
      return state;
  }
};
