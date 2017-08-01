import styles from './classification.css'
import React from 'react'
import {connect} from 'dva'
import {
  Input,
  Icon,
  Modal,
  Spin,
  Tree,

} from 'antd'
import  ClassificationAdd  from './classification_add'
import  ClassificationEdit  from './classification_edit'
import  AddDetails  from './add_details'
import TreeData from '../commodity/tree_data.js'
const TreeNode = Tree.TreeNode;

const Search = Input.Search;


function Classification({classification, dispatch}) {

  if (classification.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }
  let copyArr = classification.data.kindList.slice();
  let getdata = TreeData.data(copyArr);

  console.log(getdata, 312);


  const onExpand = (expandedKeys) => {
    dispatch({type: 'classification/query', payload: {expandedKeys, autoExpandParent: false}})
  }

  const onChange = (e) => {
    const value = e.target.value;
    const data = {};
    data.kindList = [];
    data.key = [];
    classification.data = classification.kindList;
     classification.data.kindList.map((item) => {
      if (value) {
        if (item.name.indexOf(value) > -1) {
          item.pKindNo = null;
          data.kindList.push(item);

          data.key.push(item.kindNo)
        }
        dispatch({
          type: 'classification/query', payload: {
            data: data,
            expandedKeys: data.key,
            searchValue: value,
            autoExpandParent: true
          }
        })
      } else {
        dispatch({
          type: 'classification/query'
        })

      }


      return null;
    })
  };

  const loop = data => data.map((item) => {
    const index = item.name.search(classification.searchValue);
    const beforeStr = item.name.substr(0, index);
    const afterStr = item.name.substr(index + classification.searchValue.length);
    const title = index > -1 ? (
      <span>
            {beforeStr}
        <span style={{color: '#f50'}}>{classification.searchValue}</span>
        {afterStr}
          </span>
    ) : <span>{item.name}</span>;
    if (item.children && item.children.length) {
      return <TreeNode key={item.kindNo} title={
        <span >
          {title}
          <a onClick={() => edit(item.kindNo, item.pKindNo)}><Icon type="edit"/></a>
          <a onClick={() => minus(item.kindNo, item.pKindNo)}><Icon type="minus"/></a>
          <a onClick={() => plus(item.kindNo)}><Icon type="plus"/></a>
        </span>}>
        {loop(item.children)}
      </TreeNode>;
    }
    return <TreeNode checkStrictly={false} key={item.kindNo} title={
      <span >
        {title}
        <a onClick={() => edit(item.kindNo, item.pKindNo)}><Icon type="edit"/></a>
        <a onClick={() => minus(item.kindNo, item.pKindNo)}><Icon type="minus"/></a>
        <a onClick={() => plus(item.kindNo, item.pKindNo)}><Icon type="plus"/></a>
      </span>}/>;
  });

  const plus = (e) => {

    if (e === 'kind') {
      dispatch({type: 'classification/visible_father_true'})
    } else {
      dispatch({type: 'classification/visible_son_true', payload: {kindNo: e}})
    }

  };
  const minus = (e) => {
    dispatch({type: 'classification/delKind', payload: {kindNo: e}})
  };
  const edit = (e) => {
    dispatch({type: 'classification/findKindDetail', payload: {kindNo: e}})
  };


  const handleCancel = () => {

    dispatch({type: 'classification/visible_false'})
  };


  return (
    <div >
      <Spin tip="Loading..." spinning={classification.loading}>
        <Search style={{width: 300}} placeholder="Search" onChange={onChange}/>
        <Tree
          onExpand={onExpand}
          expandedKeys={classification.expandedKeys}
          autoExpandParent={classification.autoExpandParent}
        >
          <TreeNode title={<span ><Icon type="folder-open"/>
                    请选择分类
                    <a onClick={() => plus('kind')}><Icon type="plus"/></a>
                  </span>} key="kind">
            {loop(getdata)}
          </TreeNode>
        </Tree>
        <Modal title="添加分类" visible={classification.visible_father_add} onCancel={handleCancel}
               footer={null}
               value={0}
        >
          <p><ClassificationAdd classification={classification} dispatch={dispatch}/></p>
        </Modal>
        <Modal title="修改分类" visible={classification.visible_edit} onCancel={handleCancel}
               footer={null}
        >
          <p><ClassificationEdit classification={classification} dispatch={dispatch}/></p>
        </Modal>
        <Modal title="添加子分类" visible={classification.visible_son_add} onCancel={handleCancel}
               footer={null}
        >
          <p><AddDetails classification={classification} dispatch={dispatch}/></p>
        </Modal>
      </Spin>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    classification: state.classification,
  };
}
export default connect(mapStateToProps)(Classification)
