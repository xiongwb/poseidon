import request from '../../utils/request';

export function findUserList(params) {
  return request('api/emp/findEmpList', 'POST', params,)
}
export function findEmpAddOrEdit(params) {
    return request('api/emp/findEmpAddOrEdit', 'POST', params, )
}
export function findBrcNo(params) {
    return request('api/emp/findBrcNo', 'POST', params, )
}
export function addEmp(params) {
    return request('api/emp/addEmp', 'POST', params, )
}
export function editEmp(params) {
    return request('api/emp/editEmp', 'POST', params, )
}
export function delEmp(params) {
    return request('api/emp/delEmp', 'POST', params, )
}
export function editLoginPwd(params) {
    return request('api/emp/editLoginPwd', 'POST', params, )
}
export function findEmp(params) {
    return request('api/emp/findEmp', 'POST', params, )
}
