import * as types from './types';
import { getSettings, setSettings } from '../browser';

export const loadSettings = () => async dispatch => {
  try {
    const savedSettings = await getSettings();
    dispatch({ type: types.SETTINGS_LOAD_SETTINGS_SUCCESS, payload: { savedSettings } });
  } catch (error) {
    dispatch({ type: types.SETTINGS_LOAD_SETTINGS_ERROR, payload: { error } });
  }
}

export const saveSettings = formSettings => async dispatch => {
  try {
    await setSettings(formSettings);
    dispatch({ type: types.SETTINGS_SAVE_SETTINGS_SUCCESS });
  } catch (error) {
    dispatch({ type: types.SETTINGS_SAVE_SETTINGS_ERROR, payload: { error } });
  }
};

export const toggleSettings = (scrollToUrl = null) => ({ type: types.SETTINGS_TOGGLE_SETTINGS, payload: { scrollToUrl } });
