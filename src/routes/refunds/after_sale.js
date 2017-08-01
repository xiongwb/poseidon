/*import styles from './after_sale.css'
 import React from 'react'
 import {connect} from 'dva'
 import {
 Table,
 Button,
 Text,
 Input,
 Row,
 Col,
 Menu,
 Dropdown,
 Icon,
 } from 'antd'
 import {browserHistory} from 'react-router'
 import QueueAnim from 'rc-queue-anim';

 const data = [
 {
 id: '001',
 details: '订单号:1110202910,阿迪王',
 type: '退款',
 money: '78￥',
 time: '2017-3-2 12:21:32',
 condition: '已收货',
 operate: '确认收货',
 key: '1'
 },
 {
 id: '002',
 details: '订单号:1929388483,滑板鞋',
 type: '退款退货',
 money: '88￥',
 time: '2017-3-2 12:21:32',
 condition: '待发货',
 operate: '审核申请',
 key: '2'
 },
 {
 id: '003',
 details: '订单号:1999291200,广场舞之星',
 type: '换货',
 money: '27￥',
 time: '2017-3-2 12:21:32',
 condition: '待收回',
 operate: '退款成功',
 key: '3'
 },
 {
 id: '004',
 details: '订单号:1999291200,广场舞之星',
 type: '换货',
 money: '27￥',
 time: '2017-3-2 12:21:32',
 condition: '待收回',
 operate: '换货审核',
 key: '4'
 }
 ]

 class AfterSale extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 menuStr: "全部分类",
 dataSource: data,
 searchS: null,
 };
 this.columns = [{title: '序号', dataIndex: 'id', width: 50, key: 'id'},
 {title: '订单编号', dataIndex: 'returnDate', width: 100, key: 'details', onCellClick: this.onCellClick},
 {title: '维权类型', dataIndex: 'returnType', width: 50, key: 'type', onCellClick: this.onCellClick},
 {title: '申请时间', dataIndex: 'returnDate', width: 100, key: 'time', onCellClick: this.onCellClick},
 {title: '状态', dataIndex: 'condition', width: 50, key: 'condition', onCellClick: this.onCellClick},
 {
 title: '操作', dataIndex: 'operate', width: 100, key: 'operate', render: (text, record, index) =>
 (<div>
 <Button onClick={() => this.jump(record.operate)}>{record.operate}</Button>
 </div>)
 }];
 }

 jump(e) {
 if (e == '审核申请') {
 browserHistory.push('/customer_service_audit')
 } else if (e == '确认收货') {
 browserHistory.push('/confirm_goods')
 } else if (e == '换货审核') {
 browserHistory.push('/exchange_management')
 }
 }


 conditionBt() {
 if (this.state.dataSource.condition == '已收货') {
 return (
 <Button onClick={this.jump}>审核申请</Button>
 )
 }
 }

 menuBt(e) {
 if (e.key == 0) {
 let s = "全部分类"
 this.setMenuT(s)
 } else if (e.key == 1) {
 let s = "审核申请"
 this.setMenuT(s)
 } else if (e.key == 2) {
 let s = "确认收货"
 this.setMenuT(s)
 } else if (e.key == 3) {
 let s = "退款成功"
 this.setMenuT(s)
 }
 }

 setMenuT(s) {
 this.setState({
 menuStr: s
 })
 }

 searchT(e) {
 this.setState({
 searchS: e.target.value,
 })
 }

 menu() {
 return (
 <Menu onClick={this.menuBt.bind(this)}>
 <Menu.Item key="0">全部分类</Menu.Item>
 <Menu.Item key="1">审核申请</Menu.Item>
 <Menu.Item key="2">确认收货</Menu.Item>
 <Menu.Item key="3">退款成功</Menu.Item>
 </Menu>
 )
 }

 render() {
 var newTime = new Date(12345678);


 console.log(newTime.getFullYear() + "-" + (newTime.getMonth() + 1) + "-" + newTime.getDate() + " " + newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds()
 , 2)
 return (
 <QueueAnim>
 <div key="1">
 <div className={styles.after_sale}>
 <Row>
 <Col>
 <h3>关键字</h3>
 <Input onChange={this.searchT.bind(this)}/>
 </Col>
 <Col>
 <h3>分类</h3>
 <Dropdown overlay={this.menu()}>
 <Button style={{float: "left"}}>
 {this.state.menuStr} <Icon type="down"/>
 </Button>
 </Dropdown>
 </Col>
 <Col className={styles.search}>
 <Button className={styles.searchBtn} htmlType="submit" shape="circle" size="large" icon="search"/>
 </Col>
 </Row>
 </div>
 <Table
 columns={this.columns}
 dataSource={this.state.dataSource}
 pagination={{pageSize: 50, total: this.state.dataSource.length}}
 scroll={{y: 300}}
 />
 </div>
 </QueueAnim>
 )
 }
 }

 export default connect()(AfterSale)*/

