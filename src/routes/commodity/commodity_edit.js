import {Modal, Radio, Form, Input, Upload, Icon, Spin, Select, Row, Col, Checkbox, Button, TreeSelect} from 'antd';

import {browserHistory} from 'react-router'
import React from 'react'
import {connect} from 'dva'
import Storage from '../../utils/storage'
import {getLocalStorage} from '../../utils/helper'
import  CommodityTree  from './commodityedit_tree'
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
    keys: this.props.commodityedit.data.skuList,
    content: [],
    attrNo: [],
    skuNo: [],

  };

  plus() {
    uuid++;
    this.state.keys.push({skuNo: uuid++, flag: 1});
    this.state.flag = []
    this.setState({})
  }

  minus(i) {
    if (this.state.keys.length > 1) {
      this.state.keys.splice(i, 1);
      this.state.skuNo.splice(i, 1);
      this.state.flag.splice(i, 1);
      console.log(this.state.keys);
      this.state.flag = []
      this.setState({})
    }
  }

  submit() {
    console.log('Upload event:', this.state.flag);

    /* console.log(this.props.form.getFieldValue('imgUrl')[0].originFileObj);*/
    let name = [];
    let stock = [];
    let price = [];
    let content = [];
    let flag = [];
    let {getFieldValue} = this.props.form;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      let type = 2;
      for (let i = 0; i < this.state.attrNo.length; i++) {
        content.push(getFieldValue(`content-${i}`))
      }
      if (type === 1) {
        this.state.keys.map((s) => {
          name.push(getFieldValue(`name-${s.skuNo}`));
          stock.push(getFieldValue(`stock-${s.skuNo}`));
          price.push(getFieldValue(`wholesalePrice-${s.skuNo}`))
          flag.push(s.flag)
        });
      }
      if (type === 2) {
        this.state.keys.map((s) => {
          name.push(getFieldValue(`name-${s.skuNo}`));
          stock.push(getFieldValue(`stock-${s.skuNo}`));
          price.push(getFieldValue(`purchasePrice-${s.skuNo}`))
          flag.push(s.flag)
        });
      }
      if (type === 3) {
        this.state.keys.map((s) => {
          name.push(getFieldValue(`name-${s.skuNo}`));
          stock.push(getFieldValue(`stock-${s.skuNo}`));
          price.push(getFieldValue(`oldPrice-${s.skuNo}`))
          flag.push(s.flag)
        });
      }
      let skuList = {name: name, stock: stock, price: price};
      let attrList = {content: content, attrNo: this.state.attrNo};
      this.props.dispatch({
        type: 'commodityedit/editProd',
        payload: {
          supplierNo: getLocalStorage(Storage.DID_LOGIN).brcNo,
          type: 2,
          prodNo: this.props.commodityedit.record.prodNo,
          skuName: skuList.name,
          stock: skuList.stock,
          price: skuList.price,
          attrNo: attrList.attrNo,
          flag: flag,
          content: attrList.content,
          prodName: getFieldValue('prodName'),
          description: getFieldValue('description'),
          /*  imgUrl:getFieldValue('imgUrl')[0].originFileObj,*/
          brand: getFieldValue('brand'),
          invoiceType: getFieldValue('invoiceType'),
          kindNo: this.props.commodityedit.key,
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
    /*   let type=getLocalStorage(Storage.DID_LOGIN).type;*/
    let type = 2
    if (this.props.commodityedit.isSubmit) {
      browserHistory.push('/commodity');
      this.props.commodityedit.isSubmit = false
    }
    const {getFieldDecorator} = this.props.form;
    const {commodityedit} = this.props;

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

    const specifications1 = () => {
      return this.state.keys.map((s, i) => {
        this.state.skuNo.push(s.skuNo);
        return (
          <div key={s.skuNo}>
            <FormItem
              {...formItemLayout}
              label="商品规格"
              hasFeedback
            >
              {getFieldDecorator(`name-${s.skuNo}`, {
                initialValue: s.name,
                rules: [{
                  required: true, message: '商品规格不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存量"
              hasFeedback
            >
              {getFieldDecorator(`stock-${s.skuNo}`, {
                initialValue: s.stock,
                rules: [{
                  required: true, message: '库存不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="采购价格"
              hasFeedback
            >
              {getFieldDecorator(`purchasePrice-${s.skuNo}`, {
                initialValue: s.purchasePrice,
                rules: [{
                  required: true, message: '价格不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="批发价格"
              hasFeedback
            >
              {getFieldDecorator(`wholesalePrice-${s.skuNo}`, {
                initialValue: s.wholesalePrice,
                rules: [{
                  required: true, message: '价格不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="零售价格"
              hasFeedback
            >
              {getFieldDecorator(`oldPrice-${s.skuNo}`, {
                initialValue: s.oldPrice,
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
    }


    const specifications2 = () => {
      return this.state.keys.map((s, i) => {
        this.state.skuNo.push(s.skuNo);
        return (
          <div key={s.skuNo}>
            <FormItem
              {...formItemLayout}
              label="商品规格"
              hasFeedback
            >
              {getFieldDecorator(`name-${s.skuNo}`, {
                initialValue: s.name,
                rules: [{
                  required: true, message: '商品规格不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}

              <Icon onClick={() => this.plus(i)} style={{marginLeft: 20}} type="plus"/>
              <Icon onClick={() => this.minus(i)} style={{marginLeft: 20}} type="minus"/>

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存量"
              hasFeedback
            >
              {getFieldDecorator(`stock-${s.skuNo}`, {
                initialValue: s.stock,
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
              {getFieldDecorator(`purchasePrice-${s.skuNo}`, {
                initialValue: s.purchasePrice,
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
    }
    const specifications3 = () => {
      return this.state.keys.map((s, i) => {
        this.state.skuNo.push(s.skuNo);
        return (
          <div key={s.skuNo}>
            <FormItem
              {...formItemLayout}
              label="商品规格"
              hasFeedback
            >
              {getFieldDecorator(`name-${s.skuNo}`, {
                initialValue: s.name,
                rules: [{
                  required: true, message: '商品规格不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存量"
              hasFeedback
            >
              {getFieldDecorator(`stock-${s.skuNo}`, {
                initialValue: s.stock,
                rules: [{
                  required: true, message: '库存不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="批发价格"
              hasFeedback
            >
              {getFieldDecorator(`wholesalePrice-${s.skuNo}`, {
                initialValue: s.wholesalePrice,
                rules: [{
                  required: true, message: '价格不能为空',
                }],
              })(
                <Input style={{width: 250}} maxlength="50"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="零售价格"
              hasFeedback
            >
              {getFieldDecorator(`oldPrice-${s.skuNo}`, {
                initialValue: s.oldPrice,
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
    };
    const increase = () => {
      if (commodityedit.increase) {
        if (this.state.attrNo.length) {
          this.state.attrNo = []
        }
        return commodityedit.increase.prodAttrList.map((s, i) => {
          this.state.attrNo.push(s.attrNo);
          return (
            <div key={i}>
              <FormItem
                {...formItemLayout}
                label={s.name}
                hasFeedback
              >
                {getFieldDecorator(`content-${i}`, {
                  initialValue: s.content,
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
            initialValue: commodityedit.data.prodDetailEntity.prodName,
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
            initialValue: commodityedit.data.prodDetailEntity.description,
            rules: [{
              required: true, message: '请输入产品描述',
            }],
          })(
            <Input style={{width: 250}} maxlength="50" placeholder='请输入产品的描述'/>
          )}
          <text style={{marginLeft: 20}}>产品描述最大可输入50位</text>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="品牌"
          hasFeedback
        >
          {getFieldDecorator('brand', {
            initialValue: commodityedit.data.prodDetailEntity.brand,
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
        {type === 1 ? specifications1() : type === 2 ? specifications2() : specifications3()}
        <FormItem
          {...formItemLayout}
          label="所属分类"
        >
          {getFieldDecorator('belong', {
            initialValue: commodityedit.belong,
            rules: [{
              required: true, message: '请选择所属分类'
            }],
          })(
            <Input style={{width: 250}} maxlength="50"/>
          )}
          <Button type="primary" style={{marginLeft: 10}} onClick={this.props.onClick}>确认</Button>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="配送费状态"
        >
          {getFieldDecorator('gender', {
            rules: [{required: true, message: '请选择配送状态'}],
            onChange: this.handleSelectChange,
          })(
            <Select style={{width: 250}}>
              <Option value="1">male</Option>
              <Option value="2">female</Option>
              <Option value="3">female</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="运费"
          hasFeedback
        >
          {getFieldDecorator('freight', {
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
          {getFieldDecorator('postage', {
            rules: [{

              required: true, message: '请输入偏远地区运费',
            }],
          })(
            <Input style={{width: 250}} maxlength="50"/>
          )}
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


function CommodityEdit({commodityedit, dispatch}) {
  if (commodityedit.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }

  console.log(commodityedit, 1)
  const handleCancel = () => {

    dispatch({type: 'commodityedit/visible_false'})
  };
  const onClick = () => {

    dispatch({type: 'commodityedit/visible_true'})
  };
  return (
    <QueueAnim>
      <div key='key1'>
        <h1>添加商品</h1>
        <hr/>
        <div className={styles.commodityForm}>
          <GoodsFormComponent commodityedit={commodityedit} dispatch={dispatch} onClick={onClick}/>
        </div>
        <Modal title="Modal"
               visible={commodityedit.visible}
               onCancel={handleCancel}
               footer={null}
        >
          <CommodityTree commodityedit={commodityedit} dispatch={dispatch}/>
        </Modal>
      </div>
    </QueueAnim>
  )
}
function mapStateToProps(state) {
  return {
    commodityedit: state.commodityedit,
  };
}
export default connect(mapStateToProps)(CommodityEdit)

