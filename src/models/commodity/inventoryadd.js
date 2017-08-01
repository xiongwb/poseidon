import * as service from '../../service/commodity/inventory_add';
import {message} from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'inventoryadd',//唯一的
  state: {
    data: [],
    dictNo: '',
  },
  reducers: {
    query(state, action) {
      return {...state, ...action.payload, loading: false}
    },

    loading_true(state, action) {
      return {...state, ...action.payload, loading: true, visible: false}
    },
    loading_false(state, action) {
      return {...state, ...action.payload, loading: false}
    },
    visible_true(state, action) {
      return {...state, ...action.payload, visible: true}
    },
    visible_false(state, action) {
      return {...state, ...action.payload, visible: false}
    },

  },
  effects: {
    //查询数据
    *findProdDetail  ({}, {call, put, select}) {
      yield put({type: 'loading_true',});
      const payload = yield select(({inventory}) => inventory.prodNo);
      const {data} = yield call(service.findProdDetail, {prodNo: payload, type: 2});
      console.log(data, 1)
      if (data && data.retCode == 1) {
        yield put({
          type: 'query',
          payload: {
            data,
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
    *addStock   ({payload}, {call, put}) {

      yield put({type: 'loading_true',});
      const {data} = yield call(service.addStock, payload);
      console.log(data, 1)
      if (data && data.retCode == 1) {
        yield put({
          type: 'findProdDetail',

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


    /*   *findDictDetail({ payload }, { call, put }) {
     const { data } = yield call(service.findDictDetail,payload);
     console.log(data,4)
     if(data && data.retCode == 1) {
     yield put({
     type: 'son_query',
     payload: {
     data,
     dictNo:payload
     },
     });
     }
     },
     *delDictDetail({ payload,dispatch,dictNo }, { call, put }) {
     const { data } = yield call(service.delDictDetail,payload);
     console.log(data,5)
     if(data && data.retCode == 1) {
     dispatch({
     type: 'system/findDictDetail',
     payload:{
     dictNo:payload.dictNo
     }
     })
     }
     },*/
  },


  subscriptions: {
    setup ({dispatch, history}) {

      history.listen(location => {
        if (location.pathname === '/Inventory/add') {
          dispatch({
            type: 'findProdDetail',

          })
        }
      })
    }
  },


};
