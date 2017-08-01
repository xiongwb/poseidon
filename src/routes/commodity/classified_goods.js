/*
 import { Tree,Input,Text,Button,message,Icon,Row,Col} from 'antd';
 const TreeNode = Tree.TreeNode;
 import React from 'react'
 import styles from './commodity.css'
 import Edit from './edit.js'
 import { connect } from 'dva'
 import TreeData from './tree_data.js'
 import QueueAnim from 'rc-queue-anim';
 const catalog = [{test:'1',id:1,pid:0},
 {test:'2',id:2,pid:1},
 {test:'3',id:3,pid:2},
 {test:'4',id:4,pid:3},
 {test:'5',id:5,pid:4},
 {test:'6',id:6,pid:5},
 {test:'7',id:7,pid:6},
 {test:'8',id:8,pid:2},
 {test:'9',id:9,pid:4},
 {test:'10',id:10,pid:3},
 {test:'11',id:11,pid:2},
 {test:'12',id:12,pid:2},
 {test:'13',id:13,pid:12},
 {test:'14',id:14,pid:0},
 {test:'15',id:15,pid:0},
 {test:'16',id:16,pid:0},
 {test:'17',id:17,pid:14},
 {test:'18',id:18,pid:14},
 {test:'19',id:19,pid:14},
 {test:'20',id:20,pid:17},
 {test:'21',id:21,pid:17},
 {test:'22',id:22,pid:17},
 {test:'23',id:23,pid:17},
 {test:'24',id:24,pid:17},
 {test:'25',id:25,pid:18},
 {test:'26',id:26,pid:18},
 {test:'27',id:27,pid:18},
 {test:'28',id:28,pid:21},
 {test:'29',id:29,pid:21},
 {test:'30',id:30,pid:28},
 {test:'31',id:31,pid:28},
 {test:'32',id:32,pid:28},
 {test:'33',id:33,pid:28},
 {test:'34',id:34,pid:28},
 {test:'35',id:35,pid:33},
 {test:'36',id:36,pid:33},
 {test:'37',id:37,pid:35},
 {test:'38',id:38,pid:0},
 {test:'39',id:39,pid:0},
 {test:'40',id:40,pid:0},
 {test:'41',id:41,pid:0},
 {test:'42',id:42,pid:38},
 {test:'43',id:43,pid:38},
 {test:'44',id:44,pid:38},
 {test:'45',id:45,pid:38},
 {test:'46',id:46,pid:38},
 {test:'47',id:47,pid:38},
 {test:'48',id:48,pid:38},
 {test:'49',id:49,pid:38},
 {test:'50',id:50,pid:42},
 {test:'51',id:51,pid:42},
 {test:'52',id:52,pid:42},
 {test:'53',id:53,pid:42},
 {test:'54',id:54,pid:43},
 {test:'55',id:55,pid:43},
 {test:'56',id:56,pid:43},
 {test:'57',id:57,pid:44},
 {test:'58',id:58,pid:44},
 {test:'59',id:59,pid:50},
 {test:'60',id:60,pid:50},
 {test:'61',id:61,pid:50},
 {test:'62',id:62,pid:50},
 {test:'63',id:63,pid:50},
 {test:'64',id:64,pid:50},
 {test:'65',id:65,pid:61},
 {test:'66',id:66,pid:61},
 {test:'67',id:67,pid:61},
 {test:'68',id:68,pid:51},
 {test:'69',id:69,pid:62},
 {test:'70',id:70,pid:69},
 {test:'71',id:71,pid:70}]


    


 var getdata=TreeData.data(catalog)
 class ClassifiedGoods extends React.Component {
 constructor(props){
 super(props);
 this.state = {

 data:[],
 visibility:false,
 show:0
 };

 }


 attribute(){
 const loop = data => data.map((item) => {
 if (item.children && item.children.length) {
 return <TreeNode key={item.id} title={<span >{item.test}</span>} >{loop(item.children)}</TreeNode>;
 }
 return <TreeNode key={item.id} title={<span >{item.test}</span>}  />;
 });
 if(this.state.show==1)

 return (

 <Tree onSelect={(e)=>this.on_Select(e)} className={styles.edit} checkable >
 <TreeNode  title={<span >商品类别</span>} key="0">
 {loop(getdata)}
 </TreeNode>
 </Tree>

 )
 }
 on_Blur(){
 this.setState({visibility:false})
 }
 add(){
 this.setState({visibility:true})
 }
 show_submit(){
 if(this.state.visibility){
 return (
 <Button  onClick={()=>this.add()} >添加</Button>
 )
 }
 }

 on_Select(e){
 this.setState({visibility:true})
 this.setState({show:1})

 }

 render() {
 const loop = data => data.map((item) => {
 if (item.children && item.children.length) {
 return <TreeNode key={item.id} title={<span >{item.test}</span>} >{loop(item.children)}</TreeNode>;
 }
 return <TreeNode key={item.id} title={<span >{item.test}</span>}  />;
 });
 return (
 <QueueAnim >
 <div key='key1' className={styles.attribute1}>
 <h1>分类商品查询</h1>
 <hr/>
 <div className={styles.classification}>
 <Tree onSelect={(e)=>this.on_Select(e)} className={styles.edit} >
 <TreeNode  title={<span ><Icon type="folder-open" />请选择分类</span>} key="0">
 {loop(getdata)}
 </TreeNode>
 </Tree>
 </div>
 <div className={styles.attributeTree}>
 {this.attribute()}
 </div>
 </div>
 </QueueAnim>
 );
 }
 }



 export default connect()(ClassifiedGoods)
 */
