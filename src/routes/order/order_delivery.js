/**
 * Created by zhangle on 2017/3/10.
 */
import styles from './order.css'
import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim';
import {
  Row,
  Col,
  Checkbox,
  Select,
  Input,
  Button,
} from 'antd'
const Option = Select.Option
const title = ['订单编号：','商品信息：','订单状态：','购货人：','下单时间：','原价：','现价：','优惠价：','数量：'];
const data = ['20170908','哈哈牛奶','未付款','哈哈哈','2017-09-28','34','182','12','3'];
class OrderDelivery extends React.Component {
  constructor(props){
    super(props);
  }
  handleChange(value) {
    console.log(`selected ${value}`);
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
          <div className={styles.order}>
        <h1>订单发货</h1>
        <hr/>
        <Col className={styles.fahuo}>
          <h3>订单详情</h3>
        </Col>
        <hr/>
        <div className={styles.fahuo}>
          {title.map((s,i)=>this.rowCell(s,i))}
        </div>
        <hr/>
        <Col className={styles.fahuo}>
          <h3>物流信息</h3>
        </Col>
        <hr/>
        <div className={styles.message}>
          <Row>
            <Col span={4}>
              <div className={styles.messageLeft1}>
                <text style={{fontSize:13}}>快递公司:</text>
              </div>
            </Col>
            <Col   span={4}>
              <Select defaultValue="顺丰" onChange={this.handleChange} className={styles.left}>
                <Option value="菜鸟">菜鸟</Option>
                <Option value="邮政">邮政</Option>
                <Option value="申通">申通</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div className={styles.message}>
          <Row>
            <Col span={4}>
              <div className={styles.messageLeft1}>
                <text style={{fontSize:13}}>快递公司:</text>
              </div>
            </Col>
            <Col   span={4}>
              <Input className={styles.left}/>
            </Col>
          </Row>
        </div>
        <div>
          <Button className={styles.hh}>发货</Button>
        </div>

      </div>
        </div>
      </QueueAnim>
    );
  }
}
export default connect()(OrderDelivery)
