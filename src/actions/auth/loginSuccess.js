import { browserHistory } from 'react-router';
import {LOGIN_SUCCESS} from './../const';
import {setToken} from '../../services/auth';
import fetchCurrentUserRequest from '../user/fetchCurrentUserRequest';
import fetchFramesRequest from '../frame/fetchFramesRequest';
import fetchConfigRequest from '../config/fetchConfigRequest';
module.exports = function(token) {
  // set accesToken on localStorage
  setToken(token.id);

  browserHistory.push('/');

  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      token
    });

    dispatch(fetchConfigRequest());
    dispatch(fetchCurrentUserRequest());
    dispatch(fetchFramesRequest());

  };
};