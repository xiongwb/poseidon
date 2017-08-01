import request from '../../utils/request';


export function findDictDetail (params) {
  return request('/api/dict/findDictDetail', 'POST', params,)
}
export function delDictDetail (params) {
  return request('/api/dict/delDictDetail', 'POST', params,)
}
export function addDictDetail (params) {
  return request('/api/dict/addDictDetail', 'POST', params,)
}
export function editDictDetail (params) {
  return request('/api/dict/editDictDetail', 'POST', params,)
}