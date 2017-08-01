import styles from './bank.css'
import React from 'react'
import { connect } from 'dva'

import {
  Row,
  Col,
  Checkbox,
} from 'antd'
import QueueAnim from 'rc-queue-anim';


const title = ['商户类型：','商户证件类型：','商户证件号码：','商户名称：','店铺名称：','店铺类型：','店铺详细地址：','联系人电话：','门店电话：','营业时间：','是否有分店：','是否可刷卡：','是否有Wifi：','是否能吸烟：','是否有包间：','是否有表演：','是否能停车：','是否能订座：','收藏数：'];
const data = ['企业商户','营业执照','66883747-4','天津俏江南有限公司','俏江南','餐饮','河西区友谊北路1号（马场道口）','18284839822','022-33241233','11:00-12:10',false,false,true,true,false,true,false,true,'89'];

class StoreMessage extends React.Component {
  constructor(props){
    super(props);
  }

  rowCell(message,index) {
    const content = data[index];
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
        <div key="key1">
          <h1>商户详情</h1>
          <hr/>
          <div key="key2">
            {title.map((s,i)=>this.rowCell(s,i))}
          </div>
        </div>
      </QueueAnim>
    );
  }
}

export default connect()(StoreMessage)
