/**
 * Created by cyt on 2017/4/13.
 */

import React from 'react'
import {connect} from 'dva'
import {

  Input,
  Button,
  Spin,
  Tree,
} from 'antd'

import TreeData from './tree_data.js'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
function CommodityeditTree(props) {
  const {commodityedit, dispatch} = props

  if (commodityedit.data.length === 0) {
    return (<div ></div>)
  }

  let copyArr = commodityedit.List.kindList.slice();
  let getdata = TreeData.data(copyArr);

  console.log(getdata, 15)
  const onExpand = (expandedKeys) => {
    dispatch({type: 'commodityedit/query', payload: {expandedKeys, autoExpandParent: false}})
  }

  const onCheck = (checkedKeys, e) => {
    let belong = e.node.props.title
    dispatch({type: 'commodityedit/checkedKeys', payload: {key: e.node.props.eventKey, belong: belong}})

  }

  const onClick = () => {
    console.log(commodityedit.key, 111441)
    dispatch({type: 'commodityedit/findAttrs', payload: {kindNo: commodityedit.key}})
  }

  const onChange = (e) => {
    const value = e.target.value;
    const data = {};
    data.kindList = [];
    data.key = [];
    commodityedit.List = commodityedit.kindList;
    commodityedit.List.kindList.map((item) => {
      if (value) {
        if (item.name.indexOf(value) > -1) {
          item.pKindNo = null;
          data.kindList.push(item);
          data.key.push(item.kindNo)
        }
        dispatch({
          type: 'commodityedit/query', payload: {
            List: data,
            expandedKeys: data.key,
            searchValue: value,
            autoExpandParent: true,
          }
        })
      } else {
        dispatch({
          type: 'commodityedit/query'
        })
      }
      return null;
    })
  };

  const loop = data => data.map((item) => {
    if (item.children) {
      return <TreeNode key={item.kindNo} title={item.name}>
        {loop(item.children)}
      </TreeNode>;
    }
    return <TreeNode key={item.kindNo} title={item.name}/>;
  });

  return (
    <div >
      <Search style={{width: 300}} placeholder="Search" onChange={onChange}/>
      <Button style={{marginLeft: 100}} onClick={onClick}>保存</Button>
      <Tree
        checkable
        checkStrictly
        onExpand={onExpand}
        expandedKeys={commodityedit.expandedKeys}
        autoExpandParent={commodityedit.autoExpandParent}
        onCheck={onCheck}
        checkedKeys={[commodityedit.key]}
      >
        {loop(getdata)}

      </Tree>
    </div>
  );
}

export default connect()(CommodityeditTree)
