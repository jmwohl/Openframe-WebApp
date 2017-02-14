/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ARTWORK_SUCCESS,
  CREATE_ARTWORK_FAILURE,
  UPDATE_ARTWORK_FAILURE,
  UPDATE_ARTWORK_SUCCESS,
  SELECT_FRAME,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_FRAME_SUCCESS,
  UPDATE_FRAME_FAILURE,
  UPDATE_FRAME_MANAGERS_SUCCESS,
  UPDATE_FRAME_MANAGERS_FAILURE,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,

  UPDATE_NOTICE_BANNER,
  UPDATE_VISIBLE_MODAL,
  UPDATE_SIDEBAR_STATE,
  UPDATE_PAIR_UI_STATE,

  FIX_BODY,
  UNFIX_BODY

} from '../actions/const';

const initialState = {
  sidebarOpen: false,
  visibleModal: null,
  visibleModal: null,
  modalError: null,
  fixBody: false,
  showAddFrameInput: false,
  // notice: {
  //   message: 'Where\'s the internet?',
  //   type: 'info',
  //   dismissible: true
  // }
  notice: null
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    // Modal-related
    case UPDATE_VISIBLE_MODAL: {
      return {
        ...state,
        visibleModal: action.modalSlug || null,
        modalError: null,
        fixBody: !!action.modalSlug
      }
    }

    // Sidebar-related
    case SELECT_FRAME:
    case UPDATE_SIDEBAR_STATE: {
      return {
        ...state,
        sidebarOpen: !!action.open,
        fixBody: !!action.open,
        showAddFrameInput: false
      };
    }
    case UPDATE_PAIR_UI_STATE: {
      return {
        ...state,
        showAddFrameInput: !!action.open
      };
    }
    case LOGIN_SUCCESS:
    case CREATE_ACCOUNT_SUCCESS:
    case CREATE_ARTWORK_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case UPDATE_ARTWORK_SUCCESS:
    case UPDATE_FRAME_SUCCESS:
    case UPDATE_FRAME_MANAGERS_SUCCESS: {
      // TODO: should the action creator for this trigger an updateVisibleModal action
      // rather than setting these here?
      return {
        ...state,
        visibleModal: null,
        modalError: null,
        fixBody: false,
        notice: action.notice
      }
    }

    case LOGIN_FAILURE:
    case CREATE_ACCOUNT_FAILURE:
    case CREATE_ARTWORK_FAILURE:
    case UPDATE_USER_FAILURE:
    case UPDATE_FRAME_FAILURE:
    case UPDATE_ARTWORK_FAILURE:
    case UPDATE_FRAME_MANAGERS_FAILURE:
    case PASSWORD_RESET_FAILURE: {
      return {
        ...state,
        modalError: action.error
      }
    }

    // on logout, set to initial UI state
    case LOGOUT_SUCCESS: {
      return {
        ...initialState
      }
    }

    case FIX_BODY:
      return {
        ...state,
        fixBody: true
      }
    case UNFIX_BODY:
      return {
        ...state,
        fixBody: false
      }

    case UPDATE_NOTICE_BANNER: {
      return {
        ...state,
        notice: action.notice
      }
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
