import styles from './system.css'
import React from 'react'
import {connect} from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Modal,
  Spin,
  Icon,
} from 'antd'
import {browserHistory} from 'react-router'
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');
const confirm = Modal.confirm;

function System({system, dispatch}) {
  if (system.data.length == 0 || system.data.basDictEntityPage == null) {
    return (<div className={styles.spin}><Spin /></div>)
  } else {

    const deleteSelectedRow = (record) => {
      confirm({
        title: '提示',
        content: '确定要删除这个商户吗？',
        onOk() {
          console.log(record);
          dispatch({type: 'system/delDict', payload: {dictNo: record.dictNo, dictName: record.dictName}})
        },
        onCancel() {
        },
      });
    };

    const updataRow = (record) => {
      dispatch({type: 'system/edit1', payload: {record}});
      browserHistory.push('/system/edit_dic')
    };

    const onChange = (page) => {
      dispatch({
        type: 'system/findDict',
        payload: {
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
      console.log(record);
      dispatch({type: 'system/findDictDetail', payload: {record}});
      browserHistory.push('/system/detail')
    };

    const search = () => {
      let dictNo = document.getElementById('dictNo').value;
      let dictName = document.getElementById('dictName').value;

      dispatch({type: 'system/findDict', payload: {dictNo: dictNo, dictName: dictName, page: 1, size: 10,}})
    };

    const dataSource = system.data.basDictEntityPage.content;

    dataSource.map((data, number) => {
      data.key = number + 1;

    });

    const columns = [{title: '序号', dataIndex: 'key', width: 50, key: 'key'},
      {title: '编号', dataIndex: 'dictNo', width: 100, key: 'dictNo', onCellClick: (record) => onCellClick(record)},
      {title: '名称', dataIndex: 'dictName', width: 100, key: 'dictName', onCellClick: (record) => onCellClick(record)},
      {
        title: '字典描述',
        dataIndex: 'describtion',
        width: 100,
        key: 'describe',
        onCellClick: (record) => onCellClick(record)
      },
      {
        title: '操作', key: 'operate', width: 100, render: (record) =>
        (<div>
          <Button onClick={() => updataRow(record)}>修改</Button>
          <Button onClick={() => deleteSelectedRow(record)}>删除</Button>
        </div>)
      }];

    return (
      <QueueAnim>
        <div key="key1">
          <Spin tip="Loading..." spinning={system.loading}>
            <div className={styles.setting}>
              <Row>
                <Col>
                  <h3>编号</h3>
                  <Input id='dictNo' placeholder="输入编号"/>
                </Col>
                <Col>
                  <h3>名称</h3>
                  <Input id='dictName' placeholder="输入名称"/>
                </Col>
                <Col>
                  <Button onClick={search}  className={styles.search} style={{ marginTop: 9,marginLeft: 13 }} htmlType="submit" shape="circle" size="large" icon="search"/>
                </Col>
                <Col>
                  <Button className={styles.button} onClick={() => browserHistory.push('/system/add_dic')}>添加字典</Button>
                </Col>
              </Row>
            </div>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{pageSize: 10, total: system.data.basDictEntityPage.totalElements, onChange: onChange}}
              scroll={{y: 300}}
              getBodyWrapper={getBodyWrapper}
            />
          </Spin >
        </div>
      </QueueAnim>
    )
  }
}

function mapStateToProps(state) {
  return {
    system: state.system,
  };
}
export default connect(mapStateToProps)(System)
