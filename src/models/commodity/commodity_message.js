/**
 * Created by cyt on 2017/4/13.
 */
import * as service from '../../service/commodity/commodity_message.js';
import { message } from 'antd';

export default {
  namespace: 'commodityMessage',//唯一的
  state: {
    data:[],
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
    *findProdDetail  ({}, { call, put,select }) {
      const record = yield select(({ commodity }) => commodity.record);


      const { data } = yield call(service.findProdDetail,{type:2,prodNo:record.prodNo,brcNo:1});
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


  },


  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/commodity/message') {
          dispatch({
            type: 'findProdDetail',

          })
        }
      })
    }
  },


};
