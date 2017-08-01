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
function CommodityTree(props) {
  const {commodity,dispatch}=props

  if (commodity.data.length === 0) {
    return (<div ></div>)
  }
  console.log(commodity,12)
  let copyArr = commodity.search.kindList.slice();
  let getdata = TreeData.data(copyArr);

  console.log(getdata,15)
  const onExpand = (expandedKeys) => {
    dispatch({type: 'commodity/query', payload: {expandedKeys, autoExpandParent: false}})
  }

  const onCheck=(checkedKeys,e)=>{

    let belong=e.node.props.title
    dispatch({type: 'commodity/checkedKeys', payload: {key:e.node.props.eventKey,belong:belong}})

  };
  const onClick=()=>{

    dispatch({type: 'commodity/visible_false'})
  };
  const onChange = (e) => {
    const value = e.target.value;
    const search = {};
    search.kindList = [];
    search.key = [];
    commodity.search = commodity.kindList;
    commodity.search.kindList.map((item) => {
      if (value) {
        if (item.name.indexOf(value) > -1) {
          item.pKindNo = null;
          search.kindList.push(item);
          search.key.push(item.kindNo)
        }
        dispatch({
          type: 'commodity/query', payload: {
            search: search,
            expandedKeys: search.key,
            searchValue: value,
            autoExpandParent: true,
          }
        })
      } else {
        dispatch({
          type: 'commodity/query'
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
    return <TreeNode  key={item.kindNo} title={item.name}/>;
  });
  return (
    <div >
      <Search style={{width: 300}} placeholder="Search" onChange={onChange}/>
      <Button style={{marginLeft:100}}   onClick={onClick} >保存</Button>
      <Tree
        checkable
        checkStrictly
        onExpand={onExpand}
        expandedKeys={commodity.expandedKeys}
        autoExpandParent={commodity.autoExpandParent}
        onCheck={onCheck}
        checkedKeys={[commodity.key]}
      >
        {loop(getdata)}

      </Tree>
    </div>
  );
}

export default connect()(CommodityTree)
