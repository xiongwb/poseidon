import React from 'react'
import { connect } from 'dva'
import Main from '../components/main'
import { Element } from 'rc-banner-anim';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Main>{this.props.children}</Main>
      </div>
    )
  }
}


export default connect()(Dashboard)
