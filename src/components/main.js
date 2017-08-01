import React from 'react'
import { Layout,Badge,Icon,Collapse  } from 'antd';
import { delegateLocalStorage } from '../utils/helper'
import { browserHistory } from 'react-router'
import Storage from '../utils/storage'
import mail from '../assets/mail.png'
import remind from '../assets/remind.png'
import set_up from '../assets/set_up.png'
import close from '../assets/close.png'
import logo from '../assets/card.png'
import lesaas from '../assets/lesaas.png'

import { getLocalStorage } from '../utils/helper'
const Panel = Collapse.Panel;
const { Content, Footer } = Layout;

import styles from './main.css'
import LeftNav from './left_nav'
import RightContent from './right_content'

class Main extends React.Component {

  render() {

    return (
      <div>
        <div className={styles.topDiv}>
          <div style={{backgroundColor:'#474747'}} />
              <img src={lesaas} className={styles.logo_top} />
              <text className={styles.language}>English<Icon  className={styles.icon_language} type="caret-down"/></text>
              <div className={styles.logo_img}>
                <Badge  dot={true} style={{ marginTop: 3 }}>
                  <img src={remind}  className={styles.remind}/>
                </Badge>
                <Badge  dot={true} style={{ marginTop: 3 }}>
                  <img src={mail}  className={styles.mail}/>
                </Badge>
                <Badge >
                  <img src={set_up}  className={styles.set_up}  />
                </Badge>
                <Badge >
                  <img src={close}  className={styles.close} onClick={()=>{delegateLocalStorage(Storage.DID_LOGIN);browserHistory.push('/')}} />
                </Badge>
              </div>

        </div>
        <div>
          <div className={styles.leftDiv}>
                <div  style={{ backgroundImage: `url(${logo})`,height:"78"} }>
                  <div  className={styles.circle}/>
                </div>
              <div style={{backgroundColor:'#474747'}}>
                <text className={styles.text}>
                  {getLocalStorage(Storage.DID_LOGIN).empName}
                </text>
                <text className={styles.role}>
                 管理员
                </text>
              </div>


            <LeftNav />
          </div>
          <div className={styles.rightDiv}>
            <div style={{backgroundColor:'#fff',height:40, boxShadow: '0px 3px 0px 0px  #d9d9d9 '}}/>
            <Content style={{ minHeight: 450, backgroundColor:'#fff',margin:'10px 20px'}}>
              <RightContent>{this.props.children}</RightContent>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Website background Management System ©2017 Created by Leassa
            </Footer>
          </div>
        </div>
      </div>
    );
  }

  // render() {
  //   return(
  //     <Layout>
  //       <Header style={{ background: '#64f8ff'}}>
  //       </Header>
  //       <Layout>
  //         <Sider width={200} style={{ background: '#fff' }}>
  //           <LeftNav />
  //         </Sider>
  //         <Layout style={{ padding: '0 0px 0' }}>
  //           <div style={{background: '#fff',height:50}} />
  //           <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
  //             <RightContent>{this.props.children}</RightContent>
  //           </Content>
  //         </Layout>
  //       </Layout>
  //     </Layout>
  //
  //   )
  // }


}

export default Main
