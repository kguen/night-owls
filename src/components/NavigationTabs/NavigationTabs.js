import React from 'react';
import classes from './NavigationTabs.module.css';
import NavigationTab from './NavigationTab/NavigationTab';

const NavigationTabs = (props) => {
  return (
    <ul className={classes.NavigationTabs}> { 
      props.list.map((item, index) => 
        <NavigationTab
          active={props.activeTab === index}
          key={item.value + index}
          label={item.label}
          clicked={() => {
            if (props.activeTab !== index) {
              props.activeTabChanged(index);
            }
          }}
        />
      ) 
    } </ul>
  );
}

export default NavigationTabs;
