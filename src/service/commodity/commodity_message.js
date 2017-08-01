import request from '../../utils/request';
export function findProdDetail(params) {
  return request('/api/prod/findProdDetail', 'POST', params,)
}
