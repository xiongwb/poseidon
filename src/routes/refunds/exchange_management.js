/**
*dujh
*/
/*import styles from './exchange_management.css'
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

class Exchange extends React.Component {
  constructor(props) {
    super(props);
  }

  onConsent(){
    browserHistory.push('/financial_audit')
  }

  onCancal(){
    browserHistory.push('/after_sale')
  }

  render(){
    return(
      <QueueAnim>
      <div key = "1">
        <div className={styles.customer_service_audit}>
          <Row>
            <Col>
              <h3>客服审核换货申请</h3>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
        </div>
        <div>
          <Row>
            <Col className={styles.ww}>
              <h3>换货申请</h3>
            </Col>
            <div className={styles.xx}>
            </div>
            <Col className={styles.dd}>
               <h3>新货品</h3>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
        </div>
        <div>
          <div className={styles.p}>

            <Row>
              <Col className={styles.wwd}>
                <h4>订单编号:</h4>
                <h4>{afterSale.record.orderNo}</h4>
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
                <h4>购买时间:</h4>
                <h4>{afterSale.record.orderDate}</h4>
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
                <h4>商品口味:</h4>
                <h4>{afterSale.record.newProdStandard}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>商品价格:</h4>
                <h4>{afterSale.record.nowPrice}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>退货理由:</h4>
                <h4>{afterSale.record.returnReson}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>订单状态:</h4>
                <h4>{afterSale.record.orderName}</h4>
              </Col>
            </Row>
          </div>
          <div className={styles.s}>
            <Row>
              <Col className={styles.wwd}>
                <h4>商品名称:</h4>
                <h4>阿迪王海陆至尊大裤衩</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>商品口味:</h4>
                <h4>抠脚大汉味</h4>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.f}>
          <Row>
            <Col>
              <hr></hr>
            </Col>
          </Row>
          <Row>
            <Col className={styles.wwc}>
              <h4>审核意见:</h4>
              <h4>
                <Input className={styles.inp} type="textarea" rows={4} />
              </h4>
            </Col>
          </Row>
          <Row>
            <hr className={styles.hr}></hr>
          </Row>
          <Row>
            <p>
              <Button className={styles.bt1} onClick={this.onConsent}>同&nbsp;&nbsp;&nbsp;&nbsp;意</Button>
              <Button className={styles.bt2} onClick={this.onCancal}>不同意</Button>
            </p>
          </Row>
        </div>
      </div>
      </QueueAnim>
    )
  }
}

export default connect()(Exchange)*/
/**
 *dujh
 */
import styles from './exchange_management.css'
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

function ExchangeManagement({afterSale, dispatch}) {


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
              <h3>客服审核换货申请</h3>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
        </div>
        <div>
          <Row>
            <Col className={styles.ww}>
              <h3>换货申请</h3>
            </Col>
            <div className={styles.xx}>
            </div>
            <Col className={styles.dd}>
              <h3>新货品</h3>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
        </div>
        <div>
          <div className={styles.p}>

            <Row>
              <Col className={styles.wwd}>
                <h4>订单编号:</h4>
                <h4>{afterSale.record.orderNo}</h4>
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
                <h4>购买时间:</h4>
                <h4>{afterSale.record.orderDate}</h4>
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
                <h4>商品口味:</h4>
                <h4>{afterSale.record.newProdStandard}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>商品价格:</h4>
                <h4>{afterSale.record.nowPrice}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>退货理由:</h4>
                <h4>{afterSale.record.returnReson}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>订单状态:</h4>
                <h4>{afterSale.record.orderName}</h4>
              </Col>
            </Row>
          </div>
          <div className={styles.s}>
            <Row>
              <Col className={styles.wwd}>
                <h4>商品名称:</h4>
                <h4>{afterSale.record.prodName}</h4>
              </Col>
            </Row>
            <Row>
              <Col className={styles.wwd}>
                <h4>商品规格:</h4>
                <h4>{afterSale.record.newProdStandard}</h4>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.f}>
          <Row>
            <Col>
              <hr></hr>
            </Col>
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
export default connect(mapStateToProps)(ExchangeManagement)

