/**
 * Created by zhangle on 2017/3/20.
 */


import styles from './promotion.css'
import React from 'react'
import QueueAnim from 'rc-queue-anim';
import  PromotionTree  from './promotion_commodity.js'
import { connect } from 'dva'
import {
  Button,
  Text,
  Input,
  Row,
  Col,
  Form,
  Tooltip,
  Select,
  Icon,
  DatePicker,
  Upload,
  Modal,
} from 'antd'

import { browserHistory } from 'react-router'
const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker;
class SettingsFormRaw extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isshow:1
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    if(e.fileList.length>1) {
      e.fileList.splice(0, 1);
    }
    e.fileList[0].name='图片.png'
    return e && e.fileList;

  }
  submit(){
    this.props.form.validateFields((err,fieldsValue) =>{
      if (err) {
        return
      }
  /*    let begin_date = this.props.form.getFieldValue('beginDate');
      this.props.form.setFieldsValue({'beginDate':begin_date.format('YYYY-MM-DD')})
      let end_date = this.props.form.getFieldValue('endDate');

      this.props.form.setFieldsValue({'endDate':end_date.format('YYYY-MM-DD')})*/

      let pay =this.props.form.getFieldsValue();
      pay.beginDate=fieldsValue['beginDate'].format('YYYY-MM-DD')
      pay.endDate=fieldsValue['endDate'].format('YYYY-MM-DD')
      pay.brcNo="1";


      pay.prodList=this.props.promotionadd.keys
      console.log(pay,123)
      this.props.dispatch({
        type: 'promotionadd/addPomption',
        payload: pay,

      });

    })

  }


  onchange(){
    browserHistory.push('/promotionadd/commodity')

  }
  onbush(e) {
    console.log(e);
    this.setState({isshow: e})
  }

  render() {
    const {promotionadd} = this.props;

    if(promotionadd.isSubmit){
      browserHistory.push('/promotion')
      promotionadd.isSubmit=false
    }
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const order=()=>{
      if(this.state.isshow ==2){
        return(
          <div>
            <Form>
              <FormItem
                {...formItemLayout}
                label="添加商品"
              >
                {getFieldDecorator('promptionProdListReturnVO', {
                  initialValue: promotionadd.title,
                })(
                  <Input style={{width: 250}}/>
                )

                }
                <Button type="primary" style={{marginLeft: 10}} onClick={this.props.onClick}>确认</Button>
              </FormItem>
            </Form>
          </div>
        )
      }else {
        promotionadd.keys='';
        promotionadd.title='';
        return(
          <span></span>
        )
      }
    }
    return (
      <div style={{marginTop:20}}>
        <Form >
          <FormItem
            {...formItemLayout}
            label="优惠活动名称"
          >
            {getFieldDecorator('name', {
              rules: [
                { required: true,  },
              ],
            })(

              <Input style={{ width: 250 }}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠开始时间"
          >
            {getFieldDecorator('beginDate', {
              rules: [
                { required: true,  },
              ],
            })(
              <DatePicker  style={{ width: 250 }} type="beginDate"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠结束时间"
          >
            {getFieldDecorator('endDate', {
              rules: [
                { required: true,  },
              ],
            })(
              <DatePicker  style={{ width: 250 }} type="endDate"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠范围"
          >
            {getFieldDecorator('scope', {
              rules: [
                { required: true,  },
              ],
            })(
              <Select defaultValue="1"  style={{ width: 250 }} onChange={this.onbush.bind(this)}>
                <Option value="1">全部商品</Option>
                <Option value="2">部分商品</Option>
              </Select>
            )}
          </FormItem>
          {order()}
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                <Tooltip >
                <Icon type="question-circle-o" />
              </Tooltip>
                优惠方式&nbsp;
            </span>
            )}
          >
            {getFieldDecorator('preferentialType', {
              rules: [
                { required: true,  },
              ],

            })(
              <Select defaultValue="1"  style={{ width: 250 }}>
                <Option value="1">打折</Option>
                <Option value="2">享受现金满减</Option>
                <Option value="3">包邮</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="满"
          >
            {getFieldDecorator('fullPrice', {
              initialValue:'',

            })(

              <Input style={{ width: 250 }} type='fullPrice'/>

            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="减"
          >
            {getFieldDecorator('cutPrice', {
              initialValue:'',
            })(

              <Input style={{ width: 250  }} type='cutPrice'/>

            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="图片"
          >
            {getFieldDecorator('imgUrl', {
              initialValue:'',
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                { required: true,  },
              ],

            })(
              <Upload action="/api／promption/addPomption"    listType="picture" >
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="折扣"
          >
            {getFieldDecorator('discount', {
              initialValue:'',
            })(
              <div>
                <Input style={{ width: 250 }}/>
                <text style={{ marginLeft:20 }}>折</text>
              </div>
            )}
          </FormItem>

        </Form>
        <div className={styles.submit}>
          <Button style={{width:100,height:30,fontSize:15}} onClick={()=>this.submit()}>确定</Button>
        </div>
      </div>
    )
  }
}
const SettingsForm = Form.create()(SettingsFormRaw)

function PromotionAdd ({promotionadd,dispatch}) {
  const handleCancel = () => {

    dispatch({type: 'promotionadd/visible_false'})
  };
  const onClick=()=>{

    dispatch({type: 'promotionadd/visible_true'})
  }
  return (
    <QueueAnim>
      <div key = "1">
        <div className={styles.classification}>
          <Row>
            <Col>
              <h2>添加促销活动</h2>
            </Col>
            <Col>
              <Icon type="close" className={styles.icon3}></Icon>
            </Col>
          </Row>
        </div>
        <hr/>
        <div>
          <SettingsForm promotionadd={promotionadd} dispatch={dispatch}  onClick={onClick}/>
        </div>
        <Modal title="选择分类" visible={promotionadd.visible} onCancel={handleCancel}
               footer={null}
        >
          <p><PromotionTree promotionadd={promotionadd} dispatch={dispatch}/></p>
        </Modal>
      </div>
    </QueueAnim>
  );

}
function mapStateToProps(state) {
  return {
    promotionadd: state.promotionadd,
  };
}

export default connect(mapStateToProps)(PromotionAdd)
