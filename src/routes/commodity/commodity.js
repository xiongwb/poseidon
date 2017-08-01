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
  Dropdown,
  Icon,
  Menu,
  Select,
  Modal,
  message,
  Spin
} from 'antd'
import {browserHistory} from 'react-router'
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
import  CommodityTree  from './commodity_tree'


const confirm = Modal.confirm;

function Commodity({commodity, dispatch}) {

  if (commodity.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  } else {

    const deleteSelectedRow = (record) => {
      confirm({
        title: '提示',
        content: '确定要删除这个商户吗？',
        onOk() {
          console.log(record.prodNo);
          dispatch({type: 'commodity/prodOffSell', payload: {prodNo:record.prodNo}})
        },
        onCancel() {
        },
      });
    };

    const addgoods = () => {
      browserHistory.push('/commodity/add')

    };
    const eidtgoods = (record) => {
      dispatch({
        type: 'commodity/findProdDetail',
        payload: {
          record:record
        },
      });
      browserHistory.push('/commodity/edit')

    };

    const onChange = (page) => {
      console.log(page,1)
      dispatch({
        type: 'commodity/findProdList',
        payload: {
          type:1,
          page: page,
          size: 10,
        },
      });

    };
    const getBodyWrapper = (body) => {
      return (
        <Animate transitionName="move" component="tbody" className={body.props.className}>
          {body.props.children}
        </Animate>
      );
    };


    const onCellClick = (record) => {
      dispatch({
        type: 'commodity/findProdDetail',
        payload: {
          record:record
        },
      });
      browserHistory.push('/commodity/message')
    };

    const onClick=()=>{
      dispatch({type: 'commodity/visible_true'})
    }

    const handleCancel = () => {
      dispatch({type: 'commodity/visible_false'})
    };
    const dataSource = commodity.data.prodList;

    dataSource.map((data, number) => {
      data.key = number + 1;

    });

    console.log(dataSource, 12);

    const columns = [{title: '序号', dataIndex: 'key', width: 50, key: 'key'},
      {title: '商户名称', dataIndex: 'prodName', width: 100, key: 'prodName', onCellClick: onCellClick},
      {title: '商户描述', dataIndex: 'description', width: 100, key: 'description', onCellClick: onCellClick},
      {title: '品牌', dataIndex: 'brand', width: 100, key: 'brand', onCellClick: onCellClick},
      {title: '分类', dataIndex: 'kindNo', width: 100, key: 'kindNo', onCellClick: onCellClick},
      {
        title: '操作', key: 'operate', width: 100, render: (record) =>
        (<div>
          <Button onClick={() => eidtgoods(record)}>编辑</Button>
          <Button onClick={() => deleteSelectedRow(record)}>下架</Button>
        </div>)
      }];
    return (
      <QueueAnim>
        <div key='key1'>
          <div className={styles.commodity}>
            <Row type="flex" justify="space-between">
              <Col >
                <h2>商品名称</h2>
                <Input placeholder="商户名称"/>
              </Col>
              <Col >
                <h2>所属分类</h2>
                <Input style={{width: 250}} value={commodity.belong} maxlength="50"/>
                <Button type="primary" style={{marginLeft: 10}} onClick={onClick} >选择</Button>
              </Col>
              <Col >
                <Icon className={styles.search_icon} type="search"/>
              </Col>
              <Col >
                <Button style={{marginTop: 11}} onClick={() => addgoods()}>添加商品</Button>
              </Col>
            </Row>
          </div>
          <hr/>


          <Table

            columns={columns}
            dataSource={dataSource}
            pagination={{pageSize: 10, total: commodity.data.totalElements, onChange: onChange}}
            scroll={{y: 300}}
            style={{marginTop: 10}}
            getBodyWrapper={getBodyWrapper}
          />
        <Modal title="Modal"
                 visible={commodity.visible}
                 onCancel={handleCancel}
                 footer={null}
          >
            <CommodityTree   commodity={commodity} dispatch={dispatch} />
          </Modal>}
        </div>
      </QueueAnim>
    )
  }
}
function mapStateToProps(state) {
  return {
    commodity: state.commodity,
  };
}
export default connect(mapStateToProps)(Commodity)
