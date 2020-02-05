import React from 'react';
import classes from './FilterChecklist.module.css';

const FilterChecklist = (props) => {
  return (
    props.list && <ul className={classes.FilterChecklist}>
      {props.list.map((item, index) => 
      <li key={item.value + index}>
        <input 
          type={props.type}
          name={props.name}
          defaultChecked={props.firstChecked && !index}
          id={item.value + index}
          onChange={event => props.inputChecked(event, item.value)}
        />
        <label htmlFor={item.value + index}>  {item.label}</label>
      </li>)}
    </ul>
  );
}

export default FilterChecklist;