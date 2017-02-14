import {PAIR_FRAME_FAILURE} from './../const';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

module.exports = function(error) {
  return (dispatch) => {
    dispatch({ type: PAIR_FRAME_FAILURE, error });
    let notification = {
      message: 'Invalid pairing code. Please check the code and try again.',
      kind: 'danger',
      dismissAfter: 5000
    }
    dispatch(notifSend(notification));
  }
};
