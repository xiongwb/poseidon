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
function CommodityaddTree(props) {
  const {commodityadd,dispatch}=props;

  if (commodityadd.data.length === 0) {
    return (<div ></div>)
  }
  console.log(commodityadd,12);
  let copyArr = commodityadd.data.kindList.slice();
  let getdata = TreeData.data(copyArr);

  console.log(getdata,15);
  const onExpand = (expandedKeys) => {
    dispatch({type: 'commodityadd/query', payload: {expandedKeys, autoExpandParent: false}})
  }

  const onCheck=(checkedKeys,e)=>{

    let belong=e.node.props.title;
    dispatch({type: 'commodityadd/checkedKeys', payload: {key:e.node.props.eventKey,belong:belong}})

  }
  const onClick=()=>{
    console.log(commodityadd.key,111441);
    dispatch({type: 'commodityadd/findAttrs',payload: {kindNo:commodityadd.key}})
  }
  const onChange = (e) => {
    const value = e.target.value;
    const data = {};
    data.kindList = [];
    data.key = [];
    commodityadd.data = commodityadd.kindList;
    commodityadd.data.kindList.map((item) => {
      if (value) {
        if (item.name.indexOf(value) > -1) {
          item.pKindNo = null;
          data.kindList.push(item);
          data.key.push(item.kindNo)
        }
        dispatch({
          type: 'commodityadd/query', payload: {
            data: data,
            expandedKeys: data.key,
            searchValue: value,
            autoExpandParent: true,
          }
        })
      } else {
        dispatch({
          type: 'commodityadd/query'
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
          expandedKeys={commodityadd.expandedKeys}
          autoExpandParent={commodityadd.autoExpandParent}
          onCheck={onCheck}
          checkedKeys={[commodityadd.key]}
        >
            {loop(getdata)}

        </Tree>
    </div>
  );
}

export default connect()(CommodityaddTree)
