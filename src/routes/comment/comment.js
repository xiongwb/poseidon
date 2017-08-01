import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Text,
  Spin
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

function Comment({comment,dispatch}){
  if (comment.data.length == 0){
    return <Spin />
  }else {
    const dataSource = comment.data.evaReturnVOList;
    dataSource.map((data,number) => {
      data.key = (comment.currentPage-1) * 10 + number;
    });

    const onChange = (page) => {
      dispatch({
        type: 'comment/findEvaList',
        payload:{
          page:page,
          size:10,
        },
      });
    };


    const reply = (record) => {
      dispatch({type: 'comment/findByEvaNo', payload: {record:record}});
      browserHistory.push('/comment/reply')
    };

    const columns = [{title:'序号',dataIndex:'key',width:50,key:'key'},
      {title:'评论人',dataIndex:'userName',width:100,key:'userName'},
      {title:'商品／商户名称', dataIndex:'prodName',width:100,key:'prodName'},
      {title:'评分', dataIndex:'star',width:100,key:'star'},
      {title:'评论时间', dataIndex:'replyEvaDate',width:100,key:'replyEvaDate'},
      {title:'操作',key:'operate',width:100,render:(record)=>
        (<div>
          <Button onClick={() => reply(record)}>回复</Button>
        </div>)
      }];

    return (
      <QueueAnim>
        <div key="key1">
          <h1>商品评价管理</h1>
          <hr/>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 ,total:comment.data.totalElements ,onChange:onChange}}
            scroll={{ y: 300 }}
            style={{marginTop:20}}
            loading={comment.loading}
          />
        </div>
      </QueueAnim>
    );
  }
}
// class Comment extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       dataSource:[],
//     };
//     this.columns = [{title:'序号',dataIndex:'id',width:50,key:'id'},
//       {title:'评论人',dataIndex:'client',width:100,key:'client',onCellClick:this.onCellClick},
//       {title:'商品／商户名称', dataIndex:'name',width:100,key:'name',onCellClick:this.onCellClick},
//       {title:'评分', dataIndex:'count',width:100,key:'count',onCellClick:this.onCellClick},
//       {title:'评论时间', dataIndex:'time',width:100,key:'time',onCellClick:this.onCellClick},
//       {title:'操作',key:'operate',width:100,render:(text, record, index)=>
//         (<div>
//           <Button onClick={()=>this.reply()}>回复</Button>
//         </div>)
//       }];
//   }
//
//   componentDidMount(){
//     this.transferObject({'id':'001','client':'张三','name':'飘柔柔顺洗发水','count':'8.5','time':'2017-3-2 12:21:32','key':'1'});
//     this.transferObject({'id':'002','client':'李四','name':'飘柔柔顺洗发水','count':'8.5','time':'2017-3-2 12:21:32','key':'2'});
//     this.transferObject({'id':'003','client':'王五','name':'飘柔柔顺洗发水','count':'8.5','time':'2017-3-2 12:21:32','key':'3'});
//   }
//   // 初始化数据
//   transferObject(data){
//     let dataList = this.state.dataSource;
//     dataList.push(data);
//     this.setState({
//       dataSource:dataList,
//     })
//   }
//
//   reply(){
//     browserHistory.push('/comment/reply')
//   }
//
//   onCellClick() {
//     // browserHistory.push('/')
//   }
//
//   render() {
//     return (
//       <QueueAnim>
//         <div key="key1">
//           <h1>商品评价管理</h1>
//           <hr/>
//           <Table
//             columns={this.columns}
//             dataSource={this.state.dataSource}
//             pagination={{ pageSize: 50 ,total:this.state.dataSource.length}}
//             scroll={{ y: 300 }}
//             style={{marginTop:20}}
//           />
//         </div>
//       </QueueAnim>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    comment: state.comment,
  };
}

export default connect(mapStateToProps)(Comment)
