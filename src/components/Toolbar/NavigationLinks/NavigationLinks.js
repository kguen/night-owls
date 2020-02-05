import React from 'react';
import classes from './NavigationLinks.module.css';

const NavigationLinks = () => {
  return (
    <ul className={classes.NavigationLinks}>
      <li>Favourites</li>
      <li>Watched</li>
      <li>Watchlist</li>
      <li>Register</li>
      <li>Log in</li>
    </ul>
  )
}

export default NavigationLinks;