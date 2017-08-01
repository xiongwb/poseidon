import * as service from '../../service/user/user';
import { message } from 'antd';
import Storage from '../../utils/storage'
import { getLocalStorage } from '../../utils/helper'
export default {
    namespace: 'user',//唯一的
    state: {
        data: [],
        currentPage: 1,
        loading: false,
        visible:false,
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload, loading: false }
        },
        showLoading(state) {
            return { ...state, loading: true }
        },
        hideLoading(state) {
            return { ...state, loading: false }
        },
        mergeSuccess(state) {
            return { ...state, loading: false, mergeFlag:true }
        }
    },
    effects: {
        *findUserList({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findUserList,payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'save',
                    payload: {
                        data
                    },
                });
            } else {
                if (data) {
                    message.error(data.retMsg);
                    yield put({
                        type: 'hideLoading',
                    });
                } else {
                    // status ！= 200
                    message.error('请检查您的网络');
                    yield put({
                        type: 'hideLoading',
                    });
                }
            }
        },
        *userAdd({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findEmpAddOrEdit, payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'save',
                    payload: {
                        data
                    },
                });
            } else {
                if (data) {
                    message.error(data.retMsg);
                } else {
                    // status ！= 200
                    message.error('请检查您的网络');
                }
            }
        },
        *userEdit({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findEmpAddOrEdit, payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'save',
                    payload: {
                        data
                    },
                });
            } else {
                if (data) {
                    message.error(data.retMsg);
                } else {
                    // status ！= 200
                    message.error('请检查您的网络');
                }
            }
        },
        *userDelete({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.delEmp, payload);
            if (data && data.retCode == 1) {
                message.success("删除成功");
                yield put({
                    type: 'findUserList',
                    payload: {
                        page: 1,
                        size: 10,
                    }
                });
            } else {
                if (data) {
                    message.error(data.retMsg);
                } else {
                    // status ！= 200
                    message.error('请检查您的网络');
                }
            }
        },
        *findBrcNo({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findBrcNo, payload);
            yield put({
                type: 'save',
                payload: {
                    productOrShopNoList: data
                },
            });
        },
        *addUser({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.addEmp, payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'mergeSuccess',
                });
                message.success("添加成功");
            } else {
                if (data) {
                    message.error(data.retMsg);
                } else {
                    // status ！= 200
                    message.error('请检查您的网络');
                }
            }
        },
        *editUser({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.editEmp, payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'mergeSuccess',
                });
                message.success("修改成功");
            } else {
                if (data) {
                    message.error(data.retMsg);
                } else {
                    // status ！= 200
                    message.error('请检查您的网络');
                }
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/userList') {
                    dispatch({
                        type: 'findUserList',
                        payload: {
                            page: 1,
                            size: 10,
                        }
                    })
                }  
            })
        }
    },


};
