import React from 'react'

import {
  Row,
  Col,
  Breadcrumb,
} from 'antd'
import styles from './right_content.css'

class RightContent extends React.Component {
  constructor(props){
    super(props)
  }

  create(){
    return (
      <Breadcrumb style={{ padding: 10,backgroundColor:'#eee'}}>
        {this.props.children.props.routes.map((data)=>{
          return  <Breadcrumb.Item>{data.routes}</Breadcrumb.Item>
        })}
      </Breadcrumb>
    )
  }

  render() {
    if (this.props.children ){
      return (
        <div className={styles.root}>
          {this.create()}
          <div style={{backgroundColor:'#fff',padding:20}}>
            {this.props.children}
          </div>
        </div>
      );
    }else {
      return(
        <div  className={styles.div}>
          <div>
            <Row type="flex" justify="space-around">
              <Col span={2}><div  className={styles.square}/></Col>
              <Col span={2}><div  className={styles.square}/></Col>
              <Col span={2}><div  className={styles.square}/></Col>
              <Col span={2}><div  className={styles.square}/></Col>
              <Col span={2}><div  className={styles.square}/></Col>
              <Col span={2}><div  className={styles.square}/></Col>
            </Row>
          </div>
          <div style={{ marginTop: 20 }}>
            <Row type="flex" justify="space-around">
              <Col  xs={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 1 }}><div  className={styles.rectangle}/></Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}><div  className={styles.rectangle}/></Col>
              <Col xs={{ span: 6, offset: 1 }} lg={{ span: 7, offset: 1 }}><div  className={styles.rectangle}/></Col>
            </Row>
          </div>
          <div style={{ marginTop: 20 }}>
            <Row type="flex" justify="space-around">
              <Col span={10}>
                <div  className={styles.top}/>
                <div  className={styles.bottom_square}/>
              </Col>
              <Col span={10}>
               <div  className={styles.top}/>
                <div  className={styles.bottom_square}/>
              </Col>
            </Row>
          </div>
        </div>
      )
    }
  }
}

export default RightContent
