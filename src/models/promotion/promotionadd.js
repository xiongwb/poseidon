/**
 * Created by zhangle on 2017/4/7.
 */
import * as service from '../../service/promotion/promotionadd';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'promotionadd',//唯一的
  state: {
    data:[],
    promotion:[],
    currentPage:1,
    loading:false,
    key:null,
    belong:null,
    expandedKeys: [],
    autoExpandParent: true,
    isSubmit:'',
    brcList:[],
    title:'',
    keys:''

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
    },
    visible_true(state, action) {
      return {...state, ...action.payload, visible:true}
    },
    visible_false(state, action) {
      return {...state, ...action.payload, visible:false}
    },
  },
  effects: {
    //查询分类属性
    *findSelectKind ({payload}, {call, put}) {
      console.log(999999999);
      const { data } = yield call(service.findBrcSelectKind, payload);
      console.log(data);
      if (data && data.retCode == 1) {
        yield put({
          type: 'find',
          payload: {
            data,
            kindList:data
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
    //查询商品含父类
    *findProdByKind ({payload}, {call, put}) {
      console.log(999999999);
      const {data} = yield call(service.findProdByKind, payload);
      console.log(data,3113);
      if (data && data.retCode == 1) {
        yield put({
          type: 'find',
          payload: {
            brcList:data.prodList,
            title: '',
            keys: ''
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
    //增加促销活动
    *addPomption({ payload }, { call, put }) {

      const { data } = yield call(service.addPomption,payload);
      console.log(data,1111);
      if(data && data.retCode == 1) {
        yield put({
          type: 'add',
          payload: {
            data,
          },
        });
        console.log(3333333)
        message.success("添加成功");
      }else {
        if (data) {
          message.error(data.retMsg);
        }else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/promotion/add') {
          dispatch({
            type: 'findSelectKind',
            payload:{
              brcNo:6,
            }
          })
        }
      })
    }
  },


};
