import * as types from './types';
// import { createTiles } from './tiles/factory';
import { getFolders } from './folders/factory';
import { getSettings, setSettings } from './browser';

export const tryLoadTiles = () => async dispatch => {
  try {
    const settings = await getSettings();
    // const tiles = await createTiles(settings);
    const tiles = null;
    const folders = !tiles ? await getFolders() : null;
    dispatch({ type: types.APP_LOAD_SUCCESS, payload: { folders, settings, tiles } });
  } catch (error) {
    dispatch({ type: types.APP_LOAD_ERROR, payload: error });
  }
};

export const saveSettings = settings => async dispatch => {
  try {
    await setSettings(settings);
    dispatch({ type: types.APP_SAVE_SETTINGS_SUCCESS });
    dispatch(tryLoadTiles());
  } catch (error) {
    dispatch({ type: types.APP_SAVE_SETTINGS_ERROR, payload: error });
  }
};

export const toggleSettings = (url = null) => ({ type: types.APP_TOGGLE_SETTINGS, payload: url });
