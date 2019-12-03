import * as appActions from '../actions';
import * as bookmarkActions from '../bookmarks/actions';
import * as types from './types';
import { createTiles } from './factory';

export const loadTiles = ({ bookmarksByFolderId, folderId, savedSettings }) => async dispatch => {
  try {
    const bookmarks = bookmarksByFolderId[folderId] || (await dispatch(bookmarkActions.loadBookmarks(folderId, savedSettings)));
    const tiles = createTiles(bookmarks, savedSettings);
    dispatch({ type: types.TILES_LOAD_TILES_SUCCESS, payload: { tiles } });
    dispatch(appActions.setAppReady());
  } catch (error) {
    dispatch({ type: types.TILES_LOAD_TILES_ERROR, payload: { error } });
  }
};
