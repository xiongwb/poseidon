import request from '../../utils/request';

export function findEvaList(params) {
  return request('/api/eva/findEvaList', 'POST', params,)
}
export function addReply (params) {
  return request('/api/eva/addReply', 'POST', params,)
}
