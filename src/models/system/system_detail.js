import * as service from '../../service/system/system_detail';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'systemDetail',//唯一的
  state: {
    data:[],
    dictNo:'',
    isSubmit:''
  },
  reducers: {
    query(state,action) {
      return {...state,...action.payload,loading:false}
    },

    add(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },
    edit1(state,action) {
      return {...state,...action.payload,}
    },
    edit2(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },
    loading_true(state,action) {
      return {...state,...action.payload,loading:true}
    },
    loading_false(state,action) {
      return {...state,...action.payload,loading:false}
    }
  },
  effects: {
    //查询子明细数据
    *findDictDetail ({}, { call, put,select}) {
     const payload = yield select(({ system }) => system.record.dictNo)
       const { data } = yield call(service.findDictDetail,{dictNo:payload});
        if(data && data.retCode == 1) {
          yield put({
            type: 'query',
            payload: {
              data,
              dictNo:payload
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
    //添加子明细数据
    *addDictDetail({ payload }, { call, put }) {
      yield put({
        type: 'loading_true',
      });
       const { data } = yield call(service.addDictDetail,payload);
        if(data && data.retCode == 1) {
        yield put({
            type: 'add',
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
    //修改子明细数据
    *editDictDetail({ payload }, { call, put }) {
      yield put({
        type: 'loading_true',
      });
      const { data } = yield call(service.editDictDetail,payload);
        if(data && data.retCode == 1) {
        yield put({
            type: 'edit2',
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
     //删除子明细数据
     *delDictDetail({ payload }, { call, put }) {
       yield put({
         type: 'loading_true',
       });
       const { data } = yield call(service.delDictDetail,payload);
        console.log(data,5)
        if(data && data.retCode == 1) {
          yield put({
            type: 'findDictDetail',
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
    setup ({ dispatch, history,select }) {
      history.listen(location => {

        if (location.pathname === '/system/detail') {
          dispatch({
            type: 'findDictDetail',
          })
        }
      })
    }
  },


};
