import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  // console.log("失败"+error);
  error.response = response;
  return error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(url, method, params) {
// 只有post请求
  let form_data = new FormData();
  for (let key in params) {
    let value = params[key];
    form_data.append(key, value)
  }
  console.log(url);

  return fetch(url, {
    method:method,
    body:form_data,
  }).then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));

//  如果有get或者其他请求方式，需要判断
  // get请求
  // return fetch(url)
  //   .then(checkStatus)
  //   .then(parseJSON)
  //   .then(data => ({ data }))
  //   .catch(err => ({ err }));

}

