import {Tree, Text, Button, Icon, Spin} from 'antd';
const TreeNode = Tree.TreeNode;
import React from 'react'
import styles from './commodity.css'
import Edit from './edit.js'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim';
import TreeData from './tree_data.js'

var kindNo;

class PropertyManagementView extends React.Component {

  delete(id, name) {
    const {dispatch} = this.props;
    if (name == '') {
      dispatch({type: 'propertyManagement/delKindAttr', payload: {attrNo: id, kindNo: kindNo}})
    } else {
      dispatch({type: 'propertyManagement/editKindAttr', payload: {attrNo: id, name: name, kindNo: kindNo}})
    }
  }

  attribute(s) {
    return (
      <div className={styles.edit_margin}>
        <Edit id={s.attrNo} type="" value={s.name} width={100} onBlur={this.delete.bind(this)}/>
      </div>
    )
  }

  on_Blur() {
    const {dispatch} = this.props;
    let name = document.getElementById('name').value;
    if (name) {
      if (name === '') {
        return
      }
      dispatch({type: 'propertyManagement/addKindAttr', payload: {name: name, kindNo: kindNo}})
    }
       dispatch({type: 'propertyManagement/input_false'})
  }

  add() {
    this.props.dispatch({type: 'propertyManagement/input_true'})
  }

  show_input() {
    let promise = new Promise(function (resolve, reject) {
      resolve();
    });
    if (this.props.management.visibility) {
      promise.then(function () {
        document.getElementById('name').focus()
      });
      return (
        <input id='name' onBlur={() => this.on_Blur()} className={styles.edit_margin} type="text"/>
      )
    }
  }

  on_Select(e) {
    kindNo = e
    if (e == 'kind' || e == '') {
      this.props.management.prodAttrList = [];
      this.props.dispatch({type: 'propertyManagement/addbutton'});
      return
    }


    this.props.dispatch({type: 'propertyManagement/findAttr', payload: {kindNo: e}})
  }

  show_add() {
    if (!this.props.management.showAttribute) {
      return (
        <Button onClick={() => this.add()}>添加</Button>
      )
    }
  }

  render() {
    const {management, dispatch, prodAttrList} = this.props;
    let copyArr = management.data.kindList.slice()
    let getdata = TreeData.data(copyArr)
    const  attribute=management.prodAttrList.map((s, i) => this.attribute(s, i))
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.kindNo} title={<span >{item.name}</span>}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.kindNo} title={<span >{item.name}</span>}/>;
    });
    return (
      <QueueAnim>
        <div key='1' style={{backgroundColor: '#fff'}}>
          <div>
            <h1>分类属性管理</h1>
            <hr/>
            <table className={styles.table}>
              <td className={styles.td_tree}>
                <Tree onSelect={(e) => this.on_Select(e)} className={styles.edit}>
                  <TreeNode title={<span ><Icon type="folder-open"/>请选择分类</span>} key="kind">
                    {loop(getdata)}
                  </TreeNode>
                </Tree>
              </td>
              <td className={styles.td}>
              </td>
              <td className={styles.attribute}>
                {attribute}
                {this.show_input()}
                <div className={styles.edit_margin}>
                  {this.show_add()}
                </div>
              </td>
            </table >
          </div>
        </div>
      </QueueAnim>
    );
  }
}

function PropertyManagement({management, dispatch}) {
  if (management.data.length === 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }


  return (
    <Spin className={styles.loading} tip="Loading..." spinning={management.loading}>
      <div >
        <PropertyManagementView management={management} dispatch={dispatch}/>
      </div>
    </Spin >
  )
}

function mapStateToProps(state) {
  return {
    management: state.propertyManagement,
  };
}
export default connect(mapStateToProps)(PropertyManagement)
