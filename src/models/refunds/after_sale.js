import * as service from '../../service/refunds/after_sale';
import { message } from 'antd';
import { getLocalStorage } from '../../utils/helper'
import Storage from '../../utils/storage'
export default {
  namespace: 'afterSale',//唯一的
  state: {
    data:[],
    dictNo:'',
  },
  reducers: {
    query(state,action) {
      console.log(action,12);
      return {...state,...action.payload,loading:false,}
    },
    fail(){
      return { data:[]}
    },
    Audit(state,action) {
      return {...state,...action.payload,loading:false,isSubmit:true}
    },
    query1(state,action) {
      console.log(action,12);
      return {...state,...action.payload,loading:false,}
    },
  },
  effects: {
    //查询数据
    *findProdReturnList ({ payload }, { call, put }) {
      yield put({
        type: 'loading_true',
      });
      const { data } = yield call(service.findProdReturnList,payload);
      console.log(data,1);
      if(data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            data,
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
    },

    //确认收货
    *ConfirmReceiveProd ({ payload }, { call, put }) {

      const { data } = yield call(service.ConfirmReceiveProd,payload);
      console.log(payload,1);
      if(data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            data,
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
    },
    // 客服审核
    * ServiceAudit ({ payload }, { call, put }) {
      yield put({
        type: 'loading_true',
      });
      console.log(payload,2);
      const { data } = yield call(service. ServiceAudit,payload);
      console.log(data,1);
      if(data && data.retCode === 1) {
        yield put({
          type: 'Audit',
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
    },

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/after_sale') {
          if(getLocalStorage(Storage.DID_LOGIN).brcNo)
          {
            dispatch({
              type: 'findProdReturnList',
              payload: {
                page: 1,
                size: 10,
              }
            })
          }else{
            dispatch({
              type: 'findProdReturnList',
              payload: {
                page: 1,
                size: 10,
              }
            })
          }

        }
      })
    }
  },


};
