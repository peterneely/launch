import * as types from './types';
import { getFolders } from '../bookmarks/factory';
import { getSettings, setSettings } from '../browser';

export const loadFolders = () => async dispatch => {
  try {
    const foldersById = await getFolders();
    dispatch({ type: types.SETTINGS_LOAD_FOLDERS_SUCCESS, payload: { foldersById } });
  } catch (error) {
    dispatch({ type: types.SETTINGS_LOAD_FOLDERS_ERROR, payload: { error } });
  }
};

export const loadSettings = () => async dispatch => {
  try {
    const settings = await getSettings();
    dispatch({ type: types.SETTINGS_LOAD_SETTINGS_SUCCESS, payload: { settings } });
  } catch (error) {
    dispatch({ type: types.SETTINGS_LOAD_SETTINGS_ERROR, payload: { error } });
  }
}

export const saveSettings = settings => async dispatch => {
  try {
    await setSettings(settings);
    dispatch({ type: types.SETTINGS_SAVE_SETTINGS_SUCCESS });
  } catch (error) {
    dispatch({ type: types.SETTINGS_SAVE_SETTINGS_ERROR, payload: { error } });
  }
};

export const toggleSettings = (scrollToUrl = null) => ({ type: types.SETTINGS_TOGGLE_SETTINGS, payload: { scrollToUrl } });
