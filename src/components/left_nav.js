import React from 'react'
import { Link } from 'react-router'

import {
  Menu,
  Icon,
} from 'antd'
const SubMenu = Menu.SubMenu;

class LeftNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: '',
      openKeys: ['sub1'],
    }
  }

  handleClick(e) {
    this.setState({ current: e.key })
  }

  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey)
    }
    this.setState({ openKeys: nextOpenKeys })
  }

  getAncestorKeys(key) {
    const map = {

    };
    return map[key] || [];
  }

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange.bind(this)}
        onClick={this.handleClick.bind(this)}
      >
       {/* <SubMenu key="sub10" title={<span><Icon type="credit-card"/>首页</span>}>
          <Menu.Item key="92"><Link to="/homepage">设计APP商城首页</Link></Menu.Item>
        </SubMenu>*/}
      {/*  <SubMenu key="sub1" title={<span><Icon type="credit-card"/>银行管理</span>}>
          <Menu.Item key="11"><Link to="/bank">银行维护</Link></Menu.Item>
          <Menu.Item key="13"><Link to="/store">商户管理</Link></Menu.Item>
        </SubMenu>*/}
      {/*  <SubMenu key="sub0" title={<span><Icon type="appstore-o" />某某</span>}>
          <Menu.Item key="30"><Link to="/classification">分类维护</Link></Menu.Item>
          <Menu.Item key="30"><Link to="/classificationmanage">分类管理</Link></Menu.Item>
        </SubMenu>*/}
        <SubMenu key="sub2" title={<span><Icon type="appstore-o" />分类管理</span>}>
          <Menu.Item key="21"><Link to="/classification">分类维护</Link></Menu.Item>
          <Menu.Item key="22"><Link to="/classificationmanage">分类管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="barcode" />商品管理</span>}>
          <Menu.Item key="31"><Link to="/commodity">商品维护</Link></Menu.Item>
          <Menu.Item key="32"><Link to="/inventory">库存管理</Link></Menu.Item>
          <Menu.Item key="33"><Link to="/propertymanagement">分类属性管理</Link></Menu.Item>
          <Menu.Item key="34"><Link to="/classifiedgoods">分类商品查询</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="file-text" />订单管理</span>}>
          <Menu.Item key="41"><Link to="/order">订单维护</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title={<span><Icon type="paper-clip" />售后管理</span>}>
          <Menu.Item key="51"><Link to="/after_sale">退货管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub6" title={<span><Icon type="user" />用户管理</span>}>
          <Menu.Item key="61"><Link to="/userList">用户管理</Link></Menu.Item>
          <Menu.Item key="62"><Link to="/roleList">角色管理</Link></Menu.Item>
          <Menu.Item key="63"><Link to="/privilege">权限管理</Link></Menu.Item>
          <Menu.Item key="64"><Link to="/menu">菜单管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub7" title={<span><Icon type="smile-o" />评论管理</span>}>
          <Menu.Item key="71"><Link to="/comment">评论维护</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub8" title={<span><Icon type="setting" />系统设置</span>}>
          <Menu.Item key="81"><Link to="/system">字典维护</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub9" title={<span><Icon type="notification" />促销管理</span>}>
          <Menu.Item key="91"><Link to="/promotion">促销维护</Link></Menu.Item>
        </SubMenu>

      </Menu>
    );
  }
}

export default LeftNav
