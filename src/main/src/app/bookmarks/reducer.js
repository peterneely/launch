import * as types from './types';
import { clearErrors, setError } from '../reducerUtils';

const initialState = {
  errors: {}, // errors keyed by domain (folder) name, like 'tiles' and 'settings'
  bookmarksByFolderId: {},
  folder: {},
  foldersById: {}, // bookmark folders from which to choose a folder to create bookmark tiles
  foldersLoaded: false, // whether folders have been loaded
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BOOKMARKS_LOAD_FOLDERS_ERROR:
      return { ...state, errors: setError({ key: 'folders', state, payload }) };
    case types.BOOKMARKS_LOAD_FOLDERS_SUCCESS:
      return { ...state, ...payload, errors: clearErrors({ key: 'folders', state }), foldersLoaded: true };
    case types.BOOKMARKS_SET_FOLDER:
        return { ...state, folder: payload.folder };
    default:
      return state;
  }
};
