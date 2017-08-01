/**
 * Created by cyt on 2017/4/13.
 */
import * as service from '../../service/commodity/commodityedit';
import { message } from 'antd';
import Storage from '../../utils/storage'
import { getLocalStorage } from '../../utils/helper'
export default {
  namespace: 'commodityedit',//唯一的
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
    add(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },

  },
  effects: {
    //查询数据
    *findProdDetail  ({}, { call, put,select }) {
      const record = yield select(({ commodity }) => commodity.record);
      let type=getLocalStorage(Storage.DID_LOGIN).type
      let brcNo=getLocalStorage(Storage.DID_LOGIN).brcNo
      console.log(type,1);
      const { data } = yield call(service.findProdDetail,{type:2,prodNo:record.prodNo,brcNo:1});
      console.log(data,1);
      if(data && data.retCode === 1) {
        yield put({
          type: 'findAllKind',
        });
        for(let i=0;i<data.skuList.length;i++){
          data.skuList[i].flag=0
        }
        yield put({
          type: 'query',
          payload: {
            data,
            key:data.prodDetailEntity.kindNo,
            increase:{prodAttrList:data.attrList},
            belong:data.basKindEntity.name,
            record:record
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
    //查询所属分类数据
    *findAllKind ({ payload }, { call, put }) {
      const { data } = yield call(service.findAllKind,payload);
      console.log(data,1)
      if(data && data.retCode == 1) {
        yield put({
          type: 'query',
          payload: {
            List:data,
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
    *editProd({ payload }, { call, put }) {
      console.log(payload,3)
      const { data } = yield call(service.editProd,payload);
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
        if (location.pathname === '/commodity/edit') {
          dispatch({
            type: 'findProdDetail',
          })
        }
      })
    }
  },


};
