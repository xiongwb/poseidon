import {Tree, Text, Button, Icon, Spin,Checkbox,Input,} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import React from 'react'
import styles from './promotion.css'
import Edit from './edit.js'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim';
import TreeData from './tree_data.js'



function PromotionCommodity(props) {



  const {promotion,dispatch}=props;
  console.log(promotion,12)
  let copyArr = promotion.list.kindList.slice();
  let getdata = TreeData.data(copyArr);

  const onExpand = (expandedKeys) => {
    dispatch({type: 'promotion/save', payload: {expandedKeys, autoExpandParent: false}})
  }

  const on_Select=(e)=>{
    dispatch({
      type: 'promotion/findProdByKind',
      payload: {kindNo: e},
    });
  };

  const onChange = (e) => {
    const value = e.target.value;
    const list = {};
    list.kindList = [];
    list.key = [];
    promotion.list = promotion.kindList;
    promotion.list.kindList.map((item) => {
      if (value) {
        if (item.name.indexOf(value) > -1) {
          item.pKindNo = null;
          list.kindList.push(item);
          list.key.push(item.kindNo)
        }
        dispatch({
          type: 'promotion/save', payload: {
            list: list,
            expandedKeys: list.key,
            searchValue: value,
            autoExpandParent: true,
          }
        })
      } else {
        dispatch({
          type: 'promotion/save'
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

  const onCheck=(checkedKeys,e)=>{
    /*let belong = e.node.props.title*/
    console.log(e.checkedNodes,12)
    var title=''
    let Keys=checkedKeys.slice()
    for(let i=0;i<Keys.length;i++){
      if(Keys[i]==1){
        Keys.splice(i,1)
      }
    }
    for(let j=0;j<e.checkedNodes.length;j++){

      /* if(Keys[i]==1){
       Keys.splice(i,1)
       }*/if(e.checkedNodes[j].props.title!='全选') {
        title = title +e.checkedNodes[j].props.title+','
      }
    }
    dispatch({
      type: 'promotion/save',
      payload: {
        title: title,
        keys: Keys,

      }
    })
  };

  const  attribute=promotion.brcList.map((s, i) =>{
    return (
      <TreeNode key={s.prodNo} title={s.prodName} />
    )
  })
  return (
    <QueueAnim>
      <div key='1' style={{backgroundColor: '#fff'}}>
        <div>
          <table className={styles.table}>

            <td className={styles.td_tree}>
              <Search  style={{width: 210}} placeholder="Search" onChange={onChange}/>
              <Tree
                expandedKeys={promotion.expandedKeys}
                autoExpandParent={promotion.autoExpandParent}
                onExpand={onExpand}
                checkedKeys={[promotion.key]}

                onSelect={(e) => on_Select(e)} className={styles.edit}>
                {loop(getdata)}
              </Tree>
            </td>
            <td className={styles.td}>
            </td>
            <Tree
              onCheck={onCheck}
              defaultExpandAll
              checkable
            >
              <TreeNode title='全选' key="1">
                {attribute}
              </TreeNode>
            </Tree>
          </table >
        </div>
      </div>
    </QueueAnim>
  );
}
export default connect()(PromotionCommodity)



