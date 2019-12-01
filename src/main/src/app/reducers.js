import { combineReducers } from 'redux'
import { reducer as appReducer } from './reducer';
import { reducer as settingsReducer } from './settings/reducer';

export const reducersByDomain = combineReducers({
  app: appReducer,
  settings: settingsReducer,
});