import styles from './after_sale.css'
import React from 'react'
import {connect} from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Select,
  Dropdown,
  Icon,
  Spin
} from 'antd'
import {browserHistory} from 'react-router'
import QueueAnim from 'rc-queue-anim';
const Option = Select.Option;


function AfterSale({afterSale, dispatch}) {

  if (afterSale.data.length == 0) {
    return (<div><Spin /></div>)
  }
  const onCellClick = () => {
  }
  console.log(afterSale, 12)


  const dataSource = afterSale.data.prodReturnDetailVOList;

  dataSource.map((data, number) => {
    for (let i = 0; i < afterSale.data.orderState.length; i++) {
      if (data.orderState === afterSale.data.orderState[i].dictKey) {
        data.orderName = afterSale.data.orderState[i].dictValue
      }

    }
    for (let i = 0; i < afterSale.data.returnState.length; i++) {
      if (data.returnState === afterSale.data.returnState[i].dictKey) {
        data.stateName = afterSale.data.returnState[i].dictValue
      }

    }
    for (let i = 0; i < afterSale.data.returnType.length; i++) {
      if (data.returnType === afterSale.data.returnType[i].dictKey) {
        data.typeName = afterSale.data.returnType[i].dictValue
      }

    }
    data.key = number + 1;
  });
  console.log(dataSource, 12)


  const columns = [{title: '序号', dataIndex: 'key', width: 50, key: 'key'},
    {title: '商品名称', dataIndex: 'prodName', width: 100, key: 'prodName', onCellClick: onCellClick},
    {title: '订单编号', dataIndex: 'orderNo', width: 100, key: 'orderNo', onCellClick: onCellClick},
    {title: '维权类型', dataIndex: 'typeName', width: 100, key: 'typeName', onCellClick: onCellClick},
    {title: '申请时间', dataIndex: 'returnDate', width: 100, key: 'returnDate', onCellClick: onCellClick},
    {title: '订单状态', dataIndex: 'orderName', width: 100, key: 'orderName', onCellClick: onCellClick},
    {title: '售后状态', dataIndex: 'stateName', width: 100, key: 'stateName', onCellClick: onCellClick},
    {
      title: '操作',  width: 100, key: 'prodReturnDetailVOList', render: (text, record, index) => {
      if (record.returnState == 1) {
        if (record.returnType == 1) {
          return (
            <div>
              <Button onClick={() =>menuBt(record)}>退货申请</Button>
            </div>)
        } else {
          return (
            <div>
              <Button onClick={() =>edit(record)}>换货申请</Button>
            </div>)
        }
      }

      if (record.returnState == 3) {
        return (
          <div>
            <Button onClick={() =>conditionBt(record)}>确认收货</Button>
          </div>)
      }
      if (record.returnState ==4 ) {
        return (
          <div>
            <text>拒绝</text>
          </div>)
      }
      if (record.returnState ==5 ) {
        return (
          <div>
            <text>成功</text>
          </div>)
      }
    }
    }];


  const confirm = (record) => {
    dispatch({type: 'afterSale/query', payload: {record}});
    browserHistory.push('/customer_service_audit')
  };
  const edit = (record) => {


    dispatch({type: 'afterSale/query',payload:{record}});
    browserHistory.push('/exchange_management')
  };

  const conditionBt = (record) => {
    dispatch({type: 'afterSale/query',payload:{record}});
    browserHistory.push('/confirm_goods')
  };

  const menuBt = (record) => {
    dispatch({type: 'afterSale/query',payload:{record}});
     browserHistory.push('/customer_service_audit')
  };

  const setMenuT = () => {

  };

  const searchT = () => {

  };


  return (
    <QueueAnim>
      <div key="1">
        <div className={styles.after_sale}>
          <Row>
            <Col>
              <h3>关键字</h3>
              <Input onChange={searchT}/>
            </Col>
            <Button className={styles.searchBtn} htmlType="submit" shape="circle" size="large" icon="search"/>
            <Col>
              <h3>分类</h3>
              <Select className={styles.select}>
                <Option value="1">male</Option>
                <Option value="2">female</Option>
                <Option value="3">female</Option>
              </Select>
            </Col>

            <Col >
              <h3>维权类型</h3>
              <Select className={styles.select}>
                <Option value="1">male</Option>
                <Option value="2">female</Option>
                <Option value="3">female</Option>
              </Select>

            </Col>
            <Col >
              <h3>售后状态</h3>
              <Select className={styles.select}>
                <Option value="1">male</Option>
                <Option value="2">female</Option>
                <Option value="3">female</Option>
              </Select>

            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{pageSize: 10, total: 2}}
          scroll={{y: 300}}
        />
      </div>
    </QueueAnim>
  );
}
function mapStateToProps(state) {
  return {
    afterSale: state.afterSale,
  };
}
export default connect(mapStateToProps)(AfterSale)

