import React from 'react'
import { connect } from 'dva'
import styles from './privilege.css'
import {
  Button, Row, Col, Icon, Tree, Spin,
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';
const TreeNode = Tree.TreeNode;

function Privilege({privilege, dispatch}) {
  
  const getMenus = (selectedKeys, e) => {
    dispatch({ 
            type: 'privilege/getHadMenus', 
            payload: { 
                roleNo: selectedKeys[0]
            } 
        })
  }

  const onCheck = (checkedKeys, e) => {
    if(e.checked){
      let leafMenus = [];
      for(let i in checkedKeys){
        let flag = true;
        let menuList = privilege.menuList
        for(let j in menuList){
          if(checkedKeys[i]===menuList[j].menuNo){
            flag = false;
            break;
          }
        }
        if(flag){
          leafMenus.push(checkedKeys[i])
        }
      }
      let newMenus = [];
      for(let i in leafMenus){
        let flag = true;
        let hadMenus = privilege.hadMenus
        for(let j in hadMenus){
          if(leafMenus[i]===hadMenus[j]){
            flag = false;
            break;
          }
        }
        if(flag){
          newMenus.push(leafMenus[i])
        }
      }
      if(newMenus!=null&&newMenus.length>0){
        dispatch({ 
          type: 'privilege/setMenu', 
          payload: { 
              roleNo:privilege.curMenu,
              menuNo:newMenus,
              checked:e.checked
          } 
        })
      }   
    }else{
      let leafMenus = [];
      for(let i in checkedKeys){
        let flag = true;
        let menuList = privilege.menuList
        for(let j in menuList){
          if(checkedKeys[i]===menuList[j].menuNo){
            flag = false;
            break;
          }
        }
        if(flag){
          leafMenus.push(checkedKeys[i])
        }
      }
      let delMenus = [];
      let hadMenus = privilege.hadMenus
      for(let i in hadMenus){
        let flag = true;
        for(let j in leafMenus){
          if(hadMenus[i]===leafMenus[j]){
            flag = false;
            break;
          }
        }
        if(flag){
          delMenus.push(hadMenus[i])
        }
      }
      if(delMenus!=null&&delMenus.length>0){
        dispatch({ 
          type: 'privilege/setMenu', 
          payload: { 
              roleNo:privilege.curMenu,
              menuNo:delMenus,
              checked:e.checked
          } 
        })
      }
    }
  }

  const loop_role = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode key={item.roleNo} title={<span className={styles.treeNode}><Icon type="folder-open" />&nbsp;&nbsp;{item.roleName}</span>}>
          {loop_role(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.roleNo} title={<span className={styles.treeNode}><Icon type="user" />&nbsp;&nbsp;{item.roleName}</span>} />;
  });

  const loop_menu = data => data.map((item) => {
    if (item.childMenuList) {
      return (
        <TreeNode key={item.menuNo} title={<span className={styles.treeNode}><Icon type="folder-open" />&nbsp;&nbsp;{item.name}</span>}>
          {loop_menu(item.childMenuList)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.menuNo} title={<span className={styles.treeNode}><Icon type="bars" />&nbsp;&nbsp;{item.name}</span>} />;
  });

  if(privilege.roleList==null||privilege.menuList==null){
    return <Spin />
  }else{
    let roleTree = [{ roleNo: "root", roleName: "请选择用户角色", children: privilege.roleList }];
    return (
      <QueueAnim>
      <Spin spinning={privilege.loading}>
      <div key="privilege">
        <div className={styles.headDiv}>
          <h2>权限管理</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.roleDiv}>
            <Tree
              defaultExpandAll={true}
              onSelect={getMenus}
              showLine={true}
            >
              {loop_role(roleTree)}
            </Tree>
          </div>
          <div className={styles.menuDiv}>
            {privilege.hadMenus != null ?
              <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={privilege.hadMenus}
                onCheck={onCheck}
                showLine={true}
              >
                {loop_menu(privilege.menuList)}
              </Tree>
              :
              <div></div>}
          </div>
        </div>
      </div>
      </Spin>
      </QueueAnim>
    )
  }
}

function mapStateToProps(state) {
    return {
        privilege: state.privilege,
    };
}

export default connect(mapStateToProps)(Privilege)
