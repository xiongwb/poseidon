import styles from './classification.css'
import React from 'react'
import { connect } from 'dva'
import {
  Button,
  Text,
  Input,
  Icon,
  Form,
  Upload,
  Spin
} from 'antd'



const FormItem = Form.Item;

class ClassificationEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList:'',
    }
  }
  submit(){
    this.props.form.validateFields((err,fieldsValue) =>{
      if (err) {
        return
      }

      let payload=this.props.form.getFieldsValue()
      payload.imgUrl=this.props.form.getFieldsValue().imgUrl[0].thumbUrl
      console.log(payload,111441)
      this.props.dispatch({
        type: 'classification/editKind',
        payload: payload
      });
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
    return e && e.fileList;

  }
  render(){
    const { getFieldDecorator,setFieldsValue } = this.props.form;
    const { classification } = this.props;
    console.log(classification.edit, 2)

    const  fileList = [{
      uid: -1,
      name: classification.edit.basKindEntity.imgName,
      status: 'done',
      url: classification.edit.basKindEntity.imgUrl,
      thumbUrl: classification.edit.basKindEntity.imgUr,
    }]

    if(classification.setvalue){
      setFieldsValue({ imgUrl: fileList,name:classification.edit.basKindEntity.name });
      classification.setvalue=false
    }





    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return(
      <div style={{marginTop:20}}>
        <Spin tip="Loading..." spinning={this.props.classification.loading}>
        <Form>
          <FormItem
            {...formItemLayout}

          >
            {getFieldDecorator('type', {
              initialValue:2,

            })(
              <Input type="hidden" style={{width:250}}/>
            )}
            {getFieldDecorator('kindNo', {
              initialValue:classification.kindNo,

            })(
              <Input type="hidden" style={{width:250}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="分类名称"
          >
            {getFieldDecorator('name', {
              initialValue:classification.edit.basKindEntity.name,
              rules: [ {
                required: true, message: '请输入分类名称',
              }],
            })(
              <Input style={{width:250}}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="图片"
          >
            {getFieldDecorator('imgUrl', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              initialValue:fileList,
              rules: [{
                required: true, message: '请上传图片',
              }],
            })(
              <Upload action="/api/dict/addDict"   className={styles.upload} listType="picture" >
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            )}
          </FormItem>
        </Form>
        <div className={styles.submit}>
          <Button  onClick={()=>this.submit()} style={{width:100,height:30,fontSize:15}}>提交</Button>
        </div>
      </Spin>
      </div>
    )
  }
}
const ClassificationEdit = Form.create()(ClassificationEditForm);
export default connect()(ClassificationEdit)
