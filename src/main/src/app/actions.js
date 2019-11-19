import * as types from './types';
import { createTiles } from './tiles/factory';
import { getFolders } from './folders/factory';
import { getSettings, setSettings } from './browser';

export const loadFolders = () => async dispatch => {
  try {
    const foldersById = await getFolders();
    dispatch({ type: types.APP_LOAD_FOLDERS_SUCCESS, payload: { foldersById } });
  } catch (error) {
    dispatch({ type: types.APP_LOAD_FOLDERS_ERROR, payload: { error } });
  }
}

export const loadTiles = () => async dispatch => {
  try {
    const settings = await getSettings();
    const tiles = await createTiles(settings);
    dispatch({ type: types.APP_LOAD_TILES_SUCCESS, payload: { settings, tiles } });
  } catch (error) {
    dispatch({ type: types.APP_LOAD_TILES_ERROR, payload: { error } });
  }
};

export const saveSettings = settings => async dispatch => {
  try {
    await setSettings(settings);
    dispatch({ type: types.APP_SAVE_SETTINGS_SUCCESS });
    dispatch(loadTiles());
  } catch (error) {
    dispatch({ type: types.APP_SAVE_SETTINGS_ERROR, payload: { error } });
  }
};

export const toggleSettings = (url = null) => ({ type: types.APP_TOGGLE_SETTINGS, payload: { url } });
