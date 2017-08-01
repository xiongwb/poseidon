import * as service from '../../service/comment/comment';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'comment',//唯一的
  state: {
    data:[],
    currentPage:1,
    loading:false,
  },
  reducers: {
    save(state,action) {
      return {...state,...action.payload,loading:false}
    },
    showLoading(state){
      return {...state,loading:true}
    },
    showLoading_false(state){
      return {...state,loading:false}
    },
    findByEvaNo(state,action){
      return {...state, ...action.payload}
    },
    findByEvaNo(state,action){
      return {...state, ...action.payload,submit:true}
    }
  },
  effects: {
    *findEvaList({ payload }, { call, put }) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(service.findEvaList,payload);
      const currentPage = payload.page;
      console.log(data, 2)
      if(data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            data,
            currentPage,
          },
        });
      }else {
        if (data) {
          message.error(data.retMsg);
        }else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *addReply({ payload }, { call, put }) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(service.addReply,payload);
      const currentPage = payload.page;
      console.log(data, 2);
      if(data && data.retCode == 1) {
        yield put({
          type: 'submit',
        });
      }else {
        if (data) {
          message.error(data.retMsg);
          yield put({
            type: 'showLoading_false',
          });
        }else {
          // status ！= 200
          message.error('请检查您的网络');
          yield put({
            type: 'showLoading_false',
          });
        }
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/comment') {
          dispatch({
            type: 'findEvaList',
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
