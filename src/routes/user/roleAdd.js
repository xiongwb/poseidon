import React from 'react'
import { connect } from 'dva'
import styles from './roleAdd.css'

import {
    Form, Button, Input, Row, Col, Table, Icon, Radio, Select,
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddForm extends React.Component {

    submit(){
        this.props.form.validateFields((err,fieldsValue) =>{
          if (err) {
            return
          }
          this.props.dispatch({
            type: 'role/addRole',
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
                    {...formItemLayout}
                    label="角色编号"
                >
                    {getFieldDecorator('roleNo', {
                        rules: [
                            { required: true, message: '角色编号不能为空!' },
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色名称"
                >
                    {getFieldDecorator('roleName', {
                        rules: [
                            { required: true, message: '角色名称不能为空!' },
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色描述"
                >
                    {getFieldDecorator('description', {

                    })(
                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
                </FormItem>
            </Form>
        )
    }
}

const RoleAddForm = Form.create()(AddForm)

function RoleAdd({role, dispatch}) {
    return (
        <QueueAnim>
        <div key="roleAdd">
            <div className={styles.headDiv}>
                <Row>
                    <Col span="23"><h2>添加角色</h2></Col>
                    <Col span="1"><a href="/roleList" className={styles.closeA}><Icon className={styles.closeIcon} type="close" /></a></Col>
                </Row>
            </div>
            <div className={styles.formDiv}>
                <RoleAddForm dispatch={dispatch} mergeFlag={role.mergeFlag}/>
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

export default connect(mapStateToProps)(RoleAdd)
