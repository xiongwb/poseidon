import request from '../../utils/request';

export function findRoleList(params) {
  return request('api/role/findRoleList', 'POST', params,)
}
export function findRole(params) {
    return request('api/role/findRole', 'POST', params, )
}
export function addRole(params) {
    return request('api/role/addRole', 'POST', params, )
}
export function editRole(params) {
    return request('api/role/editRole', 'POST', params, )
}
export function delRole(params) {
    return request('api/role/delRole', 'POST', params, )
}