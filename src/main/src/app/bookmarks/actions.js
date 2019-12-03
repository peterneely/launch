import * as types from './types';
import { getBookmarks } from '../browser';
import { getFolders } from './actionUtils';

export const loadBookmarks = (folderId, savedSettings) => async dispatch => {
  try {
    const bookmarks = await getBookmarks(folderId, savedSettings);
    dispatch({ type: types.BOOKMARKS_LOAD_BOOKMARKS_SUCCESS, payload: { bookmarks, folderId } });
    return bookmarks;
  } catch (error) {
    dispatch({ type: types.BOOKMARKS_LOAD_BOOKMARKS_ERROR, payload: { error } });
    return [];
  }
};

export const loadFolders = () => async dispatch => {
  try {
    const foldersById = await getFolders();
    dispatch({ type: types.BOOKMARKS_LOAD_FOLDERS_SUCCESS, payload: { foldersById } });
  } catch (error) {
    dispatch({ type: types.BOOKMARKS_LOAD_FOLDERS_ERROR, payload: { error } });
  }
};

export const setFolder = ({ folder }) => ({ type: types.BOOKMARKS_SET_FOLDER, payload: { folder } });
