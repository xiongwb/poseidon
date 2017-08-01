import styles from './comment.css'
import React from 'react'
import { connect } from 'dva'

import {
  Rate,
  Button,
  Spin
} from 'antd'
import logo from '../../assets/yay.jpg'
import QueueAnim from 'rc-queue-anim';
import Storage from '../../utils/storage'
import { getLocalStorage } from '../../utils/helper'
import { browserHistory } from 'react-router'

function CommentReply({comment,dispatch}){

  const mockData = {
    name:comment.record.replyUserName,
    time:comment.record.replyEvaDate,
    goods:comment.record.prodName,
    describe:comment.record.star,
    content:comment.record.content
  }
  const Reset=()=>{
     content = document.getElementById('content').value='';


  };
  const submit=()=>{
   let  content = document.getElementById('content').value;
    let empNo=getLocalStorage(Storage.DID_LOGIN).empNo
    console.log(content, 213)
      dispatch({
        type: 'comment/addReply',
        payload:{userNo:empNo,content:content,evaNo:comment.record.evaNo},
      });
  };
  if(comment.isSubmit){
    browserHistory.push('/system/detail');
    comment.isSubmit=false
  }
    return (
      <QueueAnim>
        <Spin spinning={comment.loading}>
          <div className={styles.reply}  key="key1">
            <h1>商品评价管理</h1>
            <hr/>
            <div style={{marginTop:10}}>
              <text>{mockData.name + '用户于' + mockData.time + '对' + mockData.goods + '发表了评论'}</text>
            </div>
            <div className={styles.starsTitle}>
              <text>打分：</text>
            </div>
            <div>
              <div >
                <Rate className={styles.stars} allowHalf disabled={true} defaultValue={mockData.describe} />
              </div>

            </div>
            <div className={styles.content}>
              <text>评论内容：</text>
            </div>
            <p >{mockData.content}</p>
            <img src={logo}  alt="上海鲜花港 - 郁金香"  className={styles.image}/>
            <hr />
            <div>
              <div className={styles.textareaTitle}>
                <text>回复内容</text>
              </div>
              <div className={styles.textareaDiv}>
                <textarea id='content' className={styles.textarea}></textarea>
              </div>
            </div>
            <div className={styles.button}>
              <Button onClick={submit}>提交</Button>
              <Button onClick={Reset} style={{marginLeft:50}}>重置</Button>
            </div>
          </div>
        </Spin>
      </QueueAnim>
    );

}

function mapStateToProps(state) {
  return {
    comment: state.comment,
  };
}

export default connect(mapStateToProps)(CommentReply)
