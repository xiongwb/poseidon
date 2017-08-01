import request from '../../utils/request';

export function findAllKind(params) {
  return request('/api/kind/findAllKind', 'POST', params,)
}

export function findAttrs(params) {
  return request('/api/prod/findAttrs', 'POST', params,)
}

export function addProd(params) {
  return request('/api/prod/addProd', 'POST', params,)
}
