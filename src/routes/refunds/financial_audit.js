/**
*dujh
*/
import styles from './financial_audit.css'
import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
} from 'antd'
import { browserHistory,History } from 'react-router'
import QueueAnim from 'rc-queue-anim';

class FinancialAudit extends React.Component {
  constructor(props) {
    super(props);
  }

  confirm(){
    browserHistory.push('/after_sale')
  }
  onCancal(){
    browserHistory.push('/after_sale')
  }

  render(){
    return(
      <QueueAnim>
      <div key = "1">
        <div className={styles.financial_audit}>
          <Row>
            <Col>
              <h3>财务审核申请</h3>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
          <Row>
            <h4>时间提醒</h4>
            <h4>
              <Icon type={'clock-circle-o'}></Icon>
            </h4>
          </Row>
          <Row>
            <hr></hr>
          </Row>
        </div>
        <div className={styles.p}>
          <Row>
            <Col className={styles.wwd}>
              <h4>申请编号:</h4>
              <h4>291829291</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>订单编号:</h4>
              <h4>291829291</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>商品名称:</h4>
              <h4>阿迪王大拖鞋</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>购买时间:</h4>
              <h4>今儿个早上</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>申请时间:</h4>
              <h4>今儿个晚上</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>退货理由:</h4>
              <h4>破鞋不跟脚</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>订单状态:</h4>
              <h4>扔海河里喂鱼了</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>退款金额:</h4>
              <h4>30.20</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>订单运费:</h4>
              <h4>80.50</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>退款说明:</h4>
              <h4>看你太可怜了，退你150元</h4>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>审核意见:</h4>
              <h4>
                <Input type="textarea" rows={4} />
              </h4>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
          <Row>
            <p>
              <Button onClick={this.confirm}>同&nbsp;&nbsp;&nbsp;&nbsp;意</Button>
              <Button onClick={this.onCancal}>不同意</Button>
            </p>
          </Row>
        </div>
      </div>
      </QueueAnim>
    )
  }
}

export default connect()(FinancialAudit)
