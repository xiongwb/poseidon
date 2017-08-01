import styles from './classification.css'
import React from 'react'
import {connect} from 'dva'
import {
  Text,
  Row,
  Col,
  Tree,
  Spin
} from 'antd'
import TreeData from '../commodity/tree_data.js'
import QueueAnim from 'rc-queue-anim';
const TreeNode = Tree.TreeNode;

function ClassificationManage({treedata, dispatch}) {
  console.log(treedata)

    if (treedata.data.length === 0) {
      return (<div className={styles.spin}><Spin /></div>)
    }
    let copyArr = treedata.data.kindList.slice();
    let getdata = TreeData.data(copyArr);
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {

        return <TreeNode disableCheckbox={item.islocked !== 0} key={item.kindNo}
                         title={<span >{item.name}</span>}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode checkStrictly={false} disableCheckbox={item.islocked !== 0} key={item.kindNo}
                       title={<span >{item.name}</span>}/>;
    });



    const onCheck = (checkedKeys, e) => {
      const cList = [];
      const childrenList = [];
      treedata.data.kindList.map((data) => {
        if (data.pKindNo != null) {
          cList.push(data)
        }
      });
      for (const idString in checkedKeys) {
        let add = true;
        for (const dic in cList) {
          if (cList[dic].pKindNo == checkedKeys[idString]) {
            add = false;
            break;
          }
        }
        if (add == true) {
          childrenList.push(checkedKeys[idString])
        }
      }
      if (e.checked) {
        let children = childrenList.slice()
        for (let i = 0; i < children.length; i++) {
          for (let j = 0; j < treedata.data.selectList.length; j++) {

            if (children[i] == treedata.data.selectList[j]) {

              let index = childrenList.indexOf(children[i]);

              childrenList.splice(index, 1)
            }
          }

        }
      } else {
        let selectList = treedata.data.selectList.slice();
        console.log(selectList, 11);
        console.log(childrenList, 12);
        for (let i = 0; i < selectList.length; i++) {
          for (let j = 0; j < childrenList.length; j++) {

            if (selectList[i] == childrenList[j]) {

              let index = treedata.data.selectList.indexOf(selectList[i]);

              treedata.data.selectList.splice(index, 1)
            }
          }

        }
      }
      console.log(treedata.data.selectList, 4);
      if (e.checked) {
        dispatch({type: 'classificationManage/addBrcKind', payload: {brcNo: 6, kindNo: childrenList}})
      } else {
        dispatch({type: 'classificationManage/delBrcKind', payload: {brcNo: 6, kindNo: treedata.data.selectList}})
      }
    }
    return (
      <QueueAnim>
        <div key="1">
          <Spin spinning={treedata.loading}>
          <div className={styles.classification}>
            <Row>
              <Col>
                <h2>选择分类</h2>
              </Col>
            </Row>
          </div>
          <hr/>
          <Tree checkable onCheck={onCheck} checkedKeys={treedata.data.selectList}
                >
            {loop(getdata)}
          </Tree>
          </Spin>
        </div>
      </QueueAnim>
    );


}
function mapStateToProps(state) {
  return {
    treedata: state.classificationManage,
  };
}
export default connect(mapStateToProps)(ClassificationManage)
