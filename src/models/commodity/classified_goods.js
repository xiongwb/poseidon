/**
 * Created by cyt on 2017/4/13.
 */
import * as service from '../../service/commodity/classified_goods';
import { message } from 'antd';

export default {
  namespace: 'classifiedGoods',//唯一的
  state: {
    sukList:[],
    data:[],
    key:null,
    belong:null,
    expandedKeys: [],
    searchValue:'',
    autoExpandParent: true,
    increase:null,
    isSubmit:false,
    kindNo:''
  },
  reducers: {
    query(state,action) {
      console.log(action,12)
      return {...state,...action.payload,loading:false,}
    },
    checkedKeys(state,action) {
      return {...state,...action.payload,}
    },
    loading_true(state,action) {
      return {...state,...action.payload,loading:true}
    },
    loading_false(state,action) {
      return {...state,...action.payload,loading:false}
    },
    visible_true(state, action) {
      return {...state, ...action.payload, visible:true}
    },
    visible_false(state, action) {
      return {...state, ...action.payload, visible:false}
    },


  },
  effects: {
    //查询所属分类数据
    *findBrcSelectKind ({ payload }, { call, put }) {
      const { data } = yield call(service.findBrcSelectKind,payload);
      console.log(data,1)
      if(data && data.retCode == 1) {
        yield put({
          type: 'query',
          payload: {
            data,
            kindList:data,
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
    *findProdSkuByKind ({ payload }, { call, put }) {
      yield put({type: 'loading_true',});
      console.log(payload,7878)
      const { data } = yield call(service.findProdSkuByKind,payload);
      console.log(data,1)
      if(data && data.retCode == 1) {
        yield put({
          type: 'query',
          payload: {
            kindNo:payload.kindNo,
            sukList:data,
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
    *addBrcSku ({ payload }, { call, put,select }) {
      yield put({type: 'loading_true',});
      const { data } = yield call(service.addBrcSku,payload);
      const kindNo = yield select(({ classifiedGoods }) => classifiedGoods.kindNo);
      console.log(data,1);
      if(data && data.retCode == 1) {
        yield put({
          type: 'findProdSkuByKind',
          payload: {
            kindNo:kindNo,
            brcNo: 6
          }
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
    *delBrcSku ({ payload }, { call, put,select }) {
      yield put({type: 'loading_true',});
      const { data } = yield call(service.delBrcSku,payload);
      const kindNo = yield select(({ classifiedGoods }) => classifiedGoods.kindNo);
      console.log(data,1);
      if(data && data.retCode == 1) {
        yield put({
          type: 'findProdSkuByKind',
          payload: {
            kindNo:kindNo,
            brcNo: 6
          }
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
        if (location.pathname === '/classifiedgoods') {
          dispatch({
            type: 'findBrcSelectKind',
            payload:{
              brcNo:6,
            }
          })
        }
      })
    }
  },


};
