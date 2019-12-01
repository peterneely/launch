import * as types from './types';
import { clearErrors, setError } from '../utils/objects';

const initialState = {
  errorsByKey: {},
  bookmarksByFolderId: {},
  folder: {},
  foldersById: {}, // bookmark folders from which to choose a folder to create bookmark tiles
  foldersLoaded: false, // whether folders have been loaded
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BOOKMARKS_LOAD_FOLDERS_ERROR:
      return { ...state, errorsByKey: setError({ key: 'load', state, payload }) };
    case types.BOOKMARKS_LOAD_FOLDERS_SUCCESS:
      return { ...state, ...payload, errorsByKey: clearErrors({ key: 'load', state }), foldersLoaded: true };
    case types.BOOKMARKS_SET_FOLDER:
        return { ...state, folder: payload.folder };
    default:
      return state;
  }
};
