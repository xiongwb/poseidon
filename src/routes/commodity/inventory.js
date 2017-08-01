import styles from './commodity.css'
import React from 'react'
import {connect} from 'dva'
import {
  Table,
  Spin,
  Text,
  Input,
  Row,
  Col,
  Icon,
  Button
} from 'antd'
import {browserHistory} from 'react-router'
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
function Inventory({inventory, dispatch}) {


  if (inventory.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }
  if(inventory.isSubmit){
    browserHistory.push('/Inventory/add')
  }


  const onChange = (page) => {
    dispatch({
      type: 'inventory/prodList',
      payload: {
        supplierNo: 1,
        page: page,
        size: 10,
      },
    });
  };
  const search = () => {
    let prodName = document.getElementById('prodName').value;

    dispatch({type: 'inventory/prodList', payload: {
      prodName:prodName,
      supplierNo: 1,
      page: 1,
      size: 10,}})
  };
  const onPush = (record) => {
   dispatch({
      type: 'inventory/findProdDetail',
      payload: {
        prodNo:record.prodNo
      },
    });
    browserHistory.push('/Inventory/add')

  }
  const getBodyWrapper = (body) => {
    return (
      <Animate transitionName="move" component="tbody" className={body.props.className}>
        {body.props.children}
      </Animate>
    );
  };
  const dataSource = inventory.data.prodList.content;

  dataSource.map((data, number) => {
    data.key = number + 1;

  });
  const columns = [{title: '序号', dataIndex: 'key', width: 50, key: 'key'},
    {title: '商户名称', dataIndex: 'prodName', width: 100, key: 'prodName'},
    {title: '商户描述', dataIndex: 'description', width: 100, key: 'description'},
    {title: '品牌', dataIndex: 'brand', width: 100, key: 'brand'},
    {title: '分类', dataIndex: 'kindNo', width: 100, key: 'kindNo'},
    {
      title: '操作', key: 'operate', width: 100, render: (record) =>
      (<div>
        <Button onClick={() => onPush(record)}>修改</Button>
      </div>)
    }];

  return (
    <QueueAnim>
      <div key='key1'>
        <div className={styles.inventory}>
          <Row>
            <Col>
              <h2>库存管理</h2>
            </Col>
            <Col >
              <h3>商品名称</h3>
              <Input id="prodName" className={styles.commodity} placeholder="商户名称"/>
            </Col>

              <Button onClick={search} style={{ marginTop: 9,marginLeft: 13 }} htmlType="submit" shape="circle" size="large" icon="search"/>

          </Row>
        </div>
        <hr/>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{pageSize: 10, total: inventory.data.prodList.totalElements, onChange: onChange}}
          scroll={{y: 300}}
          style={{marginTop: 10}}
          getBodyWrapper={getBodyWrapper}
        />
      </div>
    </QueueAnim>
  );
}

function mapStateToProps(state) {
  return {
    inventory: state.inventory,
  };
}
export default connect(mapStateToProps)(Inventory)
