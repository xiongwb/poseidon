import styles from './bank.css'
import React from 'react'
import { connect } from 'dva'

import {
  Form,
  Input,
  Select,
  Button,
  Cascader,
  Checkbox,
  Row,
  Col,
  Collapse,
  Modal,
  TreeSelect
} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const Panel = Collapse.Panel;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0',
    children: [{
      label: 'Child Node1',
      value: '0-0-0-0',
      key: '0-0-0-0',
    }]
  },{
    label: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
  }],
}];

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const option = ['是否有分店：','是否可刷卡：','是否有Wifi：','是否能吸烟：','是否有包间：','是否有表演：','是否能停车：','是否能订座：'];


class AddProductionForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      visible:false,
      value: ['0-0-0'],
    }
  }

  onTreeChange = (value) => {
    console.log('onChange ', value, arguments);
    this.setState({ value });
  }


  onChange(value) {
  console.log(value);
  }

  handleChange(){
    console.log("选择")
  }

  render(){

    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onTreeChange,
      multiple: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      placeholder:"请选择所属分类",
      style: {
        width: 250,
      },
    };

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return(
        <div style={{marginTop:20}}>
          <Form>
            <FormItem
              {...formItemLayout}
              label="商户类型"
            >
              {getFieldDecorator('storeType', {
                rules: [ {
                  required: true, message: '请选择商户类型',
                }],
              })(
                <Select
                  style={{ width: 250 }}
                  showSearch={false}
                  onChange={this.handleChange}
                >
                  <OptGroup>
                    <Option value="jack">企业商户</Option>
                    <Option value="lucy">个人商户</Option>
                  </OptGroup>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商户证件类型"
            >
              {getFieldDecorator('cardType', {
                rules: [ {
                  required: true, message: '请选择证件类型',
                }],
              })(
                <Select
                  style={{ width: 250 }}
                  showSearch={false}
                  onChange={this.handleChange}
                >
                  <OptGroup>
                    <Option value="jack">营业执照</Option>
                    <Option value="lucy">身份证</Option>
                  </OptGroup>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商户证件号码"
            >
              {getFieldDecorator('cardNo', {
                rules: [ {
                  required: true, message: '请输入证件号',
                }],
              })(
                <div className={styles.formText}>
                  <Input className={styles.form_items} placeholder='请输入证件号' style={{width:250}} />
                  <text style={{marginLeft:20}}>最大可输入18为证件号码</text>
                </div>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商户名称"
            >
              {getFieldDecorator('storeName', {
                rules: [ {
                  required: true, message: '请输入商户名称',
                }],
              })(
                <div className={styles.formText}>
                  <Input className={styles.form_items} placeholder='请输入商户名称' style={{width:250}} />
                  <text style={{marginLeft:20}}>商户名称最大可输入50位</text>
                </div>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="店铺名称"
            >
              {getFieldDecorator('store', {
                rules: [ {
                  required: true, message: '请输入店铺名称',
                }],
              })(
                <div className={styles.formText}>
                  <Input className={styles.form_items} placeholder='请输入店铺名称' style={{width:250}} />
                  <text style={{marginLeft:20}}>请输入2-20位的店铺名称</text>
                </div>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属分类"
            >
              {getFieldDecorator('belong', {
                rules: [ {
                  required:true,message:'请选择所属分类'
                }],
              })(
                <TreeSelect {...tProps} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="店铺详细地址"
            >
              {getFieldDecorator('address', {
                rules: [ {
                  required: true, message: '请选择所在地区',
                }],
              })(
                <div>
                  <Cascader options={options} onChange={this.onChange} style={{width:250}} />
                  <Input className={styles.form_items} placeholder='请输入详细地址' style={{width:200,marginLeft:20}} />
                  <text style={{marginLeft:20}}>请输入2-20位的店铺详细地址</text>
                </div>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人电话"
            >
              {getFieldDecorator('telePhone', {
                rules: [ {
                  required: true, message: '请输入配送费',
                }],
              })(
                <Input className={styles.form_items} placeholder='请输入联系人电话' style={{width:250}} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="门店电话"
            >
              {getFieldDecorator('storePhone', {
                rules: [ {
                  required: true, message: '请输入门店电话',
                }],
              })(
                <Input className={styles.form_items} placeholder='请输入门店电话' style={{width:250}} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="营业时间"
            >
              {getFieldDecorator('time', {
                rules: [ {
                  required: true, message: '请输入营业时间',
                }],
              })(
                <Input className={styles.form_items} placeholder='请输入营业时间' style={{width:250}} />
              )}
            </FormItem>
          </Form>
          {option.map((data)=>{
            return(
              <div className={styles.formCheck}>
                <Row>
                  <Col span={4}>
                    <div className={styles.messageLeft}>
                      <text>{data}</text>
                    </div>
                  </Col>
                  <Col span={20}>
                    <Checkbox style={{marginLeft:20}} />
                  </Col>
                </Row>
              </div>
            )
          })}
          <div className={styles.submit}>
            <Button style={{width:100,height:30,fontSize:15}}>提交</Button>
          </div>
        </div>
    )
  }
}

const ProductionForm = Form.create()(AddProductionForm);

class AddStore extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>添加商户</h1>
        <hr/>
        <ProductionForm component={this}/>
      </div>
    );
  }
}

export default connect()(AddStore)
