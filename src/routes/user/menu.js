import React from 'react'
import { connect } from 'dva'
import styles from './menu.css'

import {
    Button, Row, Col, Icon, Tree, Input, Form, Spin
} from 'antd'
import { browserHistory } from 'react-router'
import QueueAnim from 'rc-queue-anim';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

function Menu({menu, dispatch}) {

    const addInputChange = (e) => {
        const { value } = e.target;
        dispatch({ 
            type: 'menu/save', 
            payload: { 
                addMenuName: value
            } 
        })
    }

    const editInputChange = (e) => {
        const { value } = e.target;
        dispatch({ 
            type: 'menu/save', 
            payload: { 
                editMenuName: value
            } 
        })
    }

    const addMenu = (id) => {
        dispatch({ 
            type: 'menu/save', 
            payload: { 
                addMenuId: id
            } 
        })
    }

    const addConfirm = (menuNo) => {
        if(menu.addMenuName){
            dispatch({ 
                type: 'menu/addMenu', 
                payload: { 
                    pMenuNo: menuNo,
                    name:menu.addMenuName
                } 
            })
        }
    }

    const addCancel = () => {
        dispatch({ 
            type: 'menu/save', 
            payload: { 
                addMenuId: null,
                addMenuName:null
            } 
        })
    }

    const editMenu = (id,name) => {
        dispatch({ 
            type: 'menu/save', 
            payload: { 
                editMenuId: id,
                editMenuName: name
            } 
        })
    }

    const editConfirm = (menuNo) => {
        if(menu.editMenuName){
            dispatch({ 
                type: 'menu/editMenu', 
                payload: { 
                    menuNo: menuNo,
                    name:menu.editMenuName
                } 
            })
        }
    }

    const editCancel = () => {
        dispatch({ 
            type: 'menu/save', 
            payload: { 
                editMenuId: null,
                editMenuName: null
            } 
        })
    }

    const delMenu = (menuNo) => {
        dispatch({ 
            type: 'menu/delMenu', 
            payload: { 
                menuNo: menuNo
            } 
        })
    }

    const loop_menu = data => data.map((item)=>{
        if (item.childMenuList) {
            if (item.menuNo == "root") {
                if (menu.addMenuId != null && menu.addMenuId == item.menuNo) {
                    return (
                        <TreeNode key={item.menuNo} title={
                            <span className={styles.treeNode}>
                                <Icon type="folder-open" />
                                &nbsp;&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;
                            <a onClick={() => addMenu(item.menuNo)}><Icon type="plus" /></a>
                            </span>}>
                            {loop_menu(item.childMenuList)}
                            <TreeNode key="add" title={
                                <span className={styles.treeNode}>
                                    <Input className={styles.editInput} value={menu.addMenuName} onChange={addInputChange}/>
                                    <a onClick={() => addConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                    <a onClick={() => addCancel()}><Icon type="close-circle" /></a>
                                </span>}></TreeNode>
                        </TreeNode>
                    );
                } else {
                    return (
                        <TreeNode key={item.menuNo} title={
                            <span className={styles.treeNode}>
                                <Icon type="folder-open" />
                                &nbsp;&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;
                            <a onClick={() => addMenu(item.menuNo)}><Icon type="plus" /></a>
                            </span>}>
                            {loop_menu(item.childMenuList)}
                        </TreeNode>
                    );
                }
                
            } else {
                if (menu.editMenuId != null && menu.editMenuId == item.menuNo) {
                    if (menu.addMenuId != null && menu.addMenuId == item.menuNo) {
                        return (
                            <TreeNode key={item.menuNo} title={
                                <span className={styles.treeNode}>
                                    <Input value={menu.editMenuName} onChange={editInputChange}/>
                                    <a onClick={() => editConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                    <a onClick={() => editCancel()}><Icon type="close-circle" /></a>
                                </span>}>
                                {loop_menu(item.childMenuList)}
                                <TreeNode key="add" title={
                                    <span className={styles.treeNode}>
                                        <Input className={styles.editInput} value={menu.addMenuName} onChange={addInputChange}/>
                                        <a onClick={() => addConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                        <a onClick={() => addCancel()}><Icon type="close-circle" /></a>
                                    </span>}></TreeNode>
                            </TreeNode>
                        )
                    } else {
                        return (
                            <TreeNode key={item.menuNo} title={
                                <span className={styles.treeNode}>
                                    <Input value={menu.editMenuName} onChange={editInputChange} />
                                    <a onClick={() => editConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                    <a onClick={() => editCancel()}><Icon type="close-circle" /></a>
                                </span>}>
                                {loop_menu(item.childMenuList)}
                            </TreeNode>
                        )
                    }
                    
                } else {
                    if (menu.addMenuId != null && menu.addMenuId == item.menuNo) {
                        return (
                            <TreeNode key={item.menuNo} title={
                                <span className={styles.treeNode}>
                                    &nbsp;&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;
                                <a onClick={() => editMenu(item.menuNo, item.name)}><Icon type="edit" /></a>
                                    <a onClick={() => delMenu(item.menuNo)}><Icon type="close" /></a>
                                    <a onClick={() => addMenu(item.menuNo)}><Icon type="plus" /></a>
                                </span>}>
                                {loop_menu(item.childMenuList)}
                                <TreeNode key="add" title={
                                    <span className={styles.treeNode}>
                                        <Input className={styles.editInput} value={menu.addMenuName} onChange={addInputChange}/>
                                        <a onClick={() => addConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                        <a onClick={() => addCancel()}><Icon type="close-circle" /></a>
                                    </span>}></TreeNode>
                            </TreeNode>
                        )
                    } else {
                        return (
                            <TreeNode key={item.menuNo} title={
                                <span className={styles.treeNode}>
                                    &nbsp;&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;
                                <a onClick={() => editMenu(item.menuNo, item.name)}><Icon type="edit" /></a>
                                    <a onClick={() => delMenu(item.menuNo)}><Icon type="close" /></a>
                                    <a onClick={() => addMenu(item.menuNo)}><Icon type="plus" /></a>
                                </span>}>
                                {loop_menu(item.childMenuList)}
                            </TreeNode>
                        )
                    }
                    
                }
            }
        }
        if (menu.editMenuId != null && menu.editMenuId == item.menuNo) {
            if (menu.addMenuId != null && menu.addMenuId == item.menuNo) {
                return (
                    <TreeNode key={item.menuNo} title={
                        <span className={styles.treeNode}>
                            <Input value={menu.editMenuName} onChange={editInputChange} />
                            <a onClick={() => editConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                            <a onClick={() => editCancel()}><Icon type="close-circle" /></a>
                        </span>}>
                        <TreeNode key="add" title={
                            <span className={styles.treeNode}>
                                <Input className={styles.editInput} value={menu.addMenuName} onChange={addInputChange}/>
                                <a onClick={() => addConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                <a onClick={() => addCancel()}><Icon type="close-circle" /></a>
                            </span>}></TreeNode>
                    </TreeNode>
                )
            } else {
                return (
                    <TreeNode key={item.menuNo} title={
                        <span className={styles.treeNode}>
                            <Input value={menu.editMenuName} onChange={editInputChange} />
                            <a onClick={() => editConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                            <a onClick={() => editCancel()}><Icon type="close-circle" /></a>
                        </span>}>
                    </TreeNode>
                )
            }
            
        } else {
            if (menu.addMenuId != null && menu.addMenuId == item.menuNo) {
                return (
                    <TreeNode key={item.menuNo} title={
                        <span className={styles.treeNode}>
                            &nbsp;&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;
                                <a onClick={() => editMenu(item.menuNo, item.name)}><Icon type="edit" /></a>
                            <a onClick={() => delMenu(item.menuNo)}><Icon type="close" /></a>
                        </span>}>
                        <TreeNode key="add" title={
                            <span className={styles.treeNode}>
                                <Input className={styles.editInput} value={menu.addMenuName} onChange={addInputChange}/>
                                <a onClick={() => addConfirm(item.menuNo)}><Icon type="check-circle" /></a>
                                <a onClick={() => addCancel()}><Icon type="close-circle" /></a>
                            </span>}></TreeNode>
                    </TreeNode>
                )
            } else {
                return (
                    <TreeNode key={item.menuNo} title={
                        <span className={styles.treeNode}>
                            &nbsp;&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;
                                <a onClick={() => editMenu(item.menuNo, item.name)}><Icon type="edit" /></a>
                            <a onClick={() => delMenu(item.menuNo)}><Icon type="close" /></a>
                        </span>}>
                    </TreeNode>
                )
            }
            
        }
    })
        
    if(menu.data.length == 0){
        return <Spin />
    }else{
        let menuTree = [{ menuNo: "root", name: "主菜单", childMenuList: menu.data.menuReturnVOList }];
        return (
            <QueueAnim>
            <div key="menu">
                <div className={styles.headDiv}>
                    <h2>菜单管理</h2>
                </div>
                <div className={styles.content}>
                    <Tree
                        defaultExpandAll={true}
                        showLine={true}
                    >
                        {loop_menu(menuTree)}
                    </Tree>
                </div>
            </div>
            </QueueAnim>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        menu: state.menu,
    };
}

export default connect(mapStateToProps)(Menu)
