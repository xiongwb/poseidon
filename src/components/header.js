import React from 'react'
import { Link } from 'react-router'
import { delegateLocalStorage } from '../utils/helper'
import {
  Row,
  Col,
  Menu,
} from 'antd'

import { browserHistory } from 'react-router'
import styles from './header.css'
import Storage from '../utils/storage'

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: ''
    }
  }

  handleClick(e) {
    this.setState({
      current: e.key
    })
  }

  render() {
    return (
      <div className={styles.header}>
      </div>
    )
  }
}

// <Row>
//   <Col span={4}>
//   </Col>
//   <Col span={20}>
//     <Menu
//       className={styles.menu}
//       onClick={this.handleClick.bind(this)}
//       selectedKeys={[this.state.current]}
//       mode="horizontal"
//     >
//       <Menu.Item key="1">
//         <Link>设置</Link>
//       </Menu.Item>
//       <Menu.Item key="2">
//         <Link>通知</Link>
//       </Menu.Item>
//       <Menu.Item key="3">
//         <Link className={styles.signOut} onClick={()=>{delegateLocalStorage(Storage.DID_LOGIN);browserHistory.push('/')}}>退出</Link>
//       </Menu.Item>
//     </Menu>
//
//   </Col>
// </Row>


export default Header
