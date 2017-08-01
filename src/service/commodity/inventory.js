import request from '../../utils/request';

export function prodList (params) {
  return request('/api/prod/prodList ', 'POST', params,)
}
export function addDict(params) {

  return request('/api/dict/addDict', 'POST', params,)
}
export function editDict(params) {
  return request('/api/dict/editDict', 'POST', params,)
}
export function delDict (params) {
  return request('/api/dict/delDict', 'POST', params,)
}

export function findProdDetail(params) {
  return request('/api/prod/findProdDetail', 'POST', params,)
}
