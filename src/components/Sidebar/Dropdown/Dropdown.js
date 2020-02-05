import React, { Component } from 'react';
import classes from './Dropdown.module.css';

class Dropdown extends Component {
  state = {
    showContent: false,
    index: 0
  }
  toggleContent = () => {
    this.setState(prevState => {
      return { showContent: !prevState.showContent }
    });
  }
  render() {
    return (
      <div className={classes.Dropdown}>
        <button onClick={this.toggleContent}>
          <span>{this.props.list[this.state.index].label}</span>
          <div className={classes.Arrow}>
            <i className={this.state.showContent ? classes.DownArrow : classes.UpArrow}></i>
          </div>
        </button>
        <div 
          className={this.state.showContent ? classes.Show : classes.Hidden}
          style={this.props.reversed ? {
            top: -37 * (this.props.list.length + 1)
          } : null}
        >
          {this.props.list.map((item, index) => 
            <div 
              className={`
                ${classes.Option}
                ${this.state.index === index ? classes.active : ''}`
              }
              key={item.label + index}
              onClick={() => {
                this.toggleContent();
                if (this.state.index !== index) {
                  this.setState({ index });
                  this.props.changed(item.value);
                }
              }}
            >
              {item.label}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dropdown;