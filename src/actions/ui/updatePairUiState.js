import {UPDATE_PAIR_UI_STATE} from './../const';

module.exports = function(open) {
  return {
    type: UPDATE_PAIR_UI_STATE,
    open
  };
};
