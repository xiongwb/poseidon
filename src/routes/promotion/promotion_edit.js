/**
 * Created by zhangle on 2017/4/14.
 */


import moment from 'moment';
import styles from './promotion.css'
import React from 'react'
import QueueAnim from 'rc-queue-anim';
import  PromotionTree  from './promtion_tree.js'
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
  Modal
} from 'antd'


import { browserHistory } from 'react-router'
const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker, } = DatePicker;
class SettingsFormRaw extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isshow:this.props.promotion.record.scope
    }
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
    /*  let begin_date = this.props.form.getFieldValue('beginDate');
      this.props.form.setFieldsValue({'beginDate':begin_date.format('YYYY-MM-DD')})
      let end_date = this.props.form.getFieldValue('endDate');

      this.props.form.setFieldsValue({'endDate':end_date.format('YYYY-MM-DD')})*/

      let pay =this.props.form.getFieldsValue();
      pay.beginDate=fieldsValue['beginDate'].format('YYYY-MM-DD')
      pay.endDate=fieldsValue['endDate'].format('YYYY-MM-DD')
      pay.brcNo="1";
      pay.promotionNo=this.props.promotion.record.promotionNo
      pay.prodList=this.props.promotion.keys
      console.log(pay,123)
      this.props.dispatch({
        type: 'promotion/editPomption',
        payload: pay,
      });
    })
  }


  onbush(e) {
    console.log(e);
    this.setState({isshow: e})
  }


  onshang(){
    browserHistory.push('/promotion/commodity')
  }
  render() {
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
                  initialValue: promotion.title,
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
        promotion.keys='';
        promotion.title='';
        return(
          <span></span>
        )
      }
    }
    const {promotion} = this.props;

    if(promotion.isSubmit){
      browserHistory.push('/promotion')
      promotion.isSubmit=false
    }
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
  const titleList = [
      '0','全部商品' ,'部分商品'

    ]
   const titleType = [
      '0','打折降价' ,'满减' ,'捆绑' ,'赠送'

    ]
    const dateFormat = 'YYYY/MM/DD';
    return (
      <div style={{marginTop:20}}>
        <Form >
          <FormItem
            {...formItemLayout}
            label="优惠活动名称"
          >
            {getFieldDecorator('name', {
              initialValue:promotion.record.promotionName,
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
              <DatePicker defaultValue={moment(promotion.record.beginDate, dateFormat)} format={dateFormat}   style={{ width: 250 }} type="beginDate"/>
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
              <DatePicker  defaultValue={moment(promotion.record.endDate, dateFormat)} format={dateFormat}  style={{ width: 250 }} type="endDate"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠范围"
          >
            {getFieldDecorator('scope', {
              initialValue: promotion.record.scope,
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
              initialValue: promotion.record.preferentialType ,
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
              initialValue:promotion.record.fullPrice,

            })(

              <Input style={{ width: 250 }} type='fullPrice'/>

            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="减"
          >
            {getFieldDecorator('cutPrice', {
              initialValue:promotion.record.cutPrice,

            })(

              <Input style={{ width: 250  }} type='cutPrice'/>

            )}
          </FormItem>
         <FormItem
            {...formItemLayout}
            label="图片"
          >
            {getFieldDecorator('imgUrl', {

              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                { required: true,  },
              ],

            })(
              <Upload action="/api／promption/editPomption"    listType="picture" >
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
              initialValue:promotion.record.discount,


            })(
              <div>
                <Input style={{ width: 250 }} defaultValue={promotion.record.discount}/>
                <text style={{ marginLeft:20 }}>折</text>
              </div>
            )}
          </FormItem>

        </Form>

        <div className={styles.submit}>
          <Button style={{width:100,height:30,fontSize:15}}onClick={()=>this.submit()} >确定</Button>
        </div>
      </div>
    )
  }
}
const SettingsForm = Form.create()(SettingsFormRaw)

function PromotionEdit ({promotion,dispatch}) {

    const handleCancel = () => {

      dispatch({type: 'promotion/visible_false'})
    };
  const onClick=()=>{

    dispatch({type: 'promotion/visible_true'})
  }
  return (
    <QueueAnim>
      <div key = "1">
        <div className={styles.classification}>
          <Row>
            <Col>
              <h2>修改促销活动</h2>
            </Col>
            <Col>
              <Icon type="close" className={styles.icon3}></Icon>
            </Col>
          </Row>
        </div>
        <hr/>
        <div>
          <SettingsForm promotion={promotion} dispatch={dispatch}  onClick={onClick}/>
        </div>
        <Modal title="选择分类" visible={promotion.visible} onCancel={handleCancel}
               footer={null}
        >
          <p><PromotionTree promotion={promotion} dispatch={dispatch}/></p>
        </Modal>
      </div>
    </QueueAnim>
  );

}
function mapStateToProps(state) {
  return {
    promotion: state.promotion,
  };
}

export default connect(mapStateToProps)(PromotionEdit)
