import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import config from 'config';
import {getToken} from '../services/auth';


/**
 * Prepend the api base to url path via config
 * @param  {String} url
 * @return {String}
 */
function prependApiBase(url) {
  return `${config.apiBase}${url}`;
}

/**
 * If there is an access token present, append it to the conf as
 * a query param.
 * @param  {String} conf
 * @return {String}
 */
function appendAccessToken(conf, access_token) {
  let token = access_token || getToken();
  conf.headers.Authorization = token;
  conf.headers.access_token = token;
  return conf;
}

/**
 * Append query params
 * @param  {String} url
 * @param  {Object} data
 * @param  {String} format
 * @return {String}
 */
function appendFilterParams(url, data) {
  let encoded = 'filter=';
  encoded += JSON.stringify(data);
  return `${url}?${encoded}`;
}

/**
 * Check for error or success status, throw error on error status
 * @param  {Object} response
 * @return {Object}
 */
function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  return response.json().then(json => {
    const error = new Error(json.error && json.error.message || response.statusText)
    return Promise.reject(Object.assign(error, { response }))
  })
}

/**
 * Return the json response body as JS object
 * @param  {Object} response Raw fetch response object
 * @return {Object} JSON body as JS object
 */
function parseJSON(response) {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  });
}

/**
 * Light wrapper on fetch for JSON
 * @param  {String} url
 * @param  {String} options.method
 * @param  {Object} options.data
 * @return {Promise}
 */
export default function(url, { method = 'GET', data = {}, access_token = null } = {}) {
  return new Promise((resolve, reject) => {
    url = prependApiBase(url);
    let conf = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    conf = appendAccessToken(conf, access_token);
    if (method !== 'GET' && method !== 'OPTIONS') {
      conf.body = JSON.stringify(data);
    } else {
      url = appendFilterParams(url, data);
    }

    // on dev, add 1000ms delay to simulate loading
    // if (config.appEnv === 'dev') {
    //   _.delay(doFetch, 1000, url, conf);
    // } else {
    // }
    doFetch(url, conf);

    function doFetch(url, conf) {
      fetch(url, conf)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}