/**
 * Created by zhangle on 2017/3/9.
 */


import styles from './classification.css'
import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Form,
  Select,
  Icon,

} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';
const FormItem = Form.Item


class SettingsFormRaw extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  normFile(e) {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
    <div style={{marginTop:20}}>
      <Form >
        <FormItem
          {...formItemLayout}
          label="商品或商户"
        >
          {getFieldDecorator('商品', {
            rules: [
              { required: true,  },
            ],
          })(
            <h3>商户</h3>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="父分类"
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true,  },
            ],
          })(
            <h3>手机</h3>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类名称"
        >
          {getFieldDecorator('username', {
            rules: [
              { required: true,  },
            ],
          })(
            <Input style={{ width: 250 }}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类描述"
        >
          {getFieldDecorator('miaoshu', {
            rules: [
              { required: true,  },
            ],
          })(
            <Input type="textarea" autosize={{ minRows: 4, maxRows: 3 }} style={{ width: 250 }}/>
          )}
        </FormItem>

      </Form>
      <div className={styles.submit}>
        <Button style={{width:100,height:30,fontSize:15}}>提交</Button>
      </div>
    </div>

    )
  }
}
const SettingsForm = Form.create()(SettingsFormRaw)

class ClassificationModify extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    };

  }


  render() {
    return (
      <QueueAnim>
        <div key = "1">
        <div className={styles.classification}>
          <Row>
            <Col>
              <h2>修改分类</h2>
            </Col>
            <Col>
              <Icon type="close" className={styles.icon3}></Icon>
            </Col>
          </Row>
        </div>
        <hr/>
        <div >
          <SettingsForm />
        </div>


        </div>
      </QueueAnim>
    );
  }
}

export default connect()(ClassificationModify)