import {Tree, Text, Button, Icon, Spin} from 'antd';
const TreeNode = Tree.TreeNode;
import React from 'react'
import styles from './commodity.css'
import Edit from './edit.js'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim';
import TreeData from './tree_data.js'


function ClassifiedGoods({classifiedGoods, dispatch}) {
  console.log(classifiedGoods, 12)
  if (classifiedGoods.data.length == 0) {
    return (<div className={styles.spin}><Spin /></div>)
  }


  let copyArr = classifiedGoods.data.kindList.slice();
  let getdata = TreeData.data(copyArr);
  let sukdata = classifiedGoods.sukList;


  const on_Select = (e) => {
    if (e == 'kind' || e == '') {
      return
    }

    dispatch({type: 'classifiedGoods/findProdSkuByKind', payload: {kindNo: e, brcNo: 6,}})

  };

  const onCheck = (checkedKeys, e) => {

    console.log(e, 16666662)
    /*    const cList = [];
     const childrenList = [];

     childrenList.push(checkedKeys[idString])

     if (e.checked) {
     let children = childrenList.slice()
     for (let i = 0; i < children.length; i++) {
     for (let j = 0; j < sukdata.selectList.length; j++) {

     if (children[i] == sukdata.selectList[j]) {

     let index = childrenList.indexOf(children[i]);

     childrenList.splice(index, 1)
     }
     }

     }
     } else {
     let selectList = sukdata.selectList.slice();
     console.log(selectList, 11);
     console.log(childrenList, 12);
     for (let i = 0; i < selectList.length; i++) {
     for (let j = 0; j < childrenList.length; j++) {

     if (selectList[i] == childrenList[j]) {

     let index = sukdata.selectList.indexOf(selectList[i]);

     sukdata.prodSkuList.selectList.splice(index, 1)
     }
     }

     }
     }*/
    const childrenList = [];
    if (e.node.props.children&&e.node.props.children.length) {
      for (let i = 0; i < e.node.props.children.length; i++) {
        childrenList.push(e.node.props.children[i].key)
      }
    } else {
      childrenList.push(e.node.props.eventKey)


    }
    if (e.checked) {

      console.log(childrenList, 1412413)

        for (let i = 0; i < childrenList.length; i++) {
          if(sukdata.selectProdList.indexOf(childrenList[i])>-1){
            let index = childrenList.indexOf(childrenList[i]);
            childrenList.splice(index, 1)
          }
        }
      console.log(childrenList,45678);
      dispatch({type: 'classifiedGoods/addBrcSku', payload: {brcNo: 6, skuNo: childrenList}})
    } else {

      console.log(childrenList, 1111);
      dispatch({type: 'classifiedGoods/delBrcSku', payload: {brcNo: 6, skuNo: childrenList}})
    }
  }

  const loop = data => data.map((item) => {

    if (item.children) {
      return <TreeNode key={item.kindNo} title={item.name}>
        {loop(item.children)}
      </TreeNode>;
    }
    return <TreeNode key={item.kindNo} title={item.name}/>;
  });
  const loop1 = data => data.map((item) => {

    if (item.skuList) {
      return <TreeNode key={item.skuNo} title={item.name}>
        {loop1(item.skuList)}
      </TreeNode>;
    }
    return <TreeNode key={item.skuNo} title={item.name}/>;
  });
  return (
    <QueueAnim>
      <div key='1' style={{backgroundColor: '#fff'}}>
        <Spin spinning={classifiedGoods.loading}>
          <div>
            <h1>分类属性管理</h1>
            <hr/>
            <table className={styles.table}>
              <td className={styles.td_tree}>
                <Tree onSelect={(e) => on_Select(e)} className={styles.edit}>
                  <TreeNode title={<span ><Icon type="folder-open"/>请选择分类</span>} key="kind">
                    {loop(getdata)}
                  </TreeNode>
                </Tree>
              </td>
              <td className={styles.td}>
              </td>
              <td className={styles.td_tree}>
                <Tree onCheck={onCheck} className={styles.edit} checkable checkedKeys={sukdata.selectProdList}>
                  {sukdata.length === 0 ? <div></div> : loop1(sukdata.prodSkuList)}
                </Tree>
              </td>
            </table >
          </div>
        </Spin>
      </div>
    </QueueAnim>
  );
}


function mapStateToProps(state) {
  return {
    classifiedGoods: state.classifiedGoods,
  };
}
export default connect(mapStateToProps)(ClassifiedGoods)
{/*checkedKeys={sukdata.selectProdList}*/
}
