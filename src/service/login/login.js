import request from '../../utils/request';

export function login(params) {
  return request('/api/login/login', 'POST', params,)
}
