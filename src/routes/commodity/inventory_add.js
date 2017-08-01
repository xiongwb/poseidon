import styles from './commodity.css'
import React from 'react'
import {connect} from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Spin,
  Modal
} from 'antd'
import {browserHistory} from 'react-router'
import QueueAnim from 'rc-queue-anim';

function InventoryAdd({inventoryadd, dispatch}) {
  console.log(inventoryadd, 123)
  if (inventoryadd.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }
  const onPush = (record) => {
    dispatch({
      type: 'inventoryadd/visible_true',
      payload: {
        record: record
      },
    });

  };
  const handleOk = () => {
    let stock = document.getElementById('stock').value;
    if (stock < 0) {
      message.error('库存不能小于0');
      console.log(stock, 1235);
      return
    }
    dispatch({
      type: 'inventoryadd/addStock',
      payload: {
        skuNo: inventoryadd.record.skuNo,
        stock: stock
      }
    })
  }
  const handleCancel = () => {
    dispatch({type: 'inventoryadd/visible_false'})
  };
  const columns = [{title: '序号', dataIndex: 'id', width: 100, key: 'id'},
    {title: '商户名称', dataIndex: 'name', width: 100, key: 'name'},
    {title: '当前库存', dataIndex: 'stock', width: 100, key: 'stock'},
    {
      title: '操作', key: 'operate1', width: 100, render: (text, record, index) =>
      (<div>
        <Button onClick={() => onPush(record)}>修改</Button>
      </div>)
    }];
  const dataSource = inventoryadd.data.skuList;

  dataSource.map((data, number) => {
    data.key = number + 1;

  });
  return (
    <QueueAnim>
      <div key='key1'>
        <Spin spinning={inventoryadd.loading}>
          <div className={styles.inventory}>
            <Row>
              <Col>
                <h2>修改库存</h2>
              </Col>

            </Row>
          </div>
          <hr/>
          <div className={styles.commodityName}>
            <Row>
              <Col>
                <h3>商品名称:安沐溪</h3>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{pageSize: 50}}
            scroll={{y: 300}}
            style={{marginTop: 10}}
          />
          <Modal title="修改库存数量"
                 visible={inventoryadd.visible}
                 onCancel={handleCancel}
                 onOk={handleOk}
                 className={styles.attribute}
          >
            <span>添加库存 :<Input min='0' maxlength={2} max='99' type="number" id='stock' style={{width: 200}}/></span>
          </Modal>
        </Spin>
      </div>
    </QueueAnim>
  );
}

function mapStateToProps(state) {
  return {
    inventoryadd: state.inventoryadd,
  };
}
export default connect(mapStateToProps)(InventoryAdd)
