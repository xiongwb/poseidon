import * as service from '../../service/login/login';
import {setLocalStorage} from '../../utils/helper'
import { message } from 'antd';
import Storage from '../../utils/storage'

export default {
  namespace: 'login',//唯一的
  state: {
    data:[],
    loading:false,
  },
  reducers: {
    save(state,{payload:data}) {
      return {...state,data:data,loading:false}
    },
    showLoad(state) {
      return {...state,loading:true}
    },
    hideLoad(state) {
      return {...state,loading:false}
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.login,payload);
      if(data && data.retCode == 1) {
        setLocalStorage(Storage.DID_LOGIN,data);
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      }else {
        if (data) {
          message.error(data.retMsg);
        }else {
          // status ！= 200
          message.error('请检查您的网络');

        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
  },
};
