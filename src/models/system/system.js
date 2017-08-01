import * as service from '../../service/system/system';
import { message } from 'antd';
import Storage from '../../utils/storage'
export default {
  namespace: 'system',//唯一的
  state: {
    data:[],
    dictNo:'',
  },
  reducers: {
    query(state,action) {
      console.log(action,12)
      return {...state,...action.payload,loading:false}
    },
    edit1(state,action) {
      return {...state,...action.payload,}
    },
    findDictDetail(state,action) {
      return {...state,...action.payload,}
    },
    edit2(state,action) {
      return {...state,...action.payload,isSubmit:true}
    },
    add(state,action) {
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
    //查询数据
    *findDict ({ payload }, { call, put }) {
      yield put({
        type: 'loading_true',
      });
       const { data } = yield call(service.findDict,payload);
        console.log(data,1)
        if(data && data.retCode == 1) {
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
    //添加数据
    *addDict ({ payload }, { call, put }) {
      yield put({
        type: 'loading_true',
      });
       const { data } = yield call(service.addDict,payload);
      console.log(data,11)
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
   //修改数据
   *editDict ({ payload }, { call, put }) {
     yield put({
       type: 'loading_true',
     });
     const { data } = yield call(service.editDict,payload);
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
   //删除数据
   *delDict ({ payload}, { call, put, select}) {
     yield put({
       type: 'loading_true',
     });

     const { data } = yield call(service.delDict,payload);
     const iteration = yield select(({ system }) => system.data)
        if(data && data.retCode == 1) {
          // for (let i=0; i<iteration.basDictEntityPage.content.length; i++)
          // {
          //   if(iteration.basDictEntityPage.content[i].dictNo==payload.dictNo) {
          //     iteration.basDictEntityPage.content.splice(i, 1)
          //     console.log(iteration,88)
          //   }
          // }
          // console.log(iteration,19)
          // yield put({
          //   type: 'query',
          //   payload:{
          //     data:iteration
          //   }
          // });

          // setTimeout(
          //   yield put({
          //     type: 'findDict',
          //     payload:{
          //       page:1,
          //       size:10,
          //     }
          //   })
          // , 100000);

          yield put({
            type: 'findDict',
            payload:{
              page:1,
              size:10,
            }
          })

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
/*   *findDictDetail({ payload }, { call, put }) {
       const { data } = yield call(service.findDictDetail,payload);
        console.log(data,4)
        if(data && data.retCode == 1) {
          yield put({
            type: 'son_query',
            payload: {
              data,
              dictNo:payload
            },
          });
        }
      },
    *delDictDetail({ payload,dispatch,dictNo }, { call, put }) {
       const { data } = yield call(service.delDictDetail,payload);
        console.log(data,5)
        if(data && data.retCode == 1) {
          dispatch({
              type: 'system/findDictDetail',
              payload:{
                dictNo:payload.dictNo
              }
            })
          }
      },*/
 },


  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/system') {
          dispatch({
            type: 'findDict',
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