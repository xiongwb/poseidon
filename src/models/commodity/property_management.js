import * as service from '../../service/commodity/property_management';
import {setLocalStorage} from '../../utils/helper'
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'propertyManagement',
  state: {
    data:[],
   showAttribute:true,
   visibility:false,
   loading:true,
    prodAttrList:[]
  },
  reducers: {
    save(state,action) {
      return {...state,...action.payload,loading:false}
    },
    lookup(state,action) {
      return {...state,...action.payload.data,loading:false,showAttribute:false}
    },
    preservation(state,action) {

      return {...state,...action.payload.data,loading:false,showAttribute:false}
    },
    delete(state,action) {

      return {...state,...action.payload.data,loading:false,showAttribute:false}
    },
    edit(state,action) {
      return {...state,...action.payload.data,loading:false,showAttribute:false}
    },
    input_true(state,action) {
      return {...state,visibility:true}
    },
    input_false(state,action) {
      return {...state,visibility:false}
    },
    addbutton(state,action) {
      return {...state,showAttribute:true}
    },
    spin_true(state,action) {
      return {...state,loading:true}
    },
    spin_false(state,action) {
      return {...state,loading:false}
    },
  },
  effects: {
    *findAllKind({}, { call, put }) {
      const { data } = yield call(service.findAllKind,);
        console.log(data)
      if(data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      }else {
        if (data) {
          message.error(data.retMsg);
        }else {
          // status ！= 200
          message.error('请检查您的网络');
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
    *findAttr({payload}, { call, put }) {
      yield put({
        type: 'spin_true',
      });
      const { data } = yield call(service.findAttr,payload);
      console.log(data)
      if(data && data.retCode == 1) {

        yield put({
          type: 'lookup',
          payload: {
             data,
          },
        });
      }else {
        if (data) {
          message.error(data.retMsg);
             yield put({
              type: 'spin_false',

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
    *addKindAttr({payload}, { call, put }) {
      yield put({
        type: 'spin_true',
      });
      const { data } = yield call(service.addKindAttr,payload);
      console.log(data,1)
      if(data && data.retCode == 1) {
        yield put({
          type: 'preservation',
         payload: {
             data,
          },
        });
      }else {
        if (data) {
          message.error(data.retMsg);
             yield put({
              type: 'spin_false',

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
    *delKindAttr({payload}, { call, put }) {
      yield put({
        type: 'spin_true',
      });
      const { data } = yield call(service.delKindAttr,payload);

      if(data && data.retCode === 1) {
        yield put({
          type: 'delete',
         payload: {
             data,
          },
          });
       }else {
        if (data) {
          message.error(data.retMsg);
            yield put({
              type: 'spin_false',

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
    *editKindAttr({payload}, { call, put }) {
      yield put({
        type: 'spin_true',
      });
      const { data } = yield call(service.editKindAttr,payload);
      if(data && data.retCode == 1) {
         yield put({
          type: 'edit',
         payload: {
             data,
          },
          });
      }else {
        if (data) {
          message.error(data.retMsg);
             yield put({
              type: 'spin_false',

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
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/propertymanagement') {
          dispatch({ type: 'findAllKind'});
        }
      });
    },
  },
};
