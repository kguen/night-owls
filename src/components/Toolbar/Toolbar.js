import React from 'react';
import classes from './Toolbar.module.css';
import NavigationLinks from './NavigationLinks/NavigationLinks';

const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <div className={classes.Logo}>
        <a href="/">NIGHT&nbsp;&nbsp;OWLS</a>
      </div>
      <form onSubmit={event => props.formSubmitted(event)}>
        <input
          type="text"
          name="search"
          placeholder="Find something to watch..."
          autoComplete="off"
        />
        <div className={classes.Tooltip}>Press enter ↵ to search</div>
        {
          (props.totalResults !== null) 
            ? <span>{props.totalResults} results</span> 
            : null
        }
      </form>
      <NavigationLinks />
    </div>
  );
}

export default Toolbar;