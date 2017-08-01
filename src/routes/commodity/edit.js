import styles from './commodity.css'
import React from 'react'
import {connect} from 'dva'
import logo from '../../assets/yay.jpg'

import {
  Table,
  Button,
  Text,
  Input,
  Row,
  Col,
  Icon,
  Form,

} from 'antd'


class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      isedit: 0
    };

  }

  componentWillReceiveProps(nextProps) {


    this.setState({
      value: nextProps.value,
      id: nextProps.id
    });


  }

  on_Blur() {
    let name

      name = document.getElementById('name').value;
      this.setState({isedit: 0})
      this.props.onBlur(this.props.id, name)

  }

  edit() {

    let promise = new Promise(function (resolve, reject) {
      resolve();
    });
    if (this.state.isedit == 1) {
      promise.then(function () {
        document.getElementById('name').focus()
      });
      return (
        <input style={{width: this.props.width}} className={styles.edit} id='name' type={this.props.type}
               min={this.props.min}  defaultValue={this.state.value} onBlur={() => this.on_Blur()}/>
      )
    } else {
      return (
        <text className={styles.edit} onDoubleClick={() => {this.setState({isedit: 1})}}>{this.state.value}</text>
      )
    }
  }


  componentDidMount() {
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
