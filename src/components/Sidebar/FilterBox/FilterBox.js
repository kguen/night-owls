import React, { Component } from 'react';
import classes from './FilterBox.module.css';

class FilterBox extends Component {
  state = {
    showContent: !this.props.notShowFirst
  }
  toggleContent = () => {
    this.setState(prevState => {
      return { showContent: !prevState.showContent }
    });
  }
  render() {
    return (
      <div className={classes.FilterBox}>
        <div className={classes.Title} onClick={this.toggleContent}>
          <span>{this.props.title}</span>
          <div className={classes.Arrow}>
            <i className={this.state.showContent ? classes.DownArrow : classes.UpArrow}></i>
          </div>
        </div>
        <div 
          className={this.state.showContent ? classes.Show : classes.Hidden}
          style={this.state.showContent ? { maxHeight: this.props.height } : null}
        >
          {this.props.children}  
        </div>
      </div>
    )
  }
}

export default FilterBox;