import * as types from './types';
import { clearErrors, setError } from '../reducerUtils';

const initialState = {
  errorsByKey: {},
  tiles: [],
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
    errorsByKey: clearErrors({ key: 'load', state }),
    showSettings: !tiles.length,
    tiles
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.TILES_LOAD_TILES_ERROR:
      return { ...state, errorsByKey: setError({ key: 'load', state, payload }) };
    case types.TILES_LOAD_TILES_SUCCESS:
      return handleLoadTilesSuccess(state, payload);
    default:
      return state;
  }
};
