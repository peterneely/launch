import * as types from './types';
import { clearErrors, setError } from './reducerUtils';

const initialState = {
  appReady: false,
  errors: {}, // errors keyed by domain (folder) name, like 'tiles' and 'settings'
  tiles: [], // bookmark tiles
};

const handleLoadTilesSuccess = (state, payload) => {
  const { bookmarksByFolderId, folder } = state;
  const { bookmarks, tiles } = payload;
  return {
    ...state,
    bookmarksByFolderId: {
      ...bookmarksByFolderId,
      [folder.id]: bookmarks,
    },
    errors: clearErrors({ key: 'tiles', state }),
    showSettings: !tiles.length,
    tiles
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.APP_LOAD_TILES_ERROR:
      return { ...state, errors: setError({ key: 'tiles', state, payload }) };
    case types.APP_LOAD_TILES_SUCCESS:
      return handleLoadTilesSuccess(state, payload);
    case types.APP_SET_APP_READY:
      return { ...state, appReady: true };
    default:
      return state;
  }
};
