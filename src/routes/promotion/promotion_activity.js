import styles from './promotion.css'
import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim';

import {
  Row,
  Col,
  Checkbox,
  Input,
  Button,
} from 'antd'
import { browserHistory } from 'react-router'

const title = ['优惠活动名称：','优惠开始时间：','优惠结束时间：','享受优惠会员等级：','优惠范围：','优惠方式：','折扣：'];
const data = ['商品大放价','2017-09-23','2018-09-78','注册用户','牛奶，蛋糕','打折','1折'];

class PromotionActivity extends React.Component {
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
  onbuan(){
    browserHistory.push('/promotion')
  }
  onhush(){
    return(
      <div style={{marginTop: 100}} >
        <div className={styles.message}>
          <Row>
            <Col span={4}>
              <div className={styles.messageLeft}>
                <text style={{fontSize:13}}>审核意见：</text>
              </div>
            </Col>
            <Col span={20}>
              <Input  type="textarea" autosize={{ minRows: 4, maxRows: 3 }}style={{ width: 250 ,marginLeft:20}}/>
            </Col>
          </Row>
        </div>
        <div style={{marginLeft:200}}>
          <Row>
            <Col className={styles.messageLeft2} onClick={this.onbuan}>
                <Button style={{width:100}}>通过</Button>
            </Col>
            <Col className={styles.messageLeft2} onClick={this.onbuan}>
              <Button style={{width:100}}>不通过</Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  render() {
    return (
    <QueueAnim>
      <div key = "1">
        <h1>审核促销活动</h1>
        <hr/>
        <div>
          {title.map((s,i)=>this.rowCell(s,i))}
        </div>
        <div>
           {this.onhush()}
        </div>
      </div>
    </QueueAnim>

    );
  }
}

export default connect()(PromotionActivity)
