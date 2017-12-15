import { isAuth, getToken } from '../auth';

export type ErrorData = {
  message: string
  status_code: number
  errors?: ErrorMessages
  error?: string
  statusCode?: number
};

export type ErrorMessages = {
  [key: string]: string[]
};

export class RequestError extends Error {
  status: number;
  errors: ErrorMessages;

  constructor(error: ErrorData) {
    super(error.message || error.error);

    this.errors = error.errors;
    this.status = error.status_code || error.statusCode;
  }
}

/**
 * Create full path for backend api endpoints
 *
 * @param   endpoint - api endpoint path
 * @return         full path, including api host and version
 */
export function pathCreator(basePath: string, endpoint: string): string {
  const correctPath = endpoint[0] === '/' ? endpoint : `/${endpoint}`;
  return `${basePath}${correctPath}`;
}

/**
 * Checks response status.
 * If status code is not between 200 and 300 throws an error
 *
 * @param  response - http Response object
 * @return            http Response object
 */
export function checkHttpStatus(response: Response): Promise<any> | Response {
  if (response.ok) {
    return response;
  } else {
    return response.json();
  }
}

/**
 * Parse response body to json
 *
 * @param  response - http Response object
 * @return            http Response object
 */
export function parseJSON(response: Response | ErrorData): Promise<any> {
  if (response instanceof Response) {
    return response.json();
  }

  throw new RequestError(response);
}

export function authHeader(): { Authorization?: string } {
  return isAuth()
    ? { 'Authorization': `Bearer ${getToken()}` }
    : {};
}
