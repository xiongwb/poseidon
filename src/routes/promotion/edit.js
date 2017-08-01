/**
 * Created by zhangle on 2017/3/21.
 */
import styles from './promotion.css'
import React from 'react'
import { connect } from 'dva'


import {
  Table,
  Button,
  Text,
  Input,
  Checkbox,
} from 'antd'


class Edit extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: this.props.value,
      isedit:0
    };

  }
  componentWillReceiveProps(nextProps) {


    this.setState({
      value: nextProps.value
    });



  }
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  edit(){



      return (
        <div>
          <Checkbox onChange={this.onChange}>
            <text className={styles.edit} onDoubleClick={()=>{this.setState({isedit:1})}} >{this.state.value }</text></Checkbox>
        </div>
      )

  }


  componentDidMount(){
  }

  render() {
    return (
      <div>
        {this.edit()}
      </div>
    );
  }
}

export default connect()(Edit)
