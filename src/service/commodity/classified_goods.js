import request from '../../utils/request';


//查询分类属性
export function findBrcSelectKind(params) {
  return request('/api/kind/findBrcSelectKind', 'POST', params,)
}
export function findProdSkuByKind(params) {
  return request('/api/prod/findProdSkuByKind', 'POST', params,)
}
export function addBrcSku(params) {
  return request('/api/prod/addBrcSku', 'POST', params,)
}
export function delBrcSku(params) {
  return request('/api/prod/delBrcSku', 'POST', params,)
}

