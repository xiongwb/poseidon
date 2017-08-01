import React from 'react'
import { Router, Route } from 'dva/router'
import Storage from './utils/storage'
import {getLocalStorage} from './utils/helper'

import Dashboard from './routes/dashboard'
import Login from './routes/login/login'
import Bank from './routes/bank/bank'
import BankMessage from './routes/bank/bank_message'
import UserList from './routes/user/userList'
import UserAdd from './routes/user/userAdd'
import UserEdit from './routes/user/userEdit'
import RoleList from './routes/user/roleList'
import RoleAdd from './routes/user/roleAdd'
import RoleEdit from './routes/user/roleEdit'
import Privilege from './routes/user/privilege'
import Menu from './routes/user/menu'

import Commodity from './routes/commodity/commodity'
import CommodityMessage from './routes/commodity/commodity_message'
import CommodityAdd from './routes/commodity/commodity_add'
import CommodityEdit from './routes/commodity/commodity_edit'
import Inventory from './routes/commodity/inventory'
import InventoryAdd from './routes/commodity/inventory_add'
import PropertyManagement from './routes/commodity/property_management'

import ClassifiedGoods from './routes/commodity/classified_goods'

import System from './routes/system/system'

import Comment from './routes/comment/comment'
import CommentReply from './routes/comment/comment_reply'
import Store from './routes/bank/store'
import HomePage from './routes/homepage/homepage'
import StoreMessage from './routes/bank/store_message'
import AddStore from './routes/bank/add_store'
import AfterSale from './routes/refunds/after_sale'
import CustomerAudit from './routes/refunds/customer_service_audit'
import FinancialAudit from './routes/refunds/financial_audit'
import ConfirmGoods from './routes/refunds/confirm_goods'
import Exchange from './routes/refunds/exchange_management'

import Classification from './routes/classification/classification'
import ClassificationAdd from './routes/classification/classification_add'
import ClassificationDetails from './routes/classification/add_details'
import ClassificationModify from './routes/classification/classification_modify'
import ClassificationManage from './routes/classification/classification_manage'
import Order from './routes/order/order'
import OrderMessage from './routes/order/order_message'
import OrderDelivery from './routes/order/order_delivery'

import SystemDetail from './routes/system/system_detail'
import AddDic from './routes/system/add_dic'
import EditDic from './routes/system/edit_dic'
import EditDetail from './routes/system/edit_detail'
import AddDetail from './routes/system/add_detail'

