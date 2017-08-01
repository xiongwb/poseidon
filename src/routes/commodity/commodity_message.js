import styles from './commodity.css'
import React from 'react'
import {connect} from 'dva'
import logo from '../../assets/yay.jpg'
import PictureUpload from './picture_upload'
import QueueAnim from 'rc-queue-anim';
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Icon,
  Form,
  Spin
} from 'antd'


var type=1;
function CommodityMessage({commodityMessage, dispatch}) {
  console.log(commodityMessage,188888);
  if (commodityMessage.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }

  const name = ['产品名称:', '产品描述:', '品牌:', '商品图片:',
    '所属分类:', '发票类型:'];
  const data = [commodityMessage.data.prodDetailEntity.prodName,commodityMessage.data.prodDetailEntity.description,
    commodityMessage.data.prodDetailEntity.brand,commodityMessage.data.prodDetailEntity.imgUrl,commodityMessage.data.prodDetailEntity.kindNo,
    commodityMessage.data.prodDetailEntity.invoiceType
  ]
  if(type===1) {
    var skunameList = [{title: '商品规格:', key: 'name'}, {title: '库存量:', key: 'stock'},
      {title: '采购价格:', key: 'oldPrice'}, {title: '零售价格:', key: 'purchasePrice'},
      {title: '批发价格:', key: 'wholesalePrice'}, {title: '运费:', key: 'deliverPay'},
      {title: '偏远地区邮费:', key: 'remotePay'},
    ];
  }
  if(type===2) {
    var skunameList = [{title: '商品规格:', key: 'name'}, {title: '库存量:', key: 'stock'},
      {title: '采购价格:', key: 'oldPrice'}, {title: '运费:', key: 'deliverPay'}, {title: '偏远地区邮费:', key: 'remotePay'},
    ];
  }

  if(type===3) {
    var skunameList = [{title: '商品规格:', key: 'name'}, {title: '库存量:', key: 'stock'},
      {title: '采购价格:', key: 'oldPrice'}, {title: '零售价格:', key: 'purchasePrice'},
      {title: '运费:', key: 'deliverPay'},
      {title: '偏远地区邮费:', key: 'remotePay'},
    ];
  }

  // 初始化数据

const rowCell=(message, index)=>{
    const content = data[index];
    return (
      <div className={styles.message}>
        <Row>
          <Col span={4}>
            <div className={styles.messageLeft}>
              <text style={{fontSize: 13}}>{message}</text>
            </div>
          </Col>
          <Col span={20}>
            {content == "图片" ? <img src={logo} style={{height: 100}}/> :
              <text style={{fontSize: 13, marginLeft: 20}}>{content}</text>}
          </Col>
        </Row>
      </div>
    )
  }
  const skuList_name=(sku,index,message)=>{
    const content = message[sku.key];
    return (
      <div className={styles.message}>
        <Row>
          <Col span={4}>
            <div className={styles.messageLeft}>
              <text style={{fontSize: 13}}>{sku.title}</text>
            </div>
          </Col>
          <Col span={20}>
            <text style={{fontSize: 13, marginLeft: 20}}>{content}</text>
          </Col>
        </Row>
      </div>
    )
  };
  const attr=(attr,index)=>{
    return (
      <div className={styles.message}>
        <Row>
          <Col span={4}>
            <div className={styles.messageLeft}>
              <text style={{fontSize: 13}}>{attr.name}:</text>
            </div>
          </Col>
          <Col span={20}>
            <text style={{fontSize: 13, marginLeft: 20}}>{attr.content}</text>
          </Col>
        </Row>
      </div>
    )
  };
  const skuname=(message, index)=>{
    return skunameList.map((s, i) => skuList_name(s, i,message))
  }

    return (
      <QueueAnim>
        <div key='key1'>
          <h1>商户详情</h1>
          <hr/>
          <div>
            {name.map((s, i) => rowCell(s, i))}
          </div>
          <div>
            {commodityMessage.data.skuList.map((s, i) => skuname(s, i))}
          </div>
          <div>
            {commodityMessage.data.attrList.map((s, i) => attr(s, i))}
          </div>
       {/*   <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={{pageSize: 50, total: this.state.dataSource.length}}
            scroll={{y: 300}}
          />*/}
        </div>
      </QueueAnim>
    );

}
function mapStateToProps(state) {
  return {
    commodityMessage: state.commodityMessage,
  };
}

export default connect(mapStateToProps)(CommodityMessage)
