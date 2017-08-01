import * as service from '../../service/user/menu';
import { message } from 'antd';

export default {
    namespace: 'menu',//唯一的
    state: {
        data: [],
        loading: false,
        visible:false,
        addMenuId:null,
        editMenuId:null,
        editMenuName:null,
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
    },
    effects: {
        *findAllMenu({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findAllMenu,payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'save',
                    payload: {
                        data,
                        addMenuId: null,
                        editMenuId: null,
                        editMenuName: null
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
        *addMenu({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.addMenu,payload);
            if (data && data.retCode == 1) {
                message.success("添加成功")
                yield put({
                    type: 'findAllMenu'
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
        *editMenu({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.editMenu,payload);
            if (data && data.retCode == 1) {
                message.success("修改成功")
                yield put({
                    type: 'findAllMenu'
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
        *delMenu({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.delMenu,payload);
            if (data && data.retCode == 1) {
                message.success("删除成功")
                yield put({
                    type: 'findAllMenu'
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
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/menu') {
                    dispatch({
                        type: 'findAllMenu'
                    })
                }  
            })
        }
    },


};
