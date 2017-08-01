import styles from './homepage.css'
import React from 'react'
import { connect } from 'dva'
import {
  Text,
  Input,
  Row,
  Col,
  Form,
  Select,
  Icon
} from 'antd'

import QueueAnim from 'rc-queue-anim';
const FormItem = Form.Item;

class HomePagelForm extends React.Component {
  constructor(props){
    super(props);
  }
  submit(){

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const specifications = this.state.keys.map((s, i) => {

      return (
        <div style={{marginTop:20}}>
            <FormItem
              {...formItemLayout}
              label="位置"
            >
              {getFieldDecorator('dictKey', {
                rules: [ {
                  required: true, message: '请输入Key',
                }],
              })(
                <Input style={{width:250}}/>
              )}
              <Icon style={{marginLeft: 20}} type="arrow-down"/>
              <Icon style={{marginLeft: 20}} type="arrow-up"/>
              <Icon style={{marginLeft: 20}} type="plus"/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('dictKey', {
                rules: [ {
                  required: true, message: '请输入Key',
                }],
              })(
                <Input style={{width:250}}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="方式"
            >
              {getFieldDecorator('dictKey', {
                rules: [ {
                  required: true, message: '请输入Key',
                }],
              })(
                <Select

                  style={{width:250}}
                >
                  <Option value="rmb">轮播图</Option>
                  <Option value="dollar">小图</Option>
                  <Option value="dollar">大图</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="促销活动"
            >
              {getFieldDecorator('dictValue', {
                rules: [ {
                  required: true, message: '请输入Value',
                }],
              })(
                <Select


                  style={{width:250}}

                >
                  <Option value="rmb">新春上新</Option>
                  <Option value="dollar">周末大酬宾</Option>
                  <Option value="dollar">聚划算</Option>
                </Select>
              )}
            </FormItem>
          <hr/>
        </div>
      );
    });
    return(
      <div style={{marginTop:20}}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="位置"
          >
            {getFieldDecorator('dictKey', {
              rules: [ {
                required: true, message: '请输入Key',
              }],
            })(
              <Input style={{width:250}}/>
            )}
            <Icon style={{marginLeft: 20}} type="arrow-down"/>
            <Icon style={{marginLeft: 20}} type="arrow-up"/>
            <Icon style={{marginLeft: 20}} type="plus"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator('dictKey', {
              rules: [ {
                required: true, message: '请输入Key',
              }],
            })(
              <Input style={{width:250}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="方式"
          >
            {getFieldDecorator('dictKey', {
              rules: [ {
                required: true, message: '请输入Key',
              }],
            })(
              <Select

                style={{width:250}}
              >
                <Option value="rmb">轮播图</Option>
                <Option value="dollar">小图</Option>
                <Option value="dollar">大图</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="促销活动"
          >
            {getFieldDecorator('dictValue', {
              rules: [ {
                required: true, message: '请输入Value',
              }],
            })(
              <Select


                style={{width:250}}

              >
                <Option value="rmb">新春上新</Option>
                <Option value="dollar">周末大酬宾</Option>
                <Option value="dollar">聚划算</Option>
              </Select>
            )}
          </FormItem>
        </Form>
        <hr/>
      </div>
    )
  }
}

const HomePagelsForm = Form.create()(HomePagelForm);

function HomePage({homepage, dispatch}){





    return (
      <QueueAnim>
        <div key="key1">
          <div className={styles.bank}>
            <Row>
              <Col>
                <h3>设计APP商城首页</h3>
              </Col>
            </Row>
            <hr/>

          </div>
          <HomePagelsForm />
        </div>
      </QueueAnim>
    );

}
function mapStateToProps(state) {
  return {
    homepage: state.homepage,
  };
}
export default connect(mapStateToProps)(HomePage)
