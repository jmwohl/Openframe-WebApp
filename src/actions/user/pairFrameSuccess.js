import {PAIR_FRAME_SUCCESS} from './../const';
import selectFrame from '../frame/selectFrame';
import frameUpdated from '../frame/frameUpdated';
import updatePairUiState from '../ui/updatePairUiState';
import { bindEventToAction } from '../../services/pubsub';
import { normalize } from 'normalizr';
import * as schema from '../schema';

import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

module.exports = function(response) {
  let frame = response.frame;
  return (dispatch) => {
    dispatch({ type: PAIR_FRAME_SUCCESS, response: normalize(frame, schema.frame) });
    let notification = {
      message: 'Frame paired!',
      type: 'success',
      dismissAfter: 5000
    }
    bindEventToAction('/frame/' + frame.id + '/db_updated', frameUpdated);
    dispatch(notifSend(notification));
    dispatch(selectFrame(frame.id));
    dispatch(updatePairUiState(false));
  }
};