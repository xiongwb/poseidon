import * as service from '../../service/commodity/inventory';
import {message} from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'inventory',//唯一的
  state: {
    data: [],
    dictNo: '',
    prodNo: '',
    isSubmit: false
  },
  reducers: {
    query(state, action) {

      return {...state, ...action.payload, loading: false}
    },
    edit1(state, action) {
      return {...state, ...action.payload,}
    },
    findProdDetail(state, action) {
      console.log(action, 12)
      return {...state, ...action.payload,}
    },
    edit2(state, action) {
      return {...state, ...action.payload, isSubmit: true}
    },
    add(state, action) {
      return {...state, ...action.payload, isSubmit: true}
    },
    loading_true(state, action) {
      return {...state, ...action.payload, loading: true}
    },
    loading_false(state, action) {
      return {...state, ...action.payload, loading: false}
    }

  },
  effects: {
    //查询数据
    *prodList  ({payload}, {call, put}) {
      yield put({
        type: 'loading_true',
      });
      console.log(payload, 123)
      const {data} = yield call(service.prodList, payload);
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
    /*  *findProdDetail  ({ payload }, { call, put }) {
     console.log(data,1)
     const { data } = yield call(service.findProdDetail,payload);
     console.log(data,1)
     if(data && data.retCode == 1) {
     yield put({
     type: 'query',
     payload: {
     data,
     isSubmit:true
     },
     });
     }else {
     if (data) {
     message.error(data.retMsg);
     yield put({
     type: 'loading_false',
     });
     }else {
     // status ！= 200
     message.error('请检查您的网络');
     }
     yield put({
     type: 'hideLoad',
     });
     }
     },*/

  },


  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/inventory') {
          dispatch({
            type: 'prodList',
            payload: {
              supplierNo: 1,
              page: 1,
              size: 10,
            }
          })
        }
      })
    }
  },


};
