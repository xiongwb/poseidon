import React from 'react'
import { connect } from 'dva'
import styles from './userList.css'

import {
    Form, Button, Input, Row, Col, Table, Icon, Modal, Spin
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

import Storage from '../../utils/storage'
import { getLocalStorage } from '../../utils/helper'

const FormItem = Form.Item
const { Column, ColumnGroup } = Table;

class SearchForm extends React.Component {
    search(){
        this.props.dispatch({
            type: 'user/findUserList',
            payload: {
                page:1,
                size:10,
                empName:this.props.form.getFieldValue("empName")
            },
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form inline>
                <FormItem>
                    {getFieldDecorator('empName', {
                        
                    })(
                        <Input placeholder='用户名称' />
                        )}
                </FormItem>
                <FormItem >
                    <Button onClick={this.search.bind(this)} className={styles.searchBtn} htmlType="submit" icon="search" />
                </FormItem>
            </Form>
        )
    }
}

const UserSearchForm = Form.create()(SearchForm)

function UserList({user, dispatch}) {

    const onChange = (page) => {
        dispatch({
            type: 'user/findUserList',
            payload: {
                page: page,
                size: 10,
            },
        });
    };

    const toUserAdd = () => {
        let curUser = getLocalStorage(Storage.DID_LOGIN)
        dispatch({
            type: 'user/userAdd',
            payload: {
                empNoLoginPerson: curUser.empNo,
            },
        });
        browserHistory.push('/userAdd')
    };

    const toUserEdit = (record) => {
        let curUser = getLocalStorage(Storage.DID_LOGIN)
        dispatch({
            type: 'user/userEdit',
            payload: {
                empNoLoginPerson: curUser.empNo,
                empNoQueryPerson: record.empNo,
            },
        });
        browserHistory.push('/userEdit')
    }

    const userDelete = (record)=>{
        console.log(record.empNo)
        dispatch({ 
            type: 'user/userDelete', 
            payload: { 
                empNo: record.empNo 
            } 
        })
    }

    if (user.data.length == 0) {
        return <Spin />
    } else {
        let datas = user.data.empList;
        return (
            <QueueAnim>
                <div key="userList">
                    <div className={styles.headDiv}>
                        <Row type="flex" justify="space-between">
                            <Col span="12"><UserSearchForm user={user.data} dispatch={dispatch}/></Col>
                            <Col span="2"><Button icon="plus" onClick={toUserAdd}>添加用户</Button></Col>
                        </Row>
                    </div>
                    <div className={styles.tableDiv}>
                        <Table dataSource={datas} pagination={{ pageSize: 10, total: user.data.totalElements, onChange: onChange }} loading={user.loading}>
                            <Column title="用户名称" key="empName" dataIndex="empName" />
                            <Column title="用户角色" key="roleName" dataIndex="roleName" />
                            <Column title="性别" key="sex" dataIndex="sex" />
                            <Column title="邮箱" key="mail" dataIndex="mail" />
                            <Column title="电话" key="tel" dataIndex="tel" />
                            <Column title="操作" key="operation" render={(text, record, index) =>
                                <div>
                                    <a onClick={() => toUserEdit(record)} className={styles.editA}><Icon className={styles.editIcon} type="edit" /></a>
                                    <a className={styles.deleteA} onClick={() => userDelete(record)}><Icon className={styles.deleteIcon} type="close" /></a>
                                </div>}
                            />
                        </Table>
                    </div>
                    <Modal
                        visible={false}
                        title="提示信息"
                        
                        footer={[
                            <Button key="submit" type="primary" size="large" onClick={() => this.props.dispatch({ type: 'user/setVisible', payload: { visible: false } })}>知道了</Button>,
                        ]}
                    >
                        删除成功！
                  </Modal>
                </div>
            </QueueAnim>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(UserList)
