import 'isomorphic-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  const { status } = response;
  if (status === 204 || status === 205) {
    return null;
  }

  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  // 权限不允许则跳转到登陆页面
  if (status === 403 || status === 401) {
    // window ? (window.location = '/login.html') : null;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * @description 默认配置
 * 设置请求头为json
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  // credentials: 'include', // 跨域传递cookie
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = { ...defaultOptions.headers, ...options.headers };
    //   if (window.userInfo) {
    //     window.userInfo.stationId && (headers['X-Station-Id'] = window.userInfo.stationId)
    //   }
    let abortId;
    if (options.timeout) {
      abortId = setTimeout(() => {
        reject(new Error('timeout!'));
      }, options.timeout || 6000);
    }
    fetch(url, { ...defaultOptions, ...options, headers })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        clearTimeout(abortId);
        resolve(res);
      })
      .catch((e) => {
        clearTimeout(abortId);
        reject(e);
      });
  });
}
