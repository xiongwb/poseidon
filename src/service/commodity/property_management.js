import request from '../../utils/request';

export function findAllKind() {
  return request('/api/kind/findAllKind','POST', )
}
export function findAttr(params) {
  return request('/api/prod/findAttr','POST', params,)
}
export function addKindAttr(params) {
  return request('/api/prod/addKindAttr','POST', params,)
}
export function delKindAttr(params) {
  return request('/api/prod/delKindAttr','POST', params,)
}
export function editKindAttr(params) {
  return request('/api/prod/editKindAttr','POST', params,)
}


