import styles from './bank.css'
import React from 'react'
import { connect } from 'dva'
import {
  Row,
  Col,
} from 'antd'
import QueueAnim from 'rc-queue-anim';

const title = ['机构号：','机构名称：','机构简称：','机构地址：','电话号码：','机构类别：','机构级别：','机构类型：'];
const data = ['002','天津分行','天津分行','天津市南开区复康路221','0101-2281338','管理部门','支行','管理机构'];

class BankMessage extends React.Component {
  constructor(props){
    super(props);
  }

  rowCell(message,index) {
    const content = title[index];
    return(
      <div className={styles.message}>
        <Row>
          <Col span={4}>
            <div className={styles.messageLeft}>
              <text style={{fontSize:13}}>{content}</text>
            </div>
          </Col>
          <Col span={20}>
            <text style={{fontSize:13,marginLeft:20}}>{message}</text>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <QueueAnim>
        <div key="key1">
          <h1>机构详情</h1>
          <hr/>
          <div>
            {data.map((s,i)=>this.rowCell(s,i))}
          </div>
        </div>
      </QueueAnim>
    );
  }
}

export default connect()(BankMessage)
