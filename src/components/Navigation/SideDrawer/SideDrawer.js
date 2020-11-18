import React from 'react';
import Logo from './../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from './../../../hoc/Aux/Aux';
import styles from './SideDrawer.module.css';


const sideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close]
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.open} close={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems openSideDrawer={props.toggleSideDrawer}/>
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer;