/**
 * Created by zhangle on 2017/3/8.
 */
/*
import styles from './order.css'
import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim';
import {
  Select,
  Icon,
  Button,
  Row,
  Col,
  Table,
  Input,
} from 'antd'
import { browserHistory } from 'react-router'
const Option = Select.Option
class Order extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource:[],
    };
    this.columns = [
      {title:'序号',dataIndex:'id',width:50,key:'id'},
      {title:'订单编号', dataIndex:'brcno',width:100,key:'brcno'},
      {title:'商品信息',dataIndex:'name',width:100,key:'name' ,onCellClick:this.onCellClick},
      {title:'总金额', dataIndex:'jine',width:100,key:'jine'},
      {title:'数量', dataIndex:'shuliang',width:100,key:'shuliang'},
      {title:'下单时间', dataIndex:'time',width:100,key:'time'},
      {title:'状态', dataIndex:'type',width:100,key:'type'},
      {title:'操作',key:'operate',width:100,render:(text, record, index)=>
        (<div>
          <Button onClick={this.onbush}>{record.operate}</Button>

        </div>)
      }];
  }

  componentDidMount(){
    this.transferObject({'id':'001','brcno':'0004','name':'哈哈牛奶','jine':'¥274','shuliang':'201','time':'2017-08-09','type':'待付款','operate':'付款','key':'1'});
    this.transferObject({'id':'002','brcno':'0004','name':'旺仔大馒头','jine':'¥274','shuliang':'201','time':'2017-08-09','type':'已评价','operate':'已完成','key':'2'});
    this.transferObject({'id':'003','brcno':'0004','name':'猫屎咖啡','jine':'¥274','shuliang':'201','time':'2017-08-09','type':'已付款','operate':'查看物流','key':'3'});
    this.transferObject({'id':'004','brcno':'0004','name':'纯香巧克力','jine':'¥274','shuliang':'201','time':'2017-08-09','type':'交易完成','operate':'去评价','key':'4'});
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
    browserHistory.push('/order/message')
  }

   handleChange(value) {
    console.log(`selected ${value}`);
  }
  onbush() {
    browserHistory.push('/order/Delivery')
  }
  render() {
    return (
      <QueueAnim>
        <div key = "1">
        <div className={styles.Order}>
          <Row>
            <Col>
              <h2>关键字</h2>
              <Input placeholder="输入名称"/>
            </Col>
            <Col>
              <h2>状态</h2>
            </Col>
            <Col className={styles.from}>
              <Select defaultValue="全部" onChange={this.handleChange} style={{ width: 120 }}>
                <Option value="待付款">待付款</Option>
                <Option value="已付款">已付款</Option>
                <Option value="交易完成">交易完成</Option>
                <Option value="已评价">已评价</Option>
              </Select>
            </Col>
            <Col>
              <h2>编号</h2>
              <Input placeholder="输入编号" />
            </Col>
            <Col>
              <Icon type="search" className={styles.icon}></Icon>
            </Col>
          </Row>
        </div>
        <hr/>
        <div className={styles.juli}>
          <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={{ pageSize: 50 ,total:this.state.dataSource.length}}
            scroll={{ y: 300 }}
          />
        </div>
      </div>
      </QueueAnim>
    );
  }/**
 * Created by zhangle on 2017/3/20.
 */

import styles from './order.css'
import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Icon,
  Checkbox,
  Modal,
  Select,
  Spin
} from 'antd'

import { browserHistory } from 'react-router';
import QueueAnim from 'rc-queue-anim';



function Order ({order,dispatch}) {
console.log(order)

  if (order.data.length == 0){
    return <Spin />
  }else {
    const dataSource = order.data.orderListForBackReturnVOList;

    dataSource.map((data, number) => {
      data.key = (order.currentPage - 1) * 10 + number;
    });

    const onChange = (page) => {
      dispatch({
        type: 'order/order',
        payload: {
          page: page,
          size: 10,
        },
      });

    };
    const onpush = () => {
      browserHistory.push('/order/Delivery')
    };
    const handleChange=(value)=> {
      console.log(`selected ${value}`);
    };
    const titleType =[
      "0","待付款","待发货","已发货","已收货","交易成功"
    ]
    const Option = Select.Option;

    const columns = [
      {title: '序号', dataIndex: 'key', width: 50, key: 'key'},
      {title:'订单编号', dataIndex:'orderNo',width:100,key:'orderNo'},
      {title:'商品信息',dataIndex:'prodName',width:100,key:'ProdName' },
      {title:'总金额', dataIndex:'nowPrice',width:100,key:'nowPrice'},

      {title:'下单时间', dataIndex:'orderDate',width:100,key:'orderDate'},
      {title:'状态', width:100,key:'orderState',render: (text, record, index) =>
      {
        return(
          <div>
            {titleType[record.orderState]}
          </div>
        )
      }},
      {title: '操作', key: 'orderListForBackReturnVOList', width: 100, render: (text, record, index) =>
    {
      if(record.orderState==2){
        return(
          <div>
            <Button onClick={()=>onpush()}>发货</Button>
          </div>
        )

      }
      if(record.orderState==3){
        return(
          <div>
            <Button >查看物流</Button>
          </div>
        )
      }




    }
  }];


    return (
    <QueueAnim>
      <div key = "1">
        <div className={styles.Order}>
          <Row>
            <Col>
              <h2>关键字</h2>
              <Input placeholder="输入名称"/>
            </Col>
            <Col>
              <h2>状态</h2>
            </Col>
            <Col className={styles.from}>
              <Select defaultValue="全部" onChange={handleChange} style={{ width: 120 }}>
                <Option value="待付款">待付款</Option>
                <Option value="已付款">已付款</Option>
                <Option value="交易完成">交易完成</Option>
                <Option value="已评价">已评价</Option>
              </Select>
            </Col>
            <Col>
              <h2>编号</h2>
              <Input placeholder="输入编号" />
            </Col>
            <Col>
              <Icon type="search" className={styles.icon}></Icon>
            </Col>
          </Row>
        </div>
        <hr/>
        <div className={styles.juli}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{pageSize: 10, total:order.data.totalElements, onChange: onChange}}
            scroll={{y: 300}}
            loading={order.loading}
          />
        </div>
      </div>
    </QueueAnim>



    );

  }
}
function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

export default connect(mapStateToProps)(Order)




