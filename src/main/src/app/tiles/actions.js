import * as appActions from '../actions';
import * as bookmarksActions from '../bookmarks/actions';
import * as types from './types';
import { createTiles } from './factory';

export const loadTiles = ({ bookmarksByFolderId, folderId, savedSettings }) => async dispatch => {
  try {
    const bookmarks = bookmarksByFolderId[folderId] || (await dispatch(bookmarksActions.loadBookmarks(folderId, savedSettings)));
    const tiles = createTiles(bookmarks, savedSettings);
    dispatch({ type: types.TILES_LOAD_TILES_SUCCESS, payload: { tiles } });
    dispatch(appActions.setAppReady());
  } catch (error) {
    dispatch({ type: types.TILES_LOAD_TILES_ERROR, payload: { error } });
  }
};
