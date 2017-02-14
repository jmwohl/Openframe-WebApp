import {PAIR_FRAME_REQUEST} from './../const';
import pairFrameSuccess from './pairFrameSuccess';
import pairFrameFailure from './pairFrameFailure';
import {users} from '../../sources/api';

module.exports = function(pairingCode) {
  return dispatch => {
		dispatch({
			type: PAIR_FRAME_REQUEST
		});
		// fetchById defaults to 'current' user
		return users.pairFrame(pairingCode).then(
			response => dispatch(pairFrameSuccess(response)),
			error => dispatch(pairFrameFailure(error))
		);
	}
}
