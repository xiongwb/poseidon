import request from '../../utils/request';

export function addMenu(params) {
  return request('api/menu/addMenu', 'POST', params,)
}
export function delMenu(params) {
    return request('api/menu/delMenu', 'POST', params, )
}
export function editMenu(params) {
    return request('api/menu/editMenu', 'POST', params, )
}
export function findAllMenu(params) {
    return request('api/menu/findAllMenu', 'POST', params, )
}
export function findMenu(params) {
    return request('api/menu/findMenu', 'POST', params, )
}