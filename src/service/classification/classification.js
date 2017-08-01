import request from '../../utils/request';

export function findKind(params) {
  return request('/api/kind/findKind','POST', params,)
}

export function addKind(params) {
  return request('/api/kind/addKind','POST', params,)
}

export function delKind(params) {
  return request('/api/kind/delKind','POST', params,)
}

export function findKindDetail(params) {
  return request('/api/kind/findKindDetail','POST', params,)
}
export function editKind (params) {
  return request('/api/kind/editKind','POST', params,)
}




