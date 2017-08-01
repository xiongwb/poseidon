import request from '../../utils/request';

export function findProdReturnList(params) {
  return request('/api/return/findProdReturnList', 'POST', params,)
}
export function ServiceAudit(params) {
  return request('/api/return/ServiceAudit ', 'POST', params,)
}
//确认收货
export function ConfirmReceiveProd(params) {
  return request('/api/return/ConfirmReceiveProd', 'POST', params,)
}
