import React from 'react'
import { connect } from 'dva'
import styles from './roleEdit.css'

import {
    Form, Button, Input, Row, Col, Icon, Select,Spin,
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item

class EditForm extends React.Component {
    submit(){
        console.log(111)
        this.props.form.validateFields((err,fieldsValue) =>{
          if (err) {
            return
          }
          this.props.dispatch({
            type: 'role/editRole',
            payload: this.props.form.getFieldsValue(),
          });
        })
    }

    render() {
        if(this.props.mergeFlag){
            browserHistory.push('/roleList')
            this.props.dispatch({
                type: 'role/save',
                payload: {mergeFlag:false}
            });
          }
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14, offset: 1 },
        }
        return (
            <Form horizontal>
                <FormItem
                    wrapperCol={{ span: 0 }}
                >
                    {getFieldDecorator('roleNo', {
                        initialValue: this.props.role.roleNo
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色编号"
                >
                    <span>{this.props.role.roleNo}</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色名称"
                >
                    {getFieldDecorator('roleName', {
                        rules: [
                            { required: true, message: '角色名称不能为空!' },
                        ],
                        initialValue: this.props.role.roleName
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色描述"
                >
                    {getFieldDecorator('description', {
                        initialValue: this.props.role.description
                    })(
                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }}/>
                        )}
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
                </FormItem>
            </Form>
        )
    }
}

const RoleEditForm = Form.create()(EditForm)

function RoleEdit({role, dispatch}) {
    
    return (
        <QueueAnim>
        <div>
            <div className={styles.headDiv}>
                <Row>
                    <Col span="23"><h2>编辑角色</h2></Col>
                    <Col span="1"><a href="/roleList" className={styles.closeA}><Icon className={styles.closeIcon} type="close" /></a></Col>
                </Row>
            </div>
            <div className={styles.formDiv}>
                <RoleEditForm role={role.data} dispatch={dispatch} mergeFlag={role.mergeFlag}/>
            </div>
        </div>
        </QueueAnim>
    )
    
}

function mapStateToProps(state) {
    return {
        role: state.role,
    };
}

export default connect(mapStateToProps)(RoleEdit)
