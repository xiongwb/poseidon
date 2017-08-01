import styles from './bank.css'
import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Text,
  Input,
  Row,
  Col,
  Icon,
  Spin,
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

class Bank extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource:[],
    };
    this.columns = [{title:'序号',dataIndex:'id',width:50,key:'id'},
      {title:'银行名称',dataIndex:'name',width:100,key:'name',onCellClick:this.onCellClick},
      {title:'机构号', dataIndex:'brcno',width:100,key:'brcno',onCellClick:this.onCellClick},
      {title:'机构名称',dataIndex:'brcna',width:100,key:'brcna',onCellClick:this.onCellClick},
      {title:'创建时间', dataIndex:'time',width:100,key:'time',onCellClick:this.onCellClick},
      ];
  }

  componentDidMount(){
    this.transferObject({'id':'001','name':'农业银行','brcno':'8274','brcna':'天津分行','time':'2017-3-2 12:21:32','key':'1'});
    this.transferObject({'id':'002','name':'商业银行','brcno':'8274','brcna':'天津分行','time':'2017-3-2 12:21:32','key':'2'});
    this.transferObject({'id':'003','name':'银行','brcno':'8274','brcna':'天津分行','time':'2017-3-2 12:21:32','key':'3'});
  }
  // 初始化数据
  transferObject(data){
    let dataList = this.state.dataSource;
    dataList.push(data);
    this.setState({
      dataSource:dataList,
    })
  }

  onCellClick() {
    browserHistory.push('/bank/list')
  }

  render() {
    return (
      <QueueAnim>
        <div key="key1">
          <div className={styles.bank}>
            <Row>
              <Col>
                <h3>银行名称</h3>
                <Input placeholder="输入银行名称"/>
              </Col>
              <Col>
                <h3>机构号</h3>
                <Input placeholder="输入机构号" />
              </Col>
              <Col>
                <Icon type="search" className={styles.icon}></Icon>
              </Col>
            </Row>
          </div>
          <Table
             columns={this.columns}
             dataSource={this.state.dataSource}
             pagination={{ pageSize: 50 ,total:this.state.dataSource.length}}
             scroll={{ y: 300 }}
          />
        </div>
      </QueueAnim>
    );
  }
}

export default connect()(Bank)
