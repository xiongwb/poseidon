import request from '../../utils/request';

export function addRoleMenu(params) {
    return request('api/auth/addRoleMenu', 'POST', params, )
}
export function deleteRoleMenu(params) {
    return request('api/auth/deleteRoleMenu', 'POST', params, )
}
export function findRoleMenu(params) {
    return request('api/auth/findRoleMenu', 'POST', params, )
}
export function findAllRole(params) {
  return request('api/role/findAllRole', 'POST', params,)
}
export function findAllRoleMenu(params) {
  return request('api/auth/findAllRoleMenu', 'POST', params,)
}