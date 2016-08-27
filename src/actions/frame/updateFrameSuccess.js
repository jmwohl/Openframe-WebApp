import {UPDATE_FRAME_SUCCESS} from './../const';

import { normalize } from 'normalizr';
import * as schema from '../schema';

module.exports = function(response) {
  return dispatch => {
    let frame = response;
    dispatch({ type: UPDATE_FRAME_SUCCESS, response: normalize(frame, schema.frame) });
  }
};