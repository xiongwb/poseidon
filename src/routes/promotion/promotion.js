/**
 * Created by zhangle on 2017/3/20.
 */

import styles from './promotion.css'
import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Icon,
  Checkbox,
  Modal,
  Spin
} from 'antd'
import { browserHistory } from 'react-router';
import QueueAnim from 'rc-queue-anim';



function Promotion ({promotion,dispatch}) {


  if (promotion.data.length == 0){
    return <Spin />
  }else {


    const titleList = [
      '0','全部商品' ,'部分商品'

  ]
    const titleType = [
      '0','打折降价' ,'满减' ,'捆绑' ,'赠送'

    ]


    const dataSource = promotion.data.promptionReturnVOList;

    dataSource.map((data, number) => {
      data.key = (promotion.currentPage - 1) * 10 + number;
    });

    const onChange = (page) => {
      dispatch({
        type: 'promotion/findPromptionList',
        payload: {
          page: page,
          size: 10,
        },
      });

    };
    const search = () => {

      let name= document.getElementById('name').value;

      dispatch({type: 'promotion/findPromptionList', payload: { name: name, page: 1, size: 10,}})
    };
    const onopen = (record) => {

        dispatch({type: 'promotion/open1',payload:{record}});
        browserHistory.push('/promotion/open')
      };
    const edit = (record) => {
        let title=''
        let keys=[]
        for(let i=0;i<record.promptionProdListReturnVO.length;i++){
          keys.push(record.promptionProdListReturnVO[i].prodNo)
          title=title+record.promptionProdListReturnVO[i].prodName+','
        }
      console.log(keys,title)
      dispatch({type: 'promotion/open1',payload:{record:record,title:title,keys:keys}});
      browserHistory.push('/promotion/edit')
    };
    const recommend = (record) => {

      dispatch({type: 'promotion/open1',payload:{record}});
      browserHistory.push('/promotion/recommend')
    };


    const columns = [
      {title: '序号', dataIndex: 'key', width: 50, key: 'key'},
      {title: '优惠活动名称', dataIndex: 'promotionName', width: 100, key: 'promotionName'},
      {title: '开始时间', dataIndex: 'beginDate', width: 100, key: 'beginDate',},
      {title: '结束时间', dataIndex: 'endDate', width: 100, key: 'endDate'},
      {title: '优惠范围', key: 'scope', width: 100, render: (text, record, index) =>
      {
        console.log(titleList[record.scope])
        return(<div>
          {titleList[record.scope]}
          </div>
        )

      }},
      {title: '优惠方式', key: 'preferentialType', width: 100, render: (text, record, index) =>
      {
        return(
          <div>
            {titleType[record.preferentialType]}
          </div>
        )

      }},
      {title: '优惠商品', dataIndex: 'promptionProdListReturnVO.prodNo', width: 100, key: 'promptionProdListReturnVO.prodNo', render: (text, record, index) =>{
       let str=''
        if(record.promptionProdListReturnVO){
          for(let i in record.promptionProdListReturnVO){
            str +=record.promptionProdListReturnVO[i].prodName +'、'

          }
          str=str.substring(0,str.length-2);
        }
        return str
      }},
      {title: '是否推荐', key: 'isRecommend', width: 100, render: (text, record, index) =>
    {
      if(record.isRecommend ==1){
        return(
          <div>
            <Button onClick={()=>recommend(record)}>取消推荐</Button>
          </div>
        )
      }else {
        return(
          <div>
            <Button onClick={()=>recommend(record)}>推荐</Button>
          </div>
        )
      }
    }},
      {title: '是否启动', key: 'state', width: 100, render: (text, record, index) =>
      {
        if(record.state ==1){
          return(
            <div>
              <Button onClick={()=>onopen(record)}>关闭</Button>
            </div>
          )
        }else {
          return(
            <div>
              <Button onClick={()=>onopen(record)}>开启</Button>
            </div>
          )
        }
      }},
      {
        title: '操作', key: 'promotionNo', width: 100, render: (text, record, index) =>
      {

            return(
              <div>
                <Icon type="exception" className={styles.icon2} onClick={()=>edit(record)}></Icon>
              </div>
            )



      }
      }];


    return (
      <QueueAnim>
        <div key="1">
          <div className={styles.promotion}>
            <Row>
              <Col>
                <h2>活动名称</h2>
                <Input placeholder="输入名称" id='name'/>
              </Col>
              <Col>
                <Icon type="search" onClick={search} className={styles.icon}></Icon>
              </Col>
              <Col className={styles.icon4}>
                <Button onClick={()=> browserHistory.push('/promotion/add')}>添加优惠活动</Button>
              </Col>
            </Row>
          </div>
          <hr/>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{pageSize: 10, total: promotion.data.totalElements, onChange: onChange}}
            scroll={{y: 300}}
            loading={promotion.loading}
          />
        </div>

      </QueueAnim>

    );

  }
  }
  function mapStateToProps(state) {
    return {
      promotion: state.promotion,
    };
  }

export default connect(mapStateToProps)(Promotion)
