import * as service from '../../service/user/privilege';
import { message } from 'antd';

export default {
    namespace: 'privilege',//唯一的
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
    },
    effects: {
        *getList({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findAllRoleMenu,payload);
            if (data && data.retCode == 1) {
                yield put({
                    type: 'save',
                    payload: {
                        roleList:data.roleList,
                        menuList:data.menuList
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
        *getHadMenus({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(service.findRoleMenu,payload);
            if (data && data.retCode == 1) {
                let roleMenuList = data.roleMenuList;
                let hadMenus = [];
                for(let i in roleMenuList){
                    hadMenus.push(roleMenuList[i].menuNo)
                }
                yield put({
                    type: 'save',
                    payload: {
                        hadMenus:hadMenus,
                        curMenu:payload.roleNo
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
        *setMenu({ payload }, { call, put, select }) {
            yield put({
                type: 'showLoading',
            });
            if(payload.checked){
                const {data} = yield call(service.addRoleMenu,{roleNo:payload.roleNo,menuNo:payload.menuNo});
                if (data && data.retCode == 1) {
                    yield put({
                        type: 'getHadMenus',
                        payload: {
                            roleNo:payload.roleNo
                        },
                    });
                    message.success("操作成功")
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
            }else{
                const {data} = yield call(service.deleteRoleMenu,{roleNo:payload.roleNo,menuNo:payload.menuNo});
                if (data && data.retCode == 1) {
                    yield put({
                        type: 'getHadMenus',
                        payload: {
                            roleNo:payload.roleNo
                        },
                    });
                    message.success("操作成功")
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
            }
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/privilege') {
                    dispatch({
                        type: 'getList'
                    })
                }  
            })
        }
    },


};
