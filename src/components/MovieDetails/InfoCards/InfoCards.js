import React from 'react';
import classes from './InfoCards.module.css';
import { Link } from 'react-router-dom';

const InfoCards = (props) => {
  return (
    <>
      <h3 className={classes.Title}>
        {props.title.toUpperCase()}
      </h3>
      <div className={classes.List}>
        {props.list && props.list.map(item => 
          <Link 
            key={item.id} 
            to={`/search?${props.link || 'with_people'}=${item.id}`}
          >
            {item.name}
          </Link>
        ) }
      </div>
    </>
  )
}

export default InfoCards;