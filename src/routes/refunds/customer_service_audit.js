/**
 *dujh
 */
import styles from './customer_service_audit.css'
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
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

function AfterSale({afterSale, dispatch}) {


  const onConsent=()=>{

    let  content = document.getElementById('content').value;
    console.log(content,11111)
    dispatch({type: 'afterSale/ServiceAudit', payload: {returnNo:afterSale.record.returnNo,isAgree:0,opinion:content}});
  };

  const onCancal=()=>{
    let  content = document.getElementById('content').value;
    dispatch({type: 'afterSale/ServiceAudit', payload: {returnNo:afterSale.record.returnNo,isAgree:1,opinion:content}});
  };

  if(afterSale.isSubmit){
    browserHistory.push('/after_sale')
    afterSale.isSubmit=false
  }

  return(
    <QueueAnim>
      <div key = "1">
        <div className={styles.customer_service_audit}>
          <Row>
            <Col>
              <h3>客服审核申请</h3>
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
              <h4>订单编号:</h4>
              <h4>{afterSale.record.orderNo}</h4>
            </Col>
          </Row>

          <Row>
            <Col className={styles.wwd}>
              <h4>订单状态:</h4>
              <h4>{afterSale.record.orderName}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>购买人:</h4>
              <h4>{afterSale.record.userName}</h4>
            </Col>
          </Row>

          <Row>
            <Col className={styles.wwd}>
              <h4>下单时间:</h4>
              <h4>{afterSale.record.orderDate}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>商品名称:</h4>
              <h4>{afterSale.record.prodName}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>规格:</h4>
              <h4>{afterSale.record.newProdStandard}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>原价:</h4>
              <h4>{afterSale.record.oldPrice}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>现价:</h4>
              <h4>{afterSale.record.nowPrice}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>数量:</h4>
              <h4>{afterSale.record.count}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>申请时间:</h4>
              <h4>{afterSale.record.returnDate}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>理由:</h4>
              <h4>{afterSale.record.returnReson}</h4>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwd}>
              <h4>售后:</h4>
              <h4>{afterSale.record.stateName}</h4>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
          <div>
            <div className={styles.textareaTitle}>
              <text>审核意见：</text>
            </div>
            <div className={styles.textareaDiv}>
              <textarea id='content' className={styles.textarea}></textarea>
            </div>
          </div>
          <Row>
            <hr className={styles.hr}></hr>
          </Row>
          <Row>
            <p>
              <Button className={styles.bt1} onClick={()=>onConsent()}>同&nbsp;&nbsp;&nbsp;&nbsp;意</Button>
              <Button className={styles.bt2} onClick={()=>onCancal()}>不同意</Button>
            </p>
          </Row>
        </div>
      </div>
    </QueueAnim>
  )
}
function mapStateToProps(state) {
  return {
    afterSale: state.afterSale,
  };
}
export default connect(mapStateToProps)(AfterSale)

