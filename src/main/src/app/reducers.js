import { combineReducers } from 'redux'
import { reducer as appReducer } from './reducer';
import { reducer as bookmarksReducer } from './bookmarks/reducer';
import { reducer as settingsReducer } from './settings/reducer';
import { reducer as tilesReducer } from './tiles/reducer';

export const reducersByDomain = combineReducers({
  app: appReducer,
  bookmarks: bookmarksReducer,
  settings: settingsReducer,
  tiles: tilesReducer,
});