import Promotion from './routes/promotion/promotion'
import PromotionRecommend from './routes/promotion/promotion_recommend'
import PromotionOpen from './routes/promotion/promotion_open'
import PromotionAdd from './routes/promotion/promotion_add'
import PromotionActivity from './routes/promotion/promotion_activity'
import PromotionCommodity from './routes/promotion/promotion_commodity'
import PromotionEdit from './routes/promotion/promotion_edit'
function RouterConfig({ history }) {

  const checkStatus = (nextState, replace,next) =>{
    var tokenInfo = getLocalStorage(Storage.DID_LOGIN);
    if(tokenInfo) {
      next()
    }else{
      replace("/");
      next();
    }
  }

  return (
    <Router history={history}>
      <Route path="/"                             component={Login}/>
      <Route path="/dashboard"                    component={Dashboard}               routes='主页'      onEnter={checkStatus}>
        <Route path="/bank"                       component={Bank}                    routes='银行'      onEnter={checkStatus}/>
        <Route path="/bank/message"               component={BankMessage}             routes='银行详情'   onEnter={checkStatus}/>
        <Route path="/commodity"                  component={Commodity}               routes='商品'      onEnter={checkStatus}/>
        <Route path="/commodity/message"          component={CommodityMessage}        routes='商品详情'   onEnter={checkStatus}/>
        <Route path="/commodity/add"              component={CommodityAdd}            routes='添加商户'   onEnter={checkStatus}/>
        <Route path="/commodity/edit"             component={CommodityEdit}           routes='修改商户'   onEnter={checkStatus}/>
        <Route path="/Inventory"                  component={Inventory}               routes='库存'       onEnter={checkStatus}/>
        <Route path="/Inventory/add"              component={InventoryAdd}            routes='添加库存'   onEnter={checkStatus}/>
        <Route path="/propertymanagement"         component={PropertyManagement}      routes='分类属性'   onEnter={checkStatus}/>
        <Route path="/classifiedgoods"            component={ClassifiedGoods}         routes='分类商品'   onEnter={checkStatus}/>
        <Route path="/system"                     component={System}                  routes='系统设置'   onEnter={checkStatus}/>
        <Route path="/system/detail"              component={SystemDetail}            routes='字典详情'   onEnter={checkStatus}/>
        <Route path="/system/add_dic"             component={AddDic}                  routes='添加字典'   onEnter={checkStatus}/>
        <Route path="/system/edit_dic"            component={EditDic}                 routes='编辑字典'   onEnter={checkStatus}/>
        <Route path="/system/detail/add_detail"   component={AddDetail}               routes='添加字典'   onEnter={checkStatus}/>
        <Route path="/system/detail/edit_detail"  component={EditDetail}              routes='编辑字典'   onEnter={checkStatus}/>
        <Route path="/comment"                    component={Comment}                 routes='评论'       onEnter={checkStatus}/>
        <Route path="/comment/reply"              component={CommentReply}            routes='回复'       onEnter={checkStatus}/>
        <Route path="/store"                      component={Store}                   routes='商户'       onEnter={checkStatus}/>
        <Route path="/store/message"              component={StoreMessage}            routes='商户详情'   onEnter={checkStatus}/>
        <Route path="/store/add"                  component={AddStore}                routes='添加商户'   onEnter={checkStatus}/>
        <Route path="/classification"             component={Classification}          routes='分类'      onEnter={checkStatus}/>
        <Route path="/classification/details"     component={ClassificationDetails}   routes='分类详情'   onEnter={checkStatus}/>
        <Route path="/classification/add"         component={ClassificationAdd}       routes='添加分类'   onEnter={checkStatus}/>
        <Route path="/classification/modify"      component={ClassificationModify}    routes='修改分类'   onEnter={checkStatus}/>
        <Route path="/classificationmanage"       component={ClassificationManage}    routes='分类管理'   onEnter={checkStatus}/>
        <Route path="/order"                      component={Order}                   routes='订单'      onEnter={checkStatus}/>
        <Route path="/order/message"              component={OrderMessage}            routes='订单详情'   onEnter={checkStatus}/>
        <Route path="/after_sale"                 component={AfterSale}               routes='售后'      onEnter={checkStatus}/>
        <Route path="/customer_service_audit"     component={CustomerAudit}           routes='审核'      onEnter={checkStatus}/>
        <Route path="/financial_audit"            component={FinancialAudit}          routes='退款审核'   onEnter={checkStatus}/>
        <Route path="/confirm_goods"              component={ConfirmGoods}            routes='退货'      onEnter={checkStatus}/>
        <Route path="/exchange_management"        component={Exchange}                routes='换货'      onEnter={checkStatus}/>
        <Route path="/order/delivery"             component={OrderDelivery}           routes='订单物流'  onEnter={checkStatus}/>
        <Route path="/bank/message"               component={BankMessage}             routes='机构详情'  onEnter={checkStatus}/>
        <Route path="/userList"                   component={UserList}                routes='用户列表'  onEnter={checkStatus}/>
        <Route path="/userAdd"                    component={UserAdd}                 routes='添加用户'  onEnter={checkStatus}/>
        <Route path="/userEdit"                   component={UserEdit}                routes='编辑用户'  onEnter={checkStatus}/>
        <Route path="/roleList"                   component={RoleList}                routes='角色列表'  onEnter={checkStatus}/>
        <Route path="/roleAdd"                    component={RoleAdd}                 routes='添加角色'  onEnter={checkStatus}/>
        <Route path="/roleEdit"                   component={RoleEdit}                routes='编辑角色'  onEnter={checkStatus}/>
        <Route path="/privilege"                  component={Privilege}               routes='权限'     onEnter={checkStatus}/>
        <Route path="/menu"                       component={Menu}                    routes='菜单'     onEnter={checkStatus}/>
        <Route path="/promotion"                  component={Promotion}               routes='促销活动'  onEnter={checkStatus}/>
        <Route path="/promotion/add"              component={PromotionAdd}            routes='添加活动'  onEnter={checkStatus}/>
        <Route path="/promotion/activity"         component={PromotionActivity}       routes='审核活动'  onEnter={checkStatus}/>
        <Route path="/promotion/commodity"        component={PromotionCommodity}      routes='分类商品查询' onEnter={checkStatus}/>
        <Route path="/promotion/recommend"        component={PromotionRecommend}      routes='推荐促销活动' onEnter={checkStatus}/>
        <Route path="/promotion/open"             component={PromotionOpen}           routes='开启关闭促销活动' onEnter={checkStatus}/>
        <Route path="/promotion/edit"             component={PromotionEdit}           routes='修改促销活动' onEnter={checkStatus}/>
      </Route>
    </Router>
  )
}

export default RouterConfig;
