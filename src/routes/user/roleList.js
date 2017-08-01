import React from 'react'
import { connect } from 'dva'
import styles from './roleList.css'

import {
    Form, Button, Input, Row, Col, Table, Icon, Modal, Spin
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item
const { Column, ColumnGroup } = Table;

class SearchForm extends React.Component {
    search(){
        this.props.dispatch({
            type: 'role/findRoleList',
            payload: {
                page:1,
                size:10,
                roleName:this.props.form.getFieldValue("roleName")
            },
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form inline>
                <FormItem>
                    {getFieldDecorator('roleName', {
                        
                    })(
                        <Input placeholder='角色名称' />
                        )}
                </FormItem>
                <FormItem >
                    <Button onClick={this.search.bind(this)} className={styles.searchBtn} htmlType="submit" icon="search" />
                </FormItem>
            </Form>
        )
    }
}

const RoleSearchForm = Form.create()(SearchForm)

function RoleList({role, dispatch}) {
    
    const onChange = (page) => {
        dispatch({
            type: 'role/findRoleList',
            payload: {
                page: page,
                size: 10,
            },
        });
    };

    const toRoleAdd = () => {
        browserHistory.push('/roleAdd')
    };

    const toRoleEdit = (record) => {
        dispatch({
            type: 'role/save',
            payload: {
                data:record
            },
        });
        browserHistory.push('/roleEdit')
    }

    const roleDelete = (record)=>{
        dispatch({ 
            type: 'role/delRole', 
            payload: { 
                roleNo: record.roleNo 
            } 
        })
    }

    if (role.data.length == 0) {
        return <Spin />
    } else {
        let datas = role.data.roleList;
        return (
            <QueueAnim>
            <div key="roleList">
              <div className={styles.headDiv}>
                <Row type="flex" justify="space-between">
                    <Col span="12"><RoleSearchForm role={role.data} dispatch={dispatch}/></Col>
                    <Col span="2"><Button icon="plus" onClick={toRoleAdd}>添加角色</Button></Col>
                </Row>
              </div>
              <div className={styles.tableDiv}>
                <Table dataSource={datas} pagination={{ pageSize: 10, total: role.data.totalElements, onChange: onChange }} loading={role.loading}>
                    <Column title="角色编号" key="roleNo" dataIndex="roleNo" />
                    <Column title="角色名称" key="roleName" dataIndex="roleName" />
                    <Column title="描述" key="description" dataIndex="description" />
                    <Column title="操作" key="operation" render={(text, record) =>
                            <div>
                                <a onClick={() => toRoleEdit(record)} className={styles.editA}><Icon className={styles.editIcon} type="edit" /></a>
                                <a className={styles.deleteA} onClick={() => roleDelete(record)}><Icon className={styles.deleteIcon} type="close" /></a>
                            </div>}
                    />
                </Table>  
              </div>
              <Modal
                  visible={false}
                  title="提示信息"
                  footer={[
                        <Button key="submit" type="primary" size="large" onClick={() => this.setState({ visible:false})}>知道了</Button>,
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
        role: state.role,
    };
}

export default connect(mapStateToProps)(RoleList)
