import React from 'react';
import { Icon } from 'antd';
import ListSort from './ListSort';
import styles from './list-sort.css'
const dataArray = [
  {
    icon: 'question-circle-o',
    color: '#FF5500',
    title: 'Senior Product Designer',
    text: 'Senior Product Designer',
  },
  {
    icon: 'plus-circle-o',
    color: '#5FC296',
    title: 'Senior Animator',
    text: 'Senior Animator',
  },
  {
    icon: 'check-circle-o',
    color: '#2DB7F5',
    title: 'Visual Designer',
    text: 'Visual Designer',
  },
  {
    icon: 'cross-circle-o',
    color: '#FFAA00',
    title: 'Computer Engineer',
    text: 'Computer Engineer',
  },
  {
    icon: 'cross-circle-o',
    color: '#FFAA00',
    title: 'Computer Engineer',
    text: 'Computer Engineer',
  },
  {
    icon: 'cross-circle-o',
    color: '#FFAA00',
    title: 'Computer Engineer',
    text: 'Computer Engineer',
  }
];
export default class ListSortDemo extends React.Component {


  render() {
    const childrenToRender = dataArray.map((item, i) => {
      const { icon, color, title, text } = item;
      return (
        <div key={i} className={styles.list}>
          <div className={styles.icon}>
            <Icon type={icon} style={{ color }} />
          </div>
          <div className={styles.text}>
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
        </div>
      );
    });
    return (<div className={styles.wrapper}>
      <div className={styles.demo}>
        <ListSort
          dragClassName={styles.selected}
          appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
        >
          {childrenToRender}
        </ListSort>
      </div>
    </div>);
  }
}
