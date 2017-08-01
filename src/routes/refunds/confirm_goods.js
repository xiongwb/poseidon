/**
*dujh
*/
/*
import styles from './confirm_goods.css'
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
import logo from '../../assets/yay.jpg'
class ConfirmGoods extends React.Component {
  constructor(props) {
    super(props);
  }

  confirm(){
    browserHistory.push('/financial_audit')
  }


  render(){
    return(
      <QueueAnim>
      <div key = "1">
        <div className={styles.confirm_goods}>
          <Row>
            <Col>
              <h3>退款协议达成，等待买家退货</h3>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <img  className={styles.td_img} src={logo} style={{width: 250}} />
            </Col>
         {/!*   <table >
              <td >
                <img  className={styles.td_img} src={logo} style={{width: 250}} />
              </td>
              <td className={styles.td}>
              </td>
              <td className={styles.td_title}>
                <div className={styles.td_text}>
                <text >商品详情：</text><br/>
                <text >规格：</text><br/>
                </div>
              </td>
            </table >*!/}


          </Row>
          <Row>

            <Col>
              <text className={styles.td_text}>商品名称：</text>
            </Col>
            <Col>
              <text className={styles.td_text}>商品规格：</text>
            </Col>
          </Row>

          <hr></hr>
          <Row>
            <Col className={styles.button}>
              <Button onClick={this.confirm}>确认收货</Button>
            </Col>
          </Row>
        </div>
      </div>
      </QueueAnim>
    )
  }
}

export default connect()(ConfirmGoods)
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

function ConfirmGoods({afterSale, dispatch}) {




  const onCancal=()=>{
    console.log(afterSale.record.returnNo)
    dispatch({type: 'afterSale/ConfirmReceiveProd', payload:{returnNo:afterSale.record.returnNo}});
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
              <h2>退款协议达成，等待买家退货</h2>
            </Col>
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
          <Row>
            <p>
              <Button onClick={()=>onCancal()}>确认收货</Button>
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
export default connect(mapStateToProps)(ConfirmGoods)
