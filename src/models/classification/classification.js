import * as service from '../../service/classification/classification';
import {message} from 'antd';
export default {
  namespace: 'classification',//唯一的
  state: {
    data: [],
    pkindNo: '',
    edit: '',
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  },
  reducers: {
    query(state, action) {
      return {...state, ...action.payload, loading: false,}
    },


    loading_true(state, action) {
      return {...state, ...action.payload, loading: true}
    },
    loading_false(state, action) {
      return {...state, ...action.payload, loading: false}
    },
    visible_father_true(state, action) {
      return {...state, ...action.payload, visible_father_add: true,}
    },
    visible_son_true(state, action) {
      return {...state, ...action.payload, visible_son_add: true,}
    },
    visible_false(state, action) {
      return {...state, ...action.payload, visible_father_add: false, visible_edit: false, visible_son_add: false}
    },
    edit_data(state, action) {
      return {...state, ...action.payload, visible_edit: true, loading: false,setvalue:true}
    },
    empty_false(state, action) {
      return {...state, ...action.payload, empty: false}
    },


  },
  effects: {
    *findKind ({payload}, {call, put}) {
      const {data} = yield call(service.findKind, payload);
      console.log(data, 2)
      if (data && data.retCode == 1) {
        yield put({
          type: 'query',
          payload: {
            data,
            kindList: data
          },
        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'loading_false',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
    *addKind ({payload}, {call, put}) {
      yield put({type: 'loading_true'});
      const {data} = yield call(service.addKind, payload);
      console.log(data, 2)
      if (data && data.retCode == 1) {
        yield put({type: 'visible_false',});
        yield put({
          type: 'findKind',
        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'loading_false',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
    *delKind({payload}, {call, put}) {
      yield put({type: 'loading_true'});
      const {data} = yield call(service.delKind, payload);
      console.log(data, 3)
      if (data && data.retCode == 1) {
        yield put({
          type: 'findKind',

        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'loading_false',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
    *findKindDetail({payload}, {call, put}) {
      yield put({type: 'loading_true'});
      const {data} = yield call(service.findKindDetail, payload);
      console.log(data, 3)
      if (data && data.retCode == 1) {

        yield put({
          type: 'edit_data',
          payload: {
            edit: data,
            kindNo: payload.kindNo
          },
        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'loading_false',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
    *editKind({payload}, {call, put}) {
      yield put({type: 'loading_true'});
      const {data} = yield call(service.editKind, payload);
      console.log(data, 3)
      if (data && data.retCode == 1) {
        yield put({type: 'visible_false',});
        yield put({
          type: 'findKind',

        });
      } else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'loading_false',
          });
        } else {
          // status ！= 200
          message.error('请检查您的网络');
          yield put({
            type: 'loading_false',
          });
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
  },


  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/classification') {
          dispatch({
            type: 'findKind',

          })
        }
      })
    }
  },


};
