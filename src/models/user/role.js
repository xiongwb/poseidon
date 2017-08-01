import * as service from '../../service/user/role';
import { message } from 'antd';

export default {
    namespace: 'role',//唯一的
    state: {
        data: [],
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
        *findRoleList({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findRoleList,payload);
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
        *delRole({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.delRole, payload);
            if (data && data.retCode == 1) {
                message.success("删除成功");
                yield put({
                    type: 'findRoleList',
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
        *addRole({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.addRole, payload);
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
        *editRole({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.editRole, payload);
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
                if (location.pathname === '/roleList') {
                    dispatch({
                        type: 'findRoleList',
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
