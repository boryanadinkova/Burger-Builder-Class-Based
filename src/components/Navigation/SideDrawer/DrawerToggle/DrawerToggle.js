import React from 'react';
import styles from './DrawerToggle.module.css';

const drawerToggle = (props) => (
  <div onClick={props.toggleSideDrawer} className={styles.DrawerToggle} >
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;