/**
 * Created by zhangle on 2017/4/7.
 */
import request from '../../utils/request';
//查询促销活动列表数据
export function findPromptionList(params) {
  return request('/api/promption/findPromptionList', 'POST', params,)
}
//增加促销活动
export function addPomption(params) {
  return request('/api/promption/addPomption', 'POST', params,)
}
//开启促销活动
export function openPomption(params) {
  return request('/api/promption/openPomption', 'POST', params,)
}
//关闭促销活动
export function closePomption(params) {
  return request('/api/promption/closePomption', 'POST', params,)
}
//修改促销活动
export function editPomption(params) {
  return request('/api/promption/editPomption', 'POST', params,)
}
//查询促销活动详情
export function findPromptionDetail(params) {
  return request('/api/promption/findPromptionDetail', 'POST', params,)
}
//开启推荐促销活动
export function recommendPromption(params) {
  return request('/api/promption/recommendPromption', 'POST', params,)
}
//关闭推荐促销活动
export function cancelRecommendPromption(params) {
  return request('/api/promption/cancelRecommendPromption', 'POST', params,)
}

//查询分类属性
export function findBrcSelectKind(params) {
  return request('/api/kind/findBrcSelectKind', 'POST', params,)
}
//查询商品
export function findProdByKind(params) {
  return request('/api//prod/findProdByKind', 'POST', params,)
}
