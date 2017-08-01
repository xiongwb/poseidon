/**
 * Created by zhangle on 2017/4/19.
 */
import request from '../../utils/request';

//查询分类属性
export function findBrcSelectKind(params) {
  return request('/api/kind/findBrcSelectKind', 'POST', params,)
}
//查询商品
export function findProdByKind(params) {
  return request('/api//prod/findProdByKind', 'POST', params,)
}
//增加促销活动
export function addPomption(params) {
  return request('/api/promption/addPomption', 'POST', params,)
}
