import * as types from './types';
import { assignPath, removePath } from '../utils/objects';

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
    errorsByKey: removePath({ object: state.errorsByKey, path: 'load' }),
    showSettings: !tiles.length,
    tiles
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.TILES_LOAD_TILES_ERROR:
      return { ...state, errorsByKey: assignPath({ object: state.errorsByKey, path: 'load', value: payload.error }) };
    case types.TILES_LOAD_TILES_SUCCESS:
      return handleLoadTilesSuccess(state, payload);
    default:
      return state;
  }
};
