import * as types from './types';
import { assignPath, removePath } from '../utils/objects';

const initialState = {
  errorsByKey: {},
  scrollToUrl: null, // bookmark URL to scroll to in SettingsDialog.ImagesList
  savedSettings: {},
  showSettingsDialog: false,
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SETTINGS_LOAD_SETTINGS_ERROR:
      return { ...state, errorsByKey: assignPath({ object: state.errorsByKey, path: 'load', value: payload.error }) };
    case types.SETTINGS_LOAD_SETTINGS_SUCCESS:
      return { ...state, ...payload, errorsByKey: removePath({ object: state.errorsByKey, path: 'load' }) };
    case types.SETTINGS_SAVE_SETTINGS_ERROR:
      return { ...state, errorsByKey: assignPath({ object: state.errorsByKey, path: 'save', value: payload.error }) };
    case types.SETTINGS_SAVE_SETTINGS_SUCCESS:
      return { ...state, errorsByKey: removePath({ object: state.errorsByKey, path: 'save' }) };
    case types.SETTINGS_TOGGLE_SETTINGS:
      return { ...state, scrollToUrl: payload.scrollToUrl, showSettingsDialog: !state.showSettingsDialog };
    default:
      return state;
  }
};
