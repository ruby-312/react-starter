import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router'
import { logoutUser } from './auth';
import { STATIC_ERROR, FETCH_USER, SEND_CONTACT_FORM, FETCH_USERS } from './types';
export const API_URL = 'http://localhost:3000/api';
export const CLIENT_ROOT_URL = 'http://localhost:8080';

//================================
// Utility actions
//================================

export function fetchUser(uid) {
  return function(dispatch) {
    axios.get(`${API_URL}/user/${uid}`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.users
      });
    })
    .catch(response => dispatch(errorHandler(response.data.error)))
  }
}

export function fetchUsers() {
  return function(dispatch) {
    axios.get(`${API_URL}/user`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_USERS,
        payload: response.data.user
      });
    })
    .catch(response => dispatch(errorHandler(response.data.error)))
  }
}

export function errorHandler(dispatch, error, type) {
  let errorMessage = (error.data.error) ? error.data.error : error.data;

   // NOT AUTHENTICATED ERROR
   if(error.status === 401) {
     errorMessage = 'You are not authorized to do this.';
   }

  dispatch({
    type: type,
    payload: errorMessage
  });
  //logoutUser();
}

// Post Request
export function postData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
  }

  axios.post(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType)
  });
}

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
  }

  axios.get(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType)
  });
}

// Put Request
export function putData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
  }

  axios.put(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType)
  });
}

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if(isAuthReq) {
    headers = {headers: { 'Authorization': cookie.load('token') }};
  }

  axios.delete(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType)
  });
}

//================================
// Static Page actions
//================================
export function sendContactForm(form) {
  return function(dispatch) {
    axios.post(`${API_URL}/communication/contact`, { form })
    .then(response => {
      dispatch({
        type: SEND_CONTACT_FORM,
        payload: response.data.message
      });
      browserHistory.push(CLIENT_ROOT_URL + '/contact-us');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, STATIC_ERROR)
    });
  }
}