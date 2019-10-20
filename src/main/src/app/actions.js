import { getSettings, setSettings } from './browser';
import { createTiles } from './tiles/factory';
import * as types from './types';

export const loadTiles = () => async dispatch => {
  try {
    const settings = await getSettings();
    const tiles = await createTiles(settings);
    dispatch({ type: types.APP_LOAD_TILES_SUCCESS, payload: { settings, tiles } });
  } catch (error) {
    dispatch({ type: types.APP_LOAD_TILES_ERROR, payload: error });
  }
};

export const saveSettings = settings => async dispatch => {
  try {
    await setSettings(settings);
    dispatch({ type: types.APP_SAVE_SETTINGS_SUCCESS });
  } catch (error) {
    dispatch({ type: types.APP_SAVE_SETTINGS_ERROR, payload: error });
  }
};
