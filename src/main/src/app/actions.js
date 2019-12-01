import * as types from './types';
import { createTiles } from './tiles/factory';
import { getFolders } from './bookmarks/factory';
import { getBookmarks, getSettings, setSettings } from './browser';

export const loadFolders = () => async dispatch => {
  try {
    const foldersById = await getFolders();
    dispatch({ type: types.APP_LOAD_FOLDERS_SUCCESS, payload: { foldersById } });
  } catch (error) {
    dispatch({ type: types.APP_LOAD_FOLDERS_ERROR, payload: { error } });
  }
};

export const loadSettings = () => async dispatch => {
  try {
    const settings = await getSettings();
    dispatch({ type: types.APP_LOAD_SETTINGS_SUCCESS, payload: { settings } });
  } catch (error) {
    dispatch({ type: types.APP_LOAD_SETTINGS_ERROR, payload: { error } });
  }
}

export const loadTiles = ({ bookmarksByFolderId, settings, folderId: selectedFolderId = null }) => async dispatch => {
  try {
    const folderId = selectedFolderId || settings.folder.id;
    const bookmarks = bookmarksByFolderId[folderId] || (await getBookmarks(folderId));
    const tiles = createTiles(bookmarks, settings);
    dispatch({ type: types.APP_LOAD_TILES_SUCCESS, payload: { bookmarks, tiles } });
    dispatch(setAppReady());
  } catch (error) {
    dispatch({ type: types.APP_LOAD_TILES_ERROR, payload: { error } });
  }
};

export const saveSettings = settings => async dispatch => {
  try {
    await setSettings(settings);
    dispatch({ type: types.APP_SAVE_SETTINGS_SUCCESS });
  } catch (error) {
    dispatch({ type: types.APP_SAVE_SETTINGS_ERROR, payload: { error } });
  }
};

export const setAppReady = () => ({ type: types.APP_SET_APP_READY });

export const setFolder = ({ folder, initialFolder = null }) => ({
  type: types.APP_SET_FOLDER,
  payload: { folder: initialFolder || folder },
});

export const toggleSettings = (scrollToUrl = null) => ({ type: types.APP_TOGGLE_SETTINGS, payload: { scrollToUrl } });
