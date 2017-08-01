/**
 * Created by cyt on 2017/4/12.
 */
import request from '../../utils/request';

export function findProdList(params) {
  return request('/api/prod/findProdList', 'POST', params,)
}
export function prodOffSell (params) {
  return request('/api/prod/prodOffSell', 'POST', params,)
}
export function findAttrs(params) {
  return request('/api/prod/findAttrs', 'POST', params,)
}
export function findAllKind(params) {
  return request('/api/kind/findAllKind', 'POST', params,)
}
