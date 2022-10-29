import axios from 'axios';
import { returnStatus } from './statusActions';

import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, AUTH_SUCCESS, AUTH_FAIL, LOGOUT_SUCCESS, IS_LOADING } from './types';

//Uncomment below for local testing
// axios.defaults.baseURL = "http://localhost:5001";

//uncomment and set url to your own for prod
axios.defaults.baseURL = 'https://www.klayuniversewallet.com';

//Check if user is already logged in
export const isAuth = () => (dispatch) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5001',
      'Access-Control-Allow-Credentials': true,
    },
  };

  axios
    .get('/api/users/authchecker', { headers })
    .then((res) =>
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: AUTH_FAIL,
      });
    });
};

//Register New User
export const register = (data) => (dispatch) => {
  // Headers
  const headers = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': 'http://localhost:5001',
      'Access-Control-Allow-Credentials': true,
      Vary: 'Origin',
    },
  };

  // Request body
  const body = JSON.stringify(data);

  axios
    .post('/api/users/register', body, headers)
    .then((res) => {
      dispatch(returnStatus(res.data, res.status, 'REGISTER_SUCCESS'));
      dispatch({ type: IS_LOADING });
    })
    .catch((err) => {
      dispatch(returnStatus(err?.response?.data, err?.response?.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({ type: IS_LOADING });
    });
};

//Login User
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // Headers
    const headers = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': 'http://localhost:5001',
        'Access-Control-Allow-Credentials': true,
        Vary: 'Origin',
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post('/api/users/login', body, headers)
      .then((res) => {
        console.log(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({ type: IS_LOADING });
      })
      .catch((err) => {
        dispatch(returnStatus(err?.response?.data, err?.response?.status, 'LOGIN_FAIL'));
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({ type: IS_LOADING });
      });
  };

//Logout User and Destroy session
export const logout = () => (dispatch) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5001',
      'Access-Control-Allow-Credentials': true,
      Vary: 'Origin',
    },
  };

  axios
    .delete('/api/users/logout', { headers })
    .then((res) =>
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};
