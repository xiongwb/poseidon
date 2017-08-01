/**
 * Created by zhangle on 2017/4/20.
 */

import * as service from '../../service/order/order';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'order',//唯一的
  state: {
    data:[],
    order:[],
    currentPage:1,
    loading:false,
    isSubmit:'',
  },
  reducers: {
    save(state,action) {
      return {...state,...action.payload,loading:false}
    },
    showLoading(state){
      return {...state,loading:true}
    },
    find(state,action) {
      return {...state,...action.payload}
    },
    father_add(state,action) {

      return {...state,...action.payload,a:1}
    },
    open(state,action) {

      return {...state,...action.payload,a:1}
    },
    open1(state,action) {

      return {...state,...action.payload}
    },
    close(state,action) {

      return {...state,...action.payload}
    },
    add(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },

    edit(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },

    loading_true(state,action) {
      return {...state,...action.payload,loading:true}
    },
    fail(){
      return { data:[]}
    },
    loading_false(state,action) {
      return {...state,...action.payload,loading:false}
    }
  },
  effects: {
    //查询订单的列表数据
    *findOrder({payload}, {call, put}) {

      console.log(112222211)
      const {data} = yield call(service.findOrder, payload);
      console.log(data,123)
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            data,

          },
        });
      } else {
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order') {
          dispatch({
            type: 'findOrder',
            payload:{
              page:1,
              size:10,
            }
          })
        }
      })
    }
  },


};
