import styles from './system.css'
import React from 'react'
import { connect } from 'dva'
import {
  Button,
  Text,
  Input,
  Form,
  Spin
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item;

class AddDetailForm extends React.Component {
  constructor(props){
    super(props);
  }
  submit(){
    this.props.form.validateFields((err,fieldsValue) =>{
      if (err) {
        return
      }
      console.log(this.props.form.getFieldsValue());

      this.props.dispatch({
        type: 'systemDetail/addDictDetail',
        payload: this.props.form.getFieldsValue(),
      });
    })
  }

  render(){

    const { systemDetail } = this.props;
    if(systemDetail.isSubmit){
      browserHistory.push('/system/detail');
      systemDetail.isSubmit=false
    }
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return(
      <div style={{marginTop:20}}>
        <Form>
          <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('dictNo', {
                 initialValue:systemDetail.dictNo,
                rules: [ {
                  required: true, message: '请输入Key',
                }],
              })}
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="Key"
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
              label="Value"
            >
              {getFieldDecorator('dictValue', {
                rules: [ {
                  required: true, message: '请输入Value',
                }],
              })(
                <textarea style={{width:250,height:100,borderColor:'#cccccc'}} />
              )}
          </FormItem>
        </Form>
        <div className={styles.submit}>
          <Button  onClick={()=>this.submit()} style={{width:100,height:30,fontSize:15}}>提交</Button>
        </div>
      </div>
    )
  }
}

const AddDetailtForm = Form.create()(AddDetailForm);


function AddDetail({systemDetail,dispatch}) {
console.log(systemDetail,1213);
    return (
      <QueueAnim>
        <div key="key1">
          <Spin   tip="Loading..." spinning={systemDetail.loading}>
            <h1>新增字典</h1>
            <hr/>
            <AddDetailtForm systemDetail={systemDetail} dispatch={dispatch}/>
          </Spin>
        </div>
      </QueueAnim>
    );
}
function mapStateToProps(state) {
    return {
      systemDetail: state.systemDetail,
    };
  }
export default connect(mapStateToProps)(AddDetail)
