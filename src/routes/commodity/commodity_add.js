import {Modal, Radio, Form, Input, Upload, Icon, Cascader, Select, Row, Col, Checkbox, Button, TreeSelect} from 'antd';

import {browserHistory} from 'react-router'
import React from 'react'
import {connect} from 'dva'
import Storage from '../../utils/storage'
import {getLocalStorage} from '../../utils/helper'
import  CommodityTree  from './commodityadd_tree'
import styles from './commodity.css'
import QueueAnim from 'rc-queue-anim';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
var uuid = 0;

class GoodsForm extends React.Component {
  state = {
    confirmDirty: false,
    value: 1,
    keys: [0],
    content: [],
    attrNo: []
  };

  plus() {
    uuid++;
    this.state.keys.push(uuid);
    this.setState({})
  }

  minus(i) {
    if (this.state.keys.length > 1) {
      this.state.keys.splice(i, 1);
      this.setState({})
    }
  }

  submit() {

    let name = [];
    let stock = [];
    let purchasePrice = [];
    let content = [];
    let deliverPay = [];
    let remotePay = [];
    let {getFieldValue} = this.props.form;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      for (let i = 0; i < this.state.attrNo.length; i++) {
        content.push(getFieldValue(`content-${i}`))
      }
      this.state.attrNo.map((s, i) => {
        content.push(getFieldValue(`content-${i}`))
      });
      this.state.keys.map((s, i) => {
        name.push(getFieldValue(`name-${s}`));
        stock.push(getFieldValue(`stock-${s}`));
        purchasePrice.push(getFieldValue(`purchasePrice-${s}`));
        deliverPay.push(getFieldValue(`deliverPay-${s}`));
        remotePay.push(getFieldValue(`remotePay-${s}`))
      });
 /*     for (let j = 0; j < this.state.keys.length; j++) {
        name.push(getFieldValue(`name-${j}`));
        stock.push(getFieldValue(`stock-${j}`));
        purchasePrice.push(getFieldValue(`purchasePrice-${j}`));
        deliverPay.push(getFieldValue(`deliverPay-${j}`));
        remotePay.push(getFieldValue(`remotePay-${j}`))

      }*/
      console.log(name, stock,purchasePrice)
      let skuList = {name: name, stock: stock, purchasePrice: purchasePrice,deliverPay:deliverPay,remotePay:remotePay};
      let attrList = {content: content, attrNo: this.state.attrNo};
      this.props.dispatch({
        type: 'commodityadd/addProd',
        payload: {
          supplierNo: getLocalStorage(Storage.DID_LOGIN).brcNo,
          skuName: skuList.name,
          stock: skuList.stock,
          deliverPay:skuList.deliverPay,
          remotePay:skuList.remotePay,
          purchasePrice: skuList.purchasePrice,
          attrNo: attrList.attrNo,
          content: attrList.content,
          prodName: getFieldValue('prodName'),
          description: getFieldValue('description'),
          /*  imgUrl:getFieldValue('imgUrl')[0].originFileObj,*/
          brand: getFieldValue('brand'),
          invoiceType: getFieldValue('invoiceType'),
          kindNo: this.props.commodityadd.key,
        }
      });
    })


  }

  normFile = (e) => {


    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      e.fileList.splice(0, 1);
    }

    return e && e.fileList;

  }

  render() {
    if (this.props.commodityadd.isSubmit) {
      browserHistory.push('/commodity')
      this.props.commodityadd.isSubmit = false
    }
    const {getFieldDecorator} = this.props.form;
    const {commodityadd} = this.props;

    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    }

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 14,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const specifications = this.state.keys.map((s, i) => {

      return (
        <div key={s}>
          <FormItem
            {...formItemLayout}
            label="商品规格"
            hasFeedback
          >
            {getFieldDecorator(`name-${s}`, {
              rules: [{
                required: true, message: '商品规格不能为空',
              }],
            })(
              <div>
                <div>
                  <Input style={{width: 250}} maxlength="50"/>
                  <Icon onClick={() => this.plus(i)} style={{marginLeft: 20}} type="plus"/>
                  <Icon onClick={() => this.minus(i)} style={{marginLeft: 20}} type="minus"/>
                </div>
              </div>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="库存量"
            hasFeedback
          >
            {getFieldDecorator(`stock-${s}`, {
              rules: [{
                required: true, message: '库存不能为空',
              }],
            })(
              <Input style={{width: 250}} maxlength="50"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="价格"
            hasFeedback
          >
            {getFieldDecorator(`purchasePrice-${s}`, {
              rules: [{
                required: true, message: '价格不能为空',
              }],
            })(
              <Input style={{width: 250}} maxlength="50"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="运费"
            hasFeedback
          >
            {getFieldDecorator(`deliverPay-${s}`, {
              rules: [{

                required: true, message: '请输入运费',
              }],
            })(
              <Input style={{width: 250}} maxlength="50"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="偏远地区邮费"
            hasFeedback
          >
            {getFieldDecorator(`remotePay-${s}`, {
              rules: [{

                required: true, message: '请输入偏远地区运费',
              }],
            })(
              <Input style={{width: 250}} maxlength="50"/>
            )}
          </FormItem>
        </div>
      );
    });
    const increase = () => {
      if (commodityadd.increase) {
        if (this.state.attrNo.length) {
          this.state.attrNo = []
        }
        return commodityadd.increase.prodAttrList.map((s, i) => {
          this.state.attrNo.push(s.attrNo);
          return (
            <div key={i}>
              <FormItem
                {...formItemLayout}
                label={s.name}
                hasFeedback
              >
                {getFieldDecorator(`content-${i}`, {
                  rules: [{
                    required: true, message: '商品规格不能为空',
                  }],
                })(
                  <Input style={{width: 250}} maxlength="50"/>
                )}
              </FormItem>
            </div>
          );
        });
      }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="产品名称"
          hasFeedback
        >
          {getFieldDecorator('prodName', {
            rules: [{
              required: true, message: '请输入产品名称',
            }],
          })(
            <Input style={{width: 250}} maxlength="50" placeholder='请输入产品的名称'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="产品描述"
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: '请输入产品描述',
            }],
          })(
            <div>
              <Input style={{width: 250}} maxlength="50" placeholder='请输入产品的描述'/>
              <text style={{marginLeft: 20}}>产品描述最大可输入50位</text>
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品牌"
          hasFeedback
        >
          {getFieldDecorator('brand', {
            rules: [{

              required: true, message: '请输入品牌',
            }],
          })(
            <Input style={{width: 250}} maxlength="50"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商城图片"
        >
          {getFieldDecorator('imgUrl', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{
              required: true, message: '请上传图片',
            }],
          })(
            <Upload action="/api/dict/addDict" listType="picture">
              <Button>
                <Icon type="upload"/> 上传
              </Button>
            </Upload>
          )}
        </FormItem>
        {specifications}
        <FormItem
          {...formItemLayout}
          label="所属分类"
        >
          {getFieldDecorator('belong', {
            initialValue: commodityadd.belong,
            rules: [{
              required: true, message: '请选择所属分类'
            }],
          })(
            <Input style={{width: 250}} maxlength="50"/>
          )}
          <Button type="primary" style={{marginLeft: 10}} onClick={this.props.onClick}>确认</Button>
        </FormItem>

        <FormItem {...formItemLayout}
                  label="发票类型"
        >
          {getFieldDecorator('invoiceType', {
            rules: [{

              required: true, message: '请输入偏远地区运费',
            }],
          })(
            <RadioGroup onChange={onChange} value={this.state.value}>
              <Radio value={1}>电子发票</Radio>
              <Radio value={2}>纸质发票</Radio>
            </RadioGroup>
          )}

        </FormItem>
        {increase()}
        <FormItem wrapperCol={{span: 1, offset: 10}}>
          <Button onClick={() => this.submit()} type="primary">提交</Button>
        </FormItem>
      </Form>
    );
  }
}
const GoodsFormComponent = Form.create()(GoodsForm);


function CommodityAdd({commodityadd, dispatch}) {

  const handleCancel = () => {

    dispatch({type: 'commodityadd/visible_false'})
  };
  const onClick = () => {

    dispatch({type: 'commodityadd/visible_true'})
  }
  return (
    <QueueAnim>
      <div key='key1'>
        <h1>添加商品</h1>
        <hr/>
        <div className={styles.commodityForm}>
          <GoodsFormComponent commodityadd={commodityadd} dispatch={dispatch} onClick={onClick}/>
        </div>
        <Modal title="Modal"
               visible={commodityadd.visible}
               onCancel={handleCancel}
               footer={null}
        >
          <CommodityTree commodityadd={commodityadd} dispatch={dispatch}/>
        </Modal>
      </div>
    </QueueAnim>
  )
}
function mapStateToProps(state) {
  return {
    commodityadd: state.commodityadd,
  };
}
export default connect(mapStateToProps)(CommodityAdd)

