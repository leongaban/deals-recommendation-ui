/* eslint-disable no-console */
import axios from 'axios';

// Firebase config.
import { apiConfig } from 'services/firebase';

// Utils & Factories
import { getUserToken } from 'factories/tokenFactory';

// Errors
import { API_ERRORS } from 'copy/Global/errors';

// Actions
import { toggleNotification } from 'actions/Notifications';

// Redux Store
import store from 'store';
// Dispatch
const { dispatch } = store;

/**
 * Decorates the headers for a request.
 * @param {string} token The firebase token.
 * @return {!Object} The decorated headers object.
 */
const decorateHeaders = token => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});

export const defaultCatch = (endPoint, source = 'services') => (e) => {
  console.error(`${source}/${endPoint}`, e);
  dispatch(toggleNotification(e.message, 'error'));
  throw e;
};

/**
 * Request wrapper for all request types (GET, POST, PUT, DELETE, etc).
 * @param {string} url The URL for the request.
 * @param {string} method The method (GET, POST, etc) for the request.
 * @param {!Object} payload Optional payload.
 * @return {!Promise} Promise containing the axios response.
 */
export const makeRequest = (url, method = 'get', payload = null, pathIsAbsolute = false) =>
  Promise.all([
    getUserToken(),
    apiConfig
  ])
    .then(([token, { apiHost, apiVersion }]) => ({
      headers: decorateHeaders(token),
      method,
      url: `${apiHost}${pathIsAbsolute ? '' : `/${apiVersion}`}${url}`,
      ...(
        payload ? { data: payload } : {}
      )
    }))
    .then(axios)
    .then((res) => {
      if (res && (res.status >= 200 || res.status < 400)) {
        return res;
      }
      throw new Error(API_ERRORS.BAD_REQUEST);
    })
    .then((res) => {
      if ('location' in res.headers) return makeRequest(res.headers.location, 'GET', null, true);
      return res;
    });
