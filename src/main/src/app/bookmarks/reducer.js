import * as types from './types';
import { assignPath, removePath } from '../utils/objects';

const initialState = {
  errorsByKey: {},
  bookmarksByFolderId: {},
  folder: {},
  foldersById: {},
  foldersLoaded: false, // whether folders have been loaded
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BOOKMARKS_LOAD_BOOKMARKS_SUCCESS:
      return {
        ...state,
        bookmarksByFolderId: {
          ...state.bookmarksByFolderId,
          [payload.folderId]: payload.bookmarks
        }
      }
    case types.BOOKMARKS_LOAD_FOLDERS_ERROR:
      return { ...state, errorsByKey: assignPath({ object: state.errorsByKey, path: 'load', value: payload.error }) };
    case types.BOOKMARKS_LOAD_FOLDERS_SUCCESS:
      return {
        ...state,
        errorsByKey: removePath({ object: state.errorsByKey, path: 'load' }),
        foldersById: payload.foldersById,
        foldersLoaded: true,
      };
    case types.BOOKMARKS_SET_FOLDER:
      return { ...state, folder: payload.folder };
    default:
      return state;
  }
};
