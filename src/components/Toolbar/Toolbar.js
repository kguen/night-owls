import React, { Component } from 'react';
import classes from './Toolbar.module.css';
import NavigationLinks from './NavigationLinks/NavigationLinks';

class Toolbar extends Component {
  state = {
    inputValue: ''
  }

  handleInputValueChanged = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <div className={classes.Toolbar}>
        <div className={classes.Logo}>
          <a href="/">NIGHT&nbsp;&nbsp;OWLS</a>
        </div>
        <form onSubmit={event => this.props.formSubmitted(event, this.state.inputValue)}>
          <input
            type="text"
            placeholder="Find something to watch..."
            value={this.state.inputValue}
            onChange={this.handleInputValueChanged}
          />
          {
            (this.props.totalResults !== null) 
              ? <span>{this.props.totalResults} results</span> 
              : null
          }
        </form>
        <NavigationLinks />
      </div>
    );
  }
}

export default Toolbar;