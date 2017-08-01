import React from 'react'
import { connect } from 'dva'
import styles from './userEdit.css'

import {
    Form, Button, Input, Row, Col, Table, Icon, Radio, Select,Spin,Checkbox
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class EditForm extends React.Component {
    submit(){
        this.props.form.validateFields((err,fieldsValue) =>{
          if (err) {
            return
          }
          this.props.dispatch({
            type: 'user/editUser',
            payload: this.props.form.getFieldsValue(),
          });
        })
    }

    render() {
        if(this.props.mergeFlag){
            browserHistory.push('/userList')
            this.props.dispatch({
                type: 'user/save',
                payload: {mergeFlag:false}
            });
          }
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14, offset: 1 },
        }
        let options = new Array();
        let roles = this.props.user.roleForLoginPerson;
        for(let i in roles){
            options.push({
                value:roles[i].roleNo,
                label:roles[i].roleName
            })
        }
        let values = new Array();
        let hadRoles = this.props.user.roleQueryPerson;
        for(let i in hadRoles){
            values.push(hadRoles[i].roleNo)
        }
        console.log(values)
        return (
            <Form >
                <FormItem
                    wrapperCol={{ span: 0 }}
                >
                    {getFieldDecorator('empNo', {
                        initialValue: this.props.user.empNo
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名称"
                >
                    {getFieldDecorator('empName', {
                        rules: [
                            { required: true, message: '用户名称不能为空!' },
                        ],
                        initialValue: this.props.user.empName
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="登陆名称"
                >
                    {getFieldDecorator('loginName', {
                        initialValue: this.props.user.loginName
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                >
                    {getFieldDecorator('sex', {
                        rules: [
                            { required: true, message: '请选择!' },
                        ],
                        initialValue: this.props.user.sex
                    })(
                        <RadioGroup >
                            <Radio value="1">男</Radio>
                            <Radio value="2">女</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电子邮箱"
                >
                    {getFieldDecorator('mail', {
                        rules: [
                            { required: true, message: '邮箱不能为空!' },
                        ],
                        initialValue: this.props.user.mail
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话"
                >
                    {getFieldDecorator('tel', {
                        rules: [
                            { required: true, message: '电话不能为空!' },
                        ],
                        initialValue: this.props.user.tel
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色"
                >
                    {getFieldDecorator('role', {
                        rules: [
                            { required: true, message: '请选择!' },
                        ],
                        initialValue: values
                    })(
                        <CheckboxGroup options={options}/>
                        )}
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
                </FormItem>
            </Form>
        )
    }
}

const UserEditForm = Form.create()(EditForm)

function UserEdit({user, dispatch}) {
    
    if(user.data.roleForLoginPerson!=null&&user.data.roleForLoginPerson.length>0){
        return (
            <QueueAnim>
            <div key="userEdit">
                <div className={styles.headDiv}>
                    <Row>
                        <Col span="23"><h2>编辑用户</h2></Col>
                        <Col span="1"><a href="/userList" className={styles.closeA}><Icon className={styles.closeIcon} type="close" /></a></Col>
                    </Row>
                </div>
                <div className={styles.formDiv}>
                    <UserEditForm user={user.data} dispatch={dispatch} mergeFlag={user.mergeFlag}/>
                </div>
            </div>
            </QueueAnim>
        )
    }else{
        return <Spin/>
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(UserEdit)
