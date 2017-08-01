import * as service from '../../service/classification/classification_manage';
import {message} from 'antd';
export default {
  namespace: 'classificationManage',
  state: {
    data: [],
    selectList: [],
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload,loading:false}
    },
    add(state, action) {
      return {...state, ...action.payload}
    },
    delete(state, action) {
      return {...state, ...action.payload}
    },
    loading_true(state, action) {
      return {...state, ...action.payload,loading:true}
    },
    loading_false(state, action) {
      return {...state, ...action.payload,loading:false}
    },
    fail(){
      return {data: []}
    }
  },
  effects: {
    *findSelectKind({payload}, {call, put}) {
      const {data} = yield call(service.findSelectKind, payload);
      console.log("查找所有数据" + data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      } else {
      }
    },
    *addBrcKind({payload}, {call, put}) {
      yield put({type: 'loading_true',});
      const {data} = yield call(service.addBrcKind, payload);
      console.log(data, 2);
      if (data && data.retCode == 1) {
        yield put({
          type: 'findSelectKind',
          payload: {brcNo: 6}
        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'save',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
          yield put({
            type: 'save',
          });
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
    *delBrcKind ({payload}, {call, put}) {
      yield put({type: 'loading_true',});
      const {data} = yield call(service.delBrcKind, payload);
      console.log(data);
      if (data && data.retCode == 1) {
        yield put({
          type: 'findSelectKind',
          payload: {brcNo: 6}
        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'save',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
          yield put({
            type: 'save',
          });
        }
        yield put({
          type: 'hideLoad',
        });
      }
    }
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/classificationmanage') {
          dispatch({type: 'classificationManage/findSelectKind', payload: {brcNo: 6}});
        }
      })
    }
  },
};
