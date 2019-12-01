import * as types from './types';
import { createTiles } from './tiles/factory';
import { getBookmarks } from './browser';

export const loadTiles = ({ bookmarksByFolderId, settings, folderId: selectedFolderId = null }) => async dispatch => {
  try {
    const folderId = selectedFolderId || settings.folder.id;
    const bookmarks = bookmarksByFolderId[folderId] || (await getBookmarks(folderId, settings));
    const tiles = createTiles(bookmarks, settings);
    dispatch({ type: types.APP_LOAD_TILES_SUCCESS, payload: { bookmarks, tiles } });
    dispatch(setAppReady());
  } catch (error) {
    dispatch({ type: types.APP_LOAD_TILES_ERROR, payload: { error } });
  }
};

export const setAppReady = () => ({ type: types.APP_SET_APP_READY });
