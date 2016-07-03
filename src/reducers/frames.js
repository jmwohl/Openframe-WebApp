/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  selectedFrame: localStorage.getItem('selected_frame') || null
};

module.exports = function(state = initialState, action) {
  switch(action.type) {

    case 'SELECT_FRAME':
      return {
        ...state,
        selectedFrame: action.frame_id
      };
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
