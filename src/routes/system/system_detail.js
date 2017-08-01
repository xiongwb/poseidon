import styles from './system.css'
import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Modal,
  Spin
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
const confirm = Modal.confirm;

/*class SystemDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource:[],
      visible:false,
    };
    this.columns = [{title:'序号',dataIndex:'id',width:50,key:'id'},
      {title:'字典',dataIndex:'dic',width:100,key:'dic',onCellClick:this.onCellClick},
      {title:'key', dataIndex:'keyword',width:100,key:'keyword',onCellClick:this.onCellClick},
      {title:'value', dataIndex:'value',width:100,key:'value',onCellClick:this.onCellClick},
      {title:'操作',key:'operate',width:100,render:(text, record, index)=>
        (<div>
          <Button onClick={()=>this.updataRow(index)}>修改</Button>
          <Button onClick={()=>this.deleteSelectedRow(index)}>删除</Button>
          <Modal title="修改字典名称" visible={this.state.visible}
                 onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
          >
            <div className={styles.updata}>
              <text>字典名称：</text>
              <Input style={{width:250}}/>
            </div>
          </Modal>
        </div>)
      }];
  }

  handleOk(){
    this.setState({
      visible:false
    })
  }

  handleCancel(){
    this.setState({
      visible:false
    })
  }

  componentDidMount(){
    this.transferObject({'id':'001','dic':'bracType','keyword':'001','value':'财务会计部','key':'1'});
    this.transferObject({'id':'002','dic':'bracType','keyword':'002','value':'计划信贷部','key':'2'});
    this.transferObject({'id':'003','dic':'bracType','keyword':'002','value':'风险资产部','key':'3'});
  }
  // 初始化数据
  transferObject(data){
    let dataList = this.state.dataSource;
    dataList.push(data);
    this.setState({
      dataSource:dataList,
    })
  }

  deleteSelectedRow(index){
    const dataList = this.state.dataSource;
    dataList.splice(index,1);
    this.setState({
      dataSource:dataList,
    })
  }

  updataRow(index){
    this.setState({
      visible: true,
    })
  }

  onCellClick() {
    // browserHistory.push('/')
  }

  render() {
    return (
      <QueueAnim>
        <div key='key1'>
          <h1>字典详情</h1>
          <hr/>
          <Table
            style={{marginTop:20}}
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={{ pageSize: 50 ,total:this.state.dataSource.length}}
            scroll={{ y: 300 }}
          />
        </div>
      </QueueAnim>
    );
  }
}*/
function SystemDetail({systemDetail,dispatch}){

  if(systemDetail.data.length==0){
    return (<div className={styles.spin}><Spin /></div>)
   }
 console.log(systemDetail,3131);
   const deleteSelectedRow=(record)=>{
      confirm({
        title: '提示',
        content: '确定要删除这个商户吗？',
        onOk() {
        console.log(record);
          dispatch({type: 'systemDetail/delDictDetail',payload:{dictNo:record.dictNo,dictKey:record.dictKey}})
        },
        onCancel() {},
      });
    };

    const updataRow=(record)=>{
       dispatch({type: 'systemDetail/edit1',payload:{record}})
       browserHistory.push('/system/detail/edit_detail')
    };

  const onCellClick=(record)=>{
      browserHistory.push('/systemDetail/detail')
    };
  const  getBodyWrapper=(body)=>{
      return (
        <Animate transitionName="move" component="tbody" className={body.props.className}>
          {body.props.children}
        </Animate>
      );
    };

    const dataSource=systemDetail.data.basDictDetailEntityList;

    dataSource.map((data,number) => {
      data.key = number+1;
    });
    const columns = [{title:'序号',dataIndex:'key',width:50,key:'key'},
        {title:'字典',dataIndex:'dictNo',width:100,key:'number',},
        {title:'Key', dataIndex:'dictKey',width:100,key:'name',},
        {title:'value', dataIndex:'dictValue',width:100,key:'describe',},
        {title:'操作',key:'operate',width:100,render:(record)=>
          (<div>
            <Button onClick={()=> updataRow(record)}>修改</Button>
            <Button onClick={()=>deleteSelectedRow(record)}>删除</Button>
          </div>)
        }];
   return(
      <QueueAnim>
          <div key="key1">
            <Spin   tip="Loading..." spinning={systemDetail.loading}>
              <div>
                <Row>
                  <Col>
                    <Button className={styles.button} onClick={()=>browserHistory.push('/system/detail/add_detail')}>添加字典</Button>
                  </Col>
                </Row>
              </div>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 ,total:1}}
                scroll={{ y: 300 }}
                getBodyWrapper={getBodyWrapper}
              />
            </Spin>
          </div>
      </QueueAnim>
    )
}
function mapStateToProps(state) {
    return {
      systemDetail: state.systemDetail,
    };
  }
export default connect(mapStateToProps)(SystemDetail)
