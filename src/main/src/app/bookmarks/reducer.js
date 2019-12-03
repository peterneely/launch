import * as types from './types';
import { assignPath, removePath } from '../utils/objects';

const initialState = {
  errorsByKey: {},
  bookmarksByFolderId: {},
  folder: {},
  foldersById: {},
  foldersLoaded: false, // whether folders have been loaded
};

const handleLoadBookmarksSuccess = (state, payload) => {
  const { bookmarksByFolderId, errorsByKey } = state;
  const { bookmarks, folderId } = payload;
  return {
    ...state,
    bookmarksByFolderId: {
      ...bookmarksByFolderId,
      [folderId]: bookmarks,
    },
    errorsByKey: removePath({ object: errorsByKey, path: 'bookmarks' }),
  };
};

const handleLoadFoldersSuccess = (state, payload) => {
  const { errorsByKey } = state;
  const { foldersById } = payload;
  return {
    ...state,
    errorsByKey: removePath({ object: errorsByKey, path: 'folders' }),
    foldersById,
    foldersLoaded: true,
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BOOKMARKS_LOAD_BOOKMARKS_ERROR:
      return { ...state, errorsByKey: assignPath({ object: state.errorsByKey, path: 'bookmarks', value: payload.error }) };
    case types.BOOKMARKS_LOAD_BOOKMARKS_SUCCESS:
      return handleLoadBookmarksSuccess(state, payload);
    case types.BOOKMARKS_LOAD_FOLDERS_ERROR:
      return { ...state, errorsByKey: assignPath({ object: state.errorsByKey, path: 'folders', value: payload.error }) };
    case types.BOOKMARKS_LOAD_FOLDERS_SUCCESS:
      return handleLoadFoldersSuccess(state, payload);
    case types.BOOKMARKS_SET_FOLDER:
      return { ...state, folder: payload.folder };
    default:
      return state;
  }
};
