import styles from './order.css'
import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim';
import {
  Row,
  Col,
  Checkbox,
} from 'antd'
const title = ['订单编号：','商品信息：','订单状态：','购货人：','下单时间：','原价：','现价：','优惠价：','数量：','总金额：','快递公司：','快递单号：','收货人：','收货地址：','收货人联系电话：','邮编：','收货状态：'];
const data = ['20170908','哈哈牛奶','未付款','哈哈哈','2017-09-28','34','182','12','3','234','哈哈快递','00281283771','猛男一号','98号楼','14256789876','3000','未收货'];
class OrderMessage extends React.Component {
  constructor(props){
    super(props);
  }
  rowCell(message,index) {
    const content = data[index];
    console.log(content);
    return(
      <div className={styles.message}>
        <Row>
          <Col span={4}>
            <div className={styles.messageLeft}>
              <text style={{fontSize:13}}>{message}</text>
            </div>
          </Col>
          <Col span={20}>
            {typeof(content) == "boolean" ? <Checkbox defaultChecked={content} disabled style={{marginLeft:20}} /> : <text style={{fontSize:13,marginLeft:20}}>{content}</text>}
          </Col>
        </Row>
      </div>
    )
  }
  render() {
    return (
      <QueueAnim>
        <div key = "1">
        <h1>订单详情</h1>
        <hr/>
        <div>
          {title.map((s,i)=>this.rowCell(s,i))}
        </div>
      </div>
      </QueueAnim>
    );
  }
}
export default connect()(OrderMessage)
