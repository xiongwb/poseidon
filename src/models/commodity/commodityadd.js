/**
 * Created by cyt on 2017/4/13.
 */
import * as service from '../../service/commodity/commodityadd';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'commodityadd',//唯一的
  state: {
    data:[],
    key:null,
    belong:null,
    expandedKeys: [],
    searchValue:'',
    autoExpandParent: true,
    increase:null,
    isSubmit:false
  },
  reducers: {
    query(state,action) {
      console.log(action,12)
      return {...state,...action.payload,loading:false,visible:false}
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
    add(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },
  },
  effects: {

    //查询所属分类数据
    *findAllKind ({ payload }, { call, put }) {
      const { data } = yield call(service.findAllKind,payload);
      console.log(data,1)
      if(data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            data,
            kindList:data
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
    //选择所属分类
    *findAttrs ({ payload }, { call, put }) {
      const { data } = yield call(service.findAttrs,payload);
      console.log(data,1)
      if(data && data.retCode == 1) {
        yield put({
          type: 'visible_false',
          payload: {
            increase:data,
            key:payload.kindNo
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
    //添加表单
    *addProd ({ payload }, { call, put }) {
      console.log(payload,3)
      const { data } = yield call(service.addProd,payload);
      console.log(data,3)
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

  },


  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/commodity/add') {
          dispatch({
            type: 'findAllKind',
          })
        }
      })
    }
  },


};
