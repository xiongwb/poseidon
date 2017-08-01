import styles from './bank.css'
import React from 'react'
import { connect } from 'dva'
import {
  Button,
  Text,
  Input,
  Row,
  Col,
  Modal,
  Icon,
  Table,
} from 'antd'
import { browserHistory } from 'react-router'
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

const confirm = Modal.confirm;

class Store extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource:[],
    };
    this.columns = [{title:'序号',dataIndex:'id',width:50,key:'id'},
      {title:'商户编号',dataIndex:'brcno',width:100,key:'brcno',onCellClick:this.onCellClick},
      {title:'商户名称', dataIndex:'name',width:100,key:'name',onCellClick:this.onCellClick},
      {title:'创建时间', dataIndex:'time',width:100,key:'time',onCellClick:this.onCellClick},
      {title:'操作',key:'operate',width:100,render:(text, record, index)=>
        (<div>
          <Button>修改</Button>
          <Button onClick={(e)=>{this.deleteSelectedRow(this,index,e)}}>删除</Button>
        </div>)
      }];
  }

  componentDidMount(){
    this.transferObject({'id':'001','brcno':'8274','name':'大铁勺酒楼','time':'2017-3-2 12:21:32','key':'1'});
    this.transferObject({'id':'002','brcno':'4332','name':'万达','time':'2017-3-2 12:21:32','key':'2'});
    this.transferObject({'id':'003','brcno':'4356','name':'韩罗苑','time':'2017-3-2 12:21:32','key':'3'});
  }
  // 初始化数据
  transferObject(data){
    let dataList = this.state.dataSource;
    dataList.push(data);
    this.setState({
      dataSource:dataList,
    })
  }

  deleteSelectedRow(that,index,e){
    confirm({
      title: '提示',
      content: '确定要删除这个商户吗？',
      onOk() {
        const list = that.state.dataSource;
        e.preventDefault();
        list.splice(index,1);
        that.setState({
          dataSource:list,
        })
      },
      onCancel() {},
    });

  }

  onCellClick() {
    browserHistory.push('/store/message')
  }

  onPush() {
    browserHistory.push('/store/add')
  }

  getBodyWrapper(body) {
    return (
      <Animate transitionName="move" component="tbody" className={body.props.className}>
        {body.props.children}
      </Animate>
    );
  }

  render() {
    return (
      <QueueAnim>
        <div key="key1">
          <div className={styles.store}>
            <Row>
              <Col>
                <h3>商户名称</h3>
                <Input placeholder="输入银行名称"/>
              </Col>
              <Col>
                <h3>商户编号</h3>
                <Input placeholder="输入机构号" />
              </Col>
              <Col>
                <Icon type="search" className={styles.icon}></Icon>
              </Col>
              <Col>
                <Button style={{marginTop:10}} onClick={() => this.onPush()}>添加商户</Button>
              </Col>
            </Row>
          </div>
          <hr/>
          <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={{ pageSize: 50 ,total:this.state.dataSource.length}}
            scroll={{ y: 300 }}
            style={{marginTop:10}}
            getBodyWrapper={this.getBodyWrapper}
          />
        </div>
      </QueueAnim>
        );
  }
}

export default connect()(Store)
