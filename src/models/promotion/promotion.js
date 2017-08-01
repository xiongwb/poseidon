/**
 * Created by zhangle on 2017/4/7.
 */
import * as service from '../../service/promotion/promotion';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'promotion',//唯一的
  state: {
    data:[],
    promotion:[],
    currentPage:1,
    loading:false,
    isSubmit:'',
    key:null,
    brcList:[],
    expandedKeys: [],
    autoExpandParent: true,
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
    //查询促销活动的列表数据
    *findPromptionList({ payload }, { call, put }) {
      console.log(57687686);

      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(service.findPromptionList,payload);

      const currentPage = payload.page;
      if(data && data.retCode == 1) {
        yield put({
          type: 'findSelectKind',
          payload:{
            brcNo:6,
          }
        });
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
    //查询促销活动详情
    *findPromptionDetail({ payload }, { call, put }) {
      console.log(p11111111111);
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(service.findPromptionDetail,payload);
      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
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
    //开启促销活动
    *openPomption ({ payload }, { call, put }) {
      console.log(999999999);
      const { data } = yield call(service.openPomption,payload);
      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
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
      }
    },
    //关闭促销活动
    *closePomption ({ payload }, { call, put }) {

      const { data } = yield call(service.closePomption,payload);
      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
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
      }
    },
    //推荐促销活动
    *recommendPromption ({ payload }, { call, put }) {
      console.log(999999999);
      const { data } = yield call(service.recommendPromption,payload);

      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
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
      }
    },
    //取消推荐促销活动
    *cancelRecommendPromption ({ payload }, { call, put }) {
      console.log(999999999);
      const { data } = yield call(service.cancelRecommendPromption,payload);

      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
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
      }
    },
    //查询分类属性
    *findSelectKind ({ payload }, { call, put }) {
      console.log(999999999);
      const { data } = yield call(service.findSelectKind,payload);

      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
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
      }
    },
    //查询商品含父类
    *findProdByKind ({ payload }, { call, put }) {
      console.log(999999999);
      const { data } = yield call(service.findProdByKind,payload);

      if(data && data.retCode == 1) {
        yield put({
          type: 'find',
          payload: {
            data,
            title: '',
            keys: ''
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
//修改促销活动
  *editPomption ({ payload }, { call, put }) {
    yield put({
      type: 'loading_true',
    });
    const { data } = yield call(service.editPomption,payload);
    if(data && data.retCode == 1) {
      yield put({
        type: 'edit',
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
    //查询分类属性
    *findSelectKind ({payload}, {call, put}) {
      console.log(999999999);
      const { data } = yield call(service.findBrcSelectKind, payload);
      console.log(data);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            list:data,
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
            brcList:data.prodList
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
        if (location.pathname === '/promotion') {
          dispatch({
            type: 'findPromptionList',
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
