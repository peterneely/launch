import { getLinkConfigs } from './links';
import * as types from './types'

export const getTiles = () => async dispatch => {
  try {
    const linkConfigs = await getLinkConfigs();
    dispatch({ type: types.APP_GET_TILES_SUCCESS, payload: linkConfigs });
  } catch (error) {
    dispatch({ type: types.APP_GET_TILES_ERROR, payload: error });
  }
};
