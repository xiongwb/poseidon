import React from 'react'
import { connect } from 'dva'
import styles from './login.css'
import logo from '../../assets/yay.jpg'
import {getLocalStorage} from '../../utils/helper'
import {
  Form, Button, Input,Spin
} from 'antd'
import { browserHistory } from 'react-router'
import DashBoard from '../dashboard'
const FormItem = Form.Item;
import Storage from '../../utils/storage'
class LoginForm extends React.Component{
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        browserHistory.push('/dashboard')
      }
    })
  }

  submit(){
    this.props.form.validateFields((err,fieldsValue) =>{
      if (err) {
        return
      }
      this.props.dispatch({
        type: 'login/login',
        payload: this.props.form.getFieldsValue(),
      });
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('loginName', {
            rules: [
              { required: true, message: '用户名不能为空!' },
            ],
          })(
            <Input placeholder='请输入用户名'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('pwd', {
            rules: [
              { required: true, message: '密码不能为空!' },
            ],
          })(
            <Input placeholder='请输入密码' type='password'/>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 8, offset: 6 }}>

          <Button type="primary" className={styles.btn_login} onClick={()=>this.submit()}>登陆</Button>
        </FormItem>
      </Form>
    )
  }
}

const LoginFormComponent = Form.create()(LoginForm);

function Login({login,dispatch}) {
  // 纯函数创建组建  无状态管理和生命周期方法
  console.log(login.data);
  if (getLocalStorage(Storage.DID_LOGIN)) {
    return <DashBoard />
  } else {
    return (
      <div className={styles.root}>
        <Spin tip="Loading..." spinning={login.loading}>
          <div>
            <img src={logo} className={styles.logo}/>
          </div>
          <div className={styles.loginForm}>
            <LoginFormComponent login={login} dispatch={dispatch}/>
          </div>
        </Spin>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(Login)
