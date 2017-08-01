import request from '../../utils/request';
export function findProdDetail(params) {
  return request('/api/prod/findProdDetail', 'POST', params,)
}
export function findAllKind(params) {
  return request('/api/kind/findAllKind', 'POST', params,)
}

export function findAttrs(params) {
  return request('/api/prod/findAttrs', 'POST', params,)
}

export function editProd (params) {
  return request('/api/prod/editProd', 'POST', params,)
}
