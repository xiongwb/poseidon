import styles from './promotion.css'
import React from 'react'
import { connect } from 'dva'
import {
  Button,
  Text,
  Input,
  Form,
  Spin,
  Checkbox,
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item;

class EditDicForm extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      setFieldsValue:true
    })
  }


  render(){
    const {promotion} = this.props;
    console.log(promotion);
    if(promotion.isSubmit){
      browserHistory.push('/promotion');
      promotion.isSubmit=false
    }
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const titleList = [
      '0','全部商品' ,'部分商品'

    ]
    const titleType = [
      '0','打折降价' ,'满减' ,'捆绑' ,'赠送'

    ]
    const titlemend = [
      '0','已推荐' ,'未推荐'

    ]
    const titlestate =[
      '0','已开启促销活动','未开启促销活动'
    ]
    let str = ''
    if(promotion.record.promptionProdListReturnVO){
      for(let i in promotion.record.promptionProdListReturnVO){
        str +=promotion.record.promptionProdListReturnVO[i].prodName +'、'
      }
      str=str.substring(0,str.length-2);
    }



    return(
      <div style={{marginTop:20}}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="优惠活动名称"
          >
            {getFieldDecorator('promotionName', {

            })(
              <text>{promotion.record.promotionName}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠开始时间"
          >
            {getFieldDecorator('beginDate', {

            })(
              <text>{promotion.record.beginDate}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠结束时间"
          >
            {getFieldDecorator('endDate', {

            })(
              <text>{promotion.record.endDate}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠范围"
          >
            {getFieldDecorator('scope', {

            })(
              <text>{titleList[promotion.record.scope]}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="添加商品"
          >
            {getFieldDecorator('promotionName', {

            })(

              <text>{str}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="优惠方式"
          >
            {getFieldDecorator('preferentialType', {

            })(
              <text>{titleType[promotion.record.preferentialType]}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="折扣"
          >
            {getFieldDecorator('discount', {

            })(
              <text>{promotion.record.discount+'折'}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否开启"
          >
            {getFieldDecorator('state', {

            })(
              <text>{titlestate[promotion.record.state]}</text>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否推荐"
          >
            {getFieldDecorator('isRecommend', {

            })(
              <text>{titlemend[promotion.record.isRecommend]}</text>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="推荐图片"
          >
            {getFieldDecorator('imgUrl', {

            })(
              <text>{promotion.record.imgUrl}</text>
            )}
          </FormItem>


        </Form>

      </div>
    )
  }
}

const EditDictForm = Form.create()(EditDicForm);


function PromotionOpen({promotion,dispatch}) {
  console.log(promotion,23);
  let str =''
  let stt=''
  if(promotion.record.state ==2){
    str ="开启促销活动"
    stt='确认开启'
  }else {
    str='关闭促销活动'
    stt='确认关闭'
  }
  const onChange =()=>{
    if(promotion.record.state ==2){
        console.log(promotion,1111111)
      dispatch({
        type: 'promotion/openPomption',
        payload: {
          promotionNo:promotion.record.promotionNo,
        },
      });
      browserHistory.push('/promotion')
    }else {

      dispatch({
        type: 'promotion/closePomption',
        payload: {
          promotionNo:promotion.record.promotionNo,
        },
      });
      browserHistory.push('/promotion')
    }
  }
  return (
    <QueueAnim>
      <div key="key1">
        <Spin   tip="Loading..." spinning={promotion.loading}>
          <h1>{str}</h1>
          <hr/>
          <EditDictForm promotion={promotion} dispatch={dispatch}/>
        </Spin>
        <Button onClick={()=>onChange()} className={styles.hh}>{stt}</Button>
      </div>
    </QueueAnim>
  );
}
function mapStateToProps(state) {
  return {
    promotion: state.promotion,
  };
}
export default connect(mapStateToProps)(PromotionOpen)
