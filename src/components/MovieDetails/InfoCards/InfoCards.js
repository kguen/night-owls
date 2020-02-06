import React from 'react';
import classes from './InfoCards.module.css';

const InfoCards = (props) => {
  return (
    <>
      <h3 className={classes.Title}>
        {props.title.toUpperCase()}
      </h3>
      <div className={classes.List}>
        {props.list && props.list.map(item => 
          <a key={item[props.keyProp ? props.keyProp : 'id']} href="/">
            {item.name}
          </a>
        ) }
      </div>
    </>
  )
}

export default InfoCards;