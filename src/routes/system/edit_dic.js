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

class EditDicForm extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      setFieldsValue:true
    })
  }
  submit(){
    this.props.form.validateFields((err,fieldsValue) =>{
      if (err) {
        return
      }
      console.log(this.props.form.getFieldsValue());

      this.props.dispatch({
        type: 'system/editDict',
        payload: this.props.form.getFieldsValue(),
      });
    })
  }

  render(){
    const {system} = this.props;
     console.log(system);
    if(system.isSubmit){
      browserHistory.push('/system');
      system.isSubmit=false
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
            label="字典编号"
          >
            {getFieldDecorator('dictNo', {
              initialValue:system.record.dictNo,
              rules: [ {
                required: true, message: '请输入字典编号',
              }],
            })(
              <Input disabled  style={{width:250}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="字典名称"
          >
            {getFieldDecorator('dictName', {
               initialValue:system.record.dictName,
              rules: [ {
                required: true, message: '请输入字典名称',
              }],
            })(
              <Input style={{width:250}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="字典描述"
          >
            {getFieldDecorator('describtion', {
              initialValue:system.record.describtion,
              rules: [ {
                required: true, message: '请输入字典描述',
              }],
            })(
              <Input type='textarea' style={{width:250,height:100,borderColor:'#cccccc'}} />
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

const EditDictForm = Form.create()(EditDicForm);

function EditDic({system,dispatch}) {
  return (
    <QueueAnim>
        <div key="key1">
          <Spin   tip="Loading..." spinning={system.loading}>
            <h1>编辑字典</h1>
            <hr/>
            <EditDictForm system={system} dispatch={dispatch}/>
          </Spin>
        </div>
    </QueueAnim>
  );
}

function mapStateToProps(state) {
    return {
      system: state.system,
    };
  }
export default connect(mapStateToProps)(EditDic)
