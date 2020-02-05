import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';

const Layout = (props) => {
  return (
    <>
      <Toolbar 
        totalResults={props.totalResults}
        formSubmitted={props.searchFormSubmitted}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  )
}

export default Layout;