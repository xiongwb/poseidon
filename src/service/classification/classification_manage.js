import request from '../../utils/request';

export function findSelectKind(params) {
  return request('/api/kind/findSelectKind','POST', params,)
}

export function addBrcKind(params) {
  return request('/api/kind/addBrcKind','POST', params,)
}

export function delBrcKind(params) {
  return request('/api/kind/delBrcKind','POST', params,)
}

