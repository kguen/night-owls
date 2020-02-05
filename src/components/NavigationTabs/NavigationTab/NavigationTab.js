import React from 'react';
import classes from './NavigationTab.module.css';

const NavigationTab = (props) => {
  return (
    <li className={classes.NavigationTab}>
      <span 
        className={props.active ? classes.active: ''}
        onClick={props.clicked}
      >
        {props.label}
      </span>
    </li>
  );
}

export default NavigationTab;