import React from 'react'
import { connect } from 'dva'
import styles from './userAdd.css'

import {
    Form, Button, Input, Row, Col, Table, Icon, Radio, Select,Spin,Checkbox
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class AddForm extends React.Component {

    selectChange(value){
        this.props.dispatch({
            type:'user/findBrcNo',
            payload:{
                type:value
            }
        })
    }

    submit(){
        this.props.form.validateFields((err,fieldsValue) =>{
          if (err) {
            return
          }
          this.props.dispatch({
            type: 'user/addUser',
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
        return (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label="用户名称"
                >
                    {getFieldDecorator('empName', {
                        rules: [
                            { required: true, message: '用户名称不能为空!' },
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="登录名称"
                >
                    {getFieldDecorator('loginName', {

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
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户类型"
                >
                    {getFieldDecorator('type', {
                        rules: [
                            { required: true, message: '用户类型不能为空!' },
                        ],
                    })(
                        <Select onChange={this.selectChange.bind(this)}>
                            <Option value="1">系统</Option>
                            <Option value="2">供应商</Option>
                            <Option value="3">银行</Option>
                            <Option value="4">商户</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="银行/商户"
                >
                    {getFieldDecorator('productOrShopNo', {
                        rules: [
                            { required: true, message: '用户类型不能为空!' },
                        ],
                    })(
                        <Select >
                            
                            {this.props.productOrShopNoList==null?
                                <Option value={null}>请先选择用户类型</Option>
                                :
                                this.props.productOrShopNoList.map((item)=>{
                                    return <Option value={item.brcNo}>{item.brcName}</Option>
                                })
                            }
                        </Select>
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

const UserAddForm = Form.create()(AddForm)

function UserAdd({user, dispatch}) {
    if(user.data.roleForLoginPerson!=null&&user.data.roleForLoginPerson.length>0){
        return (
            <QueueAnim>
            <div key="userAdd">
                <div className={styles.headDiv}>
                    <Row>
                        <Col span="23"><h2>添加用户</h2></Col>
                        <Col span="1"><a href="/userList" className={styles.closeA}><Icon className={styles.closeIcon} type="close" /></a></Col>
                    </Row>
                </div>
                <div className={styles.formDiv}>
                  <UserAddForm user={user.data} dispatch={dispatch} productOrShopNoList={user.productOrShopNoList} mergeFlag={user.mergeFlag}/>
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

export default connect(mapStateToProps)(UserAdd)
