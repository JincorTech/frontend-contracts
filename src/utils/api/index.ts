import 'whatwg-fetch';
import { pathCreator, checkHttpStatus, parseJSON, authHeader } from './helpers';
// import * as i18n from 'i18next';

/**
 * Fetch wrapper function
 *
 * @param   path    - api endpoint
 * @param   options - fetch options
 * @returns         - promise
 */
function apiFetch(basePath: string, path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(pathCreator(basePath, path), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Locale': i18n.language,
      ...authHeader()
    },
    ...options
  })
    .then(checkHttpStatus)
    .then(parseJSON);
}

/**
 * Fetch wrapper for GET requests
 *
 * @param  path - endpoint
 * @return      - promise
 */
export function get(basePath: string, path: string): Promise<Response> {
  return apiFetch(basePath, path, {
    method: 'GET'
  });
}

/**
 * Fetch wrapper for POST requests
 *
 * @param path - endpoint
 * @param body - POST request body
 * @return     - promise
 */
export function post<T>(basePath: string, path: string, body: T): Promise<Response> {
  return apiFetch(basePath, path, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

/**
 * Fetch wrapper for PUT requests
 *
 * @param  path - endpoint
 * @param  body - PUT request body
 * @return      - promise
 */
export function put<T>(basePath: string, path: string, body: T): Promise<Response> {
  return apiFetch(basePath, path, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

/**
 *  Fetch wrapper for DELETE requests
 *
 * @param  path - endpoint
 * @return      - promise
 */
export function del(basePath: string, path: string): Promise<Response> {
  return apiFetch(basePath, path, {
    method: 'DELETE'
  });
}
