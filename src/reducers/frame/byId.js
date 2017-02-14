/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  FETCH_FRAMES_SUCCESS,
  PAIR_FRAME_SUCCESS,
  FRAME_UPDATED,
  UPDATE_FRAME_MANAGERS_SUCCESS,
  DELETE_FRAME_SUCCESS,
  REMOVE_FROM_FRAME_SUCCESS,
  LOGOUT_REQUEST
} from '../../actions/const'

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_FRAMES_SUCCESS:
    case UPDATE_FRAME_MANAGERS_SUCCESS:
    case PAIR_FRAME_SUCCESS:
    case FRAME_UPDATED: {
      return {
        ...state,
        ...action.response.entities.frame
      };
    }
    case LOGOUT_REQUEST: {
      return {};
    }
    case DELETE_FRAME_SUCCESS:
    case REMOVE_FROM_FRAME_SUCCESS: {
      let newState = {
        ...state
      };
      delete newState[action.frameId];
      return newState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}