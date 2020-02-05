import React, { Component } from 'react';
import './App.css';
import MoviesBrowser from './containers/MoviesBrowser/MoviesBrowser';
import Layout from './containers/Layout/Layout';

class App extends Component {
  state = {
    totalResults: null,
    searchQuery: ''
  }

  handleTotalResultsChanged = (value) => {
    this.setState({ totalResults: value });
  }
  handleSearchFormSubmitted = (event, value) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    this.setState({ searchQuery: value.trim() });
  }
  handleSearchQueryReset = () => {
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <div className="App">
        <Layout 
          totalResults={this.state.totalResults}
          searchFormSubmitted={this.handleSearchFormSubmitted}
        >
          <MoviesBrowser 
            totalResultsChanged={this.handleTotalResultsChanged}
            searchQuery={this.state.searchQuery}
            searchQueryReset={this.handleSearchQueryReset}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
