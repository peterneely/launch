import * as types from './types';
import { getFolders } from '../bookmarks/factory';

export const loadFolders = () => async dispatch => {
  try {
    const foldersById = await getFolders();
    dispatch({ type: types.BOOKMARKS_LOAD_FOLDERS_SUCCESS, payload: { foldersById } });
  } catch (error) {
    dispatch({ type: types.BOOKMARKS_LOAD_FOLDERS_ERROR, payload: { error } });
  }
};

export const setFolder = ({ folder, initialFolder = null }) => ({
  type: types.BOOKMARKS_SET_FOLDER,
  payload: { folder: initialFolder || folder },
});
